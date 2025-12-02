use axum::{
    body::Body,
    extract::ConnectInfo,
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};
use governor::{
    clock::DefaultClock,
    state::{InMemoryState, NotKeyed},
    Quota, RateLimiter,
};
use std::{net::SocketAddr, sync::Arc};
use tower::{Layer, Service};

#[derive(Clone)]
pub struct RateLimitLayer {
    limiter: Arc<RateLimiter<NotKeyed, InMemoryState, DefaultClock>>,
}

impl RateLimitLayer {
    pub fn new() -> Self {
        // 5 requests per IP per hour
        let quota = Quota::per_hour(std::num::NonZeroU32::new(5).unwrap());
        let limiter = Arc::new(RateLimiter::direct(quota));
        Self { limiter }
    }
}

impl<S> Layer<S> for RateLimitLayer {
    type Service = RateLimitService<S>;

    fn layer(&self, inner: S) -> Self::Service {
        RateLimitService {
            inner,
            limiter: self.limiter.clone(),
        }
    }
}

#[derive(Clone)]
pub struct RateLimitService<S> {
    inner: S,
    limiter: Arc<RateLimiter<NotKeyed, InMemoryState, DefaultClock>>,
}

impl<S> Service<Request<Body>> for RateLimitService<S>
where
    S: Service<Request<Body>, Response = Response> + Clone + Send + 'static,
    S::Future: Send + 'static,
{
    type Response = S::Response;
    type Error = S::Error;
    type Future = std::pin::Pin<
        Box<dyn std::future::Future<Output = Result<Self::Response, Self::Error>> + Send>,
    >;

    fn poll_ready(
        &mut self,
        cx: &mut std::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.inner.poll_ready(cx)
    }

    fn call(&mut self, req: Request<Body>) -> Self::Future {
        // Only rate limit POST requests to /api/lead
        if req.uri().path() == "/api/lead" && req.method() == axum::http::Method::POST {
            if self.limiter.check().is_err() {
                let response = Response::builder()
                    .status(StatusCode::TOO_MANY_REQUESTS)
                    .body(Body::from(
                        r#"{"error":"Too Many Requests","message":"Rate limit exceeded. Please try again later."}"#,
                    ))
                    .unwrap();

                return Box::pin(async move { Ok(response) });
            }
        }

        let future = self.inner.call(req);
        Box::pin(async move { future.await })
    }
}
