use lettre::{
    message::{header::ContentType, Mailbox, MultiPart, SinglePart},
    transport::smtp::authentication::Credentials,
    Message, SmtpTransport, Transport,
};

use crate::{config::Config, errors::ApiError, models::Lead};

mod email_templates {
    use crate::models::Lead;

    pub fn welcome_email_html(lead: &Lead) -> String {
        format!(r#"<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Free Homepage Preview</title>
</head>
<body style="margin: 0; padding: 0; background-color: #FAFAFA; font-family: Arial, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #FAFAFA;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px;">
                    <tr>
                        <td style="padding: 40px; text-align: center; border-bottom: 1px solid #E5E5E5;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #0B0B0C;">
                                AutoAssist<span style="color: #D6B56F;">.ai</span>
                            </h1>
                            <p style="margin: 8px 0 0 0; font-size: 14px; color: #717171;">Premium Web Solutions</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px; text-align: center;">
                            <div style="display: inline-block; padding: 10px 20px; background: #D6B56F; border-radius: 100px; margin-bottom: 20px;">
                                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0B0B0C;">REQUEST RECEIVED</p>
                            </div>
                            <h2 style="margin: 0; font-size: 32px; font-weight: 700; color: #0B0B0C;">Your Free Homepage<br>Preview is Coming!</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 30px 40px;">
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4A4A4A;">Hi <strong>{}</strong>,</p>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4A4A4A;">Thanks for requesting a free homepage preview from AutoAssist.ai! We are excited to show you what we can create for <strong>{}</strong>.</p>
                            <div style="background: #F5F5F5; border-left: 4px solid #D6B56F; padding: 20px; margin: 30px 0; border-radius: 8px;">
                                <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #0B0B0C;">What happens next:</h3>
                                <p style="margin: 8px 0; font-size: 15px; color: #4A4A4A;"><strong>1.</strong> We will review your brief and current online presence</p>
                                <p style="margin: 8px 0; font-size: 15px; color: #4A4A4A;"><strong>2.</strong> Our design team creates a custom homepage concept</p>
                                <p style="margin: 8px 0; font-size: 15px; color: #4A4A4A;"><strong>3.</strong> You receive the full mockup within <strong>24-48 hours</strong></p>
                            </div>
                            <div style="background: #FFFFFF; border: 1px solid #E5E5E5; padding: 20px; margin: 30px 0; border-radius: 8px;">
                                <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 600; color: #0B0B0C;">Your Project Details:</h3>
                                <p style="margin: 6px 0; font-size: 14px;"><span style="color: #717171;">Company:</span> <strong>{}</strong></p>
                                <p style="margin: 6px 0; font-size: 14px;"><span style="color: #717171;">Website:</span> <strong>{}</strong></p>
                                <p style="margin: 6px 0; font-size: 14px;"><span style="color: #717171;">Goal:</span> <strong>{}</strong></p>
                                <p style="margin: 6px 0; font-size: 14px;"><span style="color: #717171;">Budget:</span> <strong>{}</strong></p>
                            </div>
                            <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4A4A4A;"><strong>No strings attached:</strong> This preview is completely free. If you love it, great! If not, you keep the design with no obligation.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center;">
                            <div style="background: #F5F5F5; padding: 30px; border-radius: 12px;">
                                <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 600; color: #0B0B0C;">Want to Get Started Right Away?</h3>
                                <p style="margin: 0 0 20px 0; font-size: 15px; color: #4A4A4A;">While you wait, explore our packages.</p>
                                <a href="https://autoassist.ai/#pricing" style="display: inline-block; padding: 16px 32px; background: #D6B56F; color: #0B0B0C; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px;">View Our Packages</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 40px 40px 40px; text-align: center; border-top: 1px solid #E5E5E5;">
                            <p style="margin: 30px 0 10px 0; font-size: 15px; color: #4A4A4A;">Questions? Reply anytime - we respond within 4 hours.</p>
                            <p style="margin: 0; font-size: 16px; font-weight: 600; color: #0B0B0C;">Talk soon,<br><span style="color: #D6B56F;">The AutoAssist.ai Team</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 40px; background: #F5F5F5; border-radius: 0 0 16px 16px; text-align: center;">
                            <p style="margin: 0 0 10px 0; font-size: 13px; color: #717171;">AutoAssist.ai - Premium Web Solutions</p>
                            <p style="margin: 0 0 15px 0; font-size: 13px;"><a href="mailto:autoassist.contact@yahoo.com" style="color: #D6B56F; text-decoration: none;">autoassist.contact@yahoo.com</a></p>
                            <p style="margin: 0; font-size: 12px;"><a href="https://autoassist.ai/unsubscribe" style="color: #A3A3A3; text-decoration: underline;">Unsubscribe</a> | <a href="https://autoassist.ai/privacy" style="color: #A3A3A3; text-decoration: underline;">Privacy</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>"#, lead.full_name, lead.company, lead.company, lead.website, lead.goal, lead.budget)
    }

    pub fn welcome_email_text(lead: &Lead) -> String {
        format!(r#"Hi {},

Thanks for requesting a free homepage preview from AutoAssist.ai!

What happens next:
1. We will review your brief and current online presence
2. Our design team creates a custom homepage concept for {}
3. You receive the full mockup within 24-48 hours

YOUR PROJECT DETAILS:
- Company: {}
- Website: {}
- Goal: {}
- Budget: {}

NO STRINGS ATTACHED:
This preview is completely free. If you love it, great! If not, you keep the design with no obligation.

View our packages: https://autoassist.ai/#pricing

Questions? Reply anytime - we respond within 4 hours.

Talk soon,
The AutoAssist.ai Team
autoassist.contact@yahoo.com"#, 
        lead.full_name, lead.company, lead.company, lead.website, lead.goal, lead.budget)
    }

    pub fn admin_notification_html(lead: &Lead) -> String {
        let utm_source = lead.utm_source.as_deref().unwrap_or("N/A");
        let utm_medium = lead.utm_medium.as_deref().unwrap_or("N/A");
        let utm_campaign = lead.utm_campaign.as_deref().unwrap_or("N/A");
        let phone = lead.phone.as_deref().unwrap_or("N/A");
        let ip = lead.consent_ip.as_deref().unwrap_or("N/A");

        format!(r#"<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>New Lead</title></head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:Arial,sans-serif;">
<table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#FAFAFA;">
<tr><td style="padding:40px 20px;">
<table width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;background:#FFF;border-radius:12px;">
<tr><td style="padding:30px;background:linear-gradient(135deg,#10B981,#059669);border-radius:12px 12px 0 0;text-align:center;">
<h1 style="margin:0;font-size:24px;color:#FFF;">New Lead Received!</h1>
<p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.9);">{} - {} - {}</p>
</td></tr>
<tr><td style="padding:30px;">
<h2 style="margin:0 0 15px;font-size:18px;color:#0B0B0C;border-bottom:2px solid #E5E5E5;padding-bottom:10px;">CONTACT</h2>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Name:</span> <strong>{}</strong></p>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Company:</span> <strong>{}</strong></p>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Email:</span> <a href="mailto:{}" style="color:#D6B56F;text-decoration:none;">{}</a></p>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Phone:</span> <strong>{}</strong></p>
</td></tr>
<tr><td style="padding:0 30px 30px;">
<h2 style="margin:0 0 15px;font-size:18px;color:#0B0B0C;border-bottom:2px solid #E5E5E5;padding-bottom:10px;">PROJECT</h2>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Website:</span> <strong>{}</strong></p>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Goal:</span> {}</p>
<p style="margin:8px 0;font-size:14px;"><span style="color:#717171;">Budget:</span> <span style="padding:4px 12px;background:#E8D9B8;color:#0B0B0C;border-radius:6px;font-weight:600;">{}</span></p>
</td></tr>
<tr><td style="padding:0 30px 30px;">
<h2 style="margin:0 0 15px;font-size:18px;color:#0B0B0C;border-bottom:2px solid #E5E5E5;padding-bottom:10px;">TRACKING</h2>
<p style="margin:8px 0;font-size:13px;"><span style="color:#717171;">UTM Source:</span> {}</p>
<p style="margin:8px 0;font-size:13px;"><span style="color:#717171;">UTM Medium:</span> {}</p>
<p style="margin:8px 0;font-size:13px;"><span style="color:#717171;">UTM Campaign:</span> {}</p>
<p style="margin:8px 0;font-size:13px;"><span style="color:#717171;">IP:</span> {}</p>
<p style="margin:8px 0;font-size:13px;"><span style="color:#717171;">Lead ID:</span> {}</p>
</td></tr>
<tr><td style="padding:0 30px 30px;text-align:center;">
<a href="mailto:{}?subject=Re: Your AutoAssist.ai Preview" style="display:inline-block;padding:14px 28px;background:#D6B56F;color:#0B0B0C;text-decoration:none;border-radius:8px;font-weight:600;">Reply to Lead</a>
</td></tr>
<tr><td style="padding:20px 30px;background:#F5F5F5;border-radius:0 0 12px 12px;text-align:center;">
<p style="margin:0;font-size:12px;color:#717171;">AutoAssist.ai Lead Notification</p>
</td></tr>
</table></td></tr></table></body></html>"#,
        lead.full_name, lead.company, lead.budget,
        lead.full_name, lead.company, lead.email, lead.email, phone,
        lead.website, lead.goal, lead.budget,
        utm_source, utm_medium, utm_campaign, ip, lead.id,
        lead.email)
    }
}

pub struct EmailService {
    smtp_host: String,
    smtp_port: u16,
    smtp_username: String,
    smtp_password: String,
    smtp_from: String,
    admin_email: String,
}

impl EmailService {
    pub fn new(config: &Config) -> Self {
        Self {
            smtp_host: config.smtp_host.clone(),
            smtp_port: config.smtp_port,
            smtp_username: config.smtp_username.clone(),
            smtp_password: config.smtp_password.clone(),
            smtp_from: config.smtp_from.clone(),
            admin_email: config.admin_email.clone(),
        }
    }

    fn create_transport(&self) -> Result<SmtpTransport, ApiError> {
        let creds = Credentials::new(self.smtp_username.clone(), self.smtp_password.clone());

        // Support both TLS (587) and SSL (465) ports
        let transport = if self.smtp_port == 465 {
            // Use implicit TLS for port 465 (Yahoo Mail SSL)
            SmtpTransport::relay(&self.smtp_host)
                .map_err(|e| ApiError::Email(format!("SMTP relay error: {}", e)))?
                .port(self.smtp_port)
                .credentials(creds)
                .timeout(Some(std::time::Duration::from_secs(30)))
                .build()
        } else {
            // Use STARTTLS for port 587
            SmtpTransport::relay(&self.smtp_host)
                .map_err(|e| ApiError::Email(format!("SMTP relay error: {}", e)))?
                .port(self.smtp_port)
                .credentials(creds)
                .timeout(Some(std::time::Duration::from_secs(30)))
                .build()
        };

        Ok(transport)
    }

    fn is_valid_email(&self, email: &str) -> bool {
        // Basic email validation
        email.contains('@') 
            && email.contains('.') 
            && email.len() > 5
            && !email.starts_with('@')
            && !email.ends_with('@')
    }

    pub async fn send_welcome_email(&self, lead: &Lead) -> Result<(), ApiError> {
        self.send_welcome_email_with_retry(lead, 3).await
    }

    async fn send_welcome_email_with_retry(&self, lead: &Lead, max_retries: u32) -> Result<(), ApiError> {
        let mut attempts = 0;
        let mut last_error = None;

        while attempts < max_retries {
            match self.send_welcome_email_internal(lead).await {
                Ok(_) => {
                    if attempts > 0 {
                        tracing::info!("Welcome email sent successfully after {} retries", attempts);
                    }
                    return Ok(());
                }
                Err(e) => {
                    attempts += 1;
                    last_error = Some(e);
                    if attempts < max_retries {
                        tracing::warn!("Email send attempt {} failed, retrying...", attempts);
                        tokio::time::sleep(tokio::time::Duration::from_secs(2_u64.pow(attempts))).await;
                    }
                }
            }
        }

        Err(last_error.unwrap_or_else(|| ApiError::Email("Failed to send email after retries".to_string())))
    }

    async fn send_welcome_email_internal(&self, lead: &Lead) -> Result<(), ApiError> {
        // Validate email address
        if !self.is_valid_email(&lead.email) {
            return Err(ApiError::Email("Invalid email address format".to_string()));
        }

        let to: Mailbox = lead
            .email
            .parse()
            .map_err(|_| ApiError::Email("Invalid email address".to_string()))?;

        let from: Mailbox = self
            .smtp_from
            .parse()
            .map_err(|_| ApiError::Email("Invalid from address".to_string()))?;

        let subject = "Your Free Homepage Preview is Coming! 🎉";

        // Create multipart email with HTML and plain text
        let html_body = email_templates::welcome_email_html(lead);
        let text_body = email_templates::welcome_email_text(lead);

        let email = Message::builder()
            .from(from.clone())
            .to(to)
            .subject(subject)
            .reply_to(from)
            .multipart(
                MultiPart::alternative()
                    .singlepart(
                        SinglePart::builder()
                            .header(ContentType::TEXT_PLAIN)
                            .body(text_body)
                    )
                    .singlepart(
                        SinglePart::builder()
                            .header(ContentType::TEXT_HTML)
                            .body(html_body)
                    )
            )
            .map_err(|e| ApiError::Email(format!("Failed to build email: {}", e)))?;

        let transport = self.create_transport()?;

        tokio::task::spawn_blocking(move || {
            transport
                .send(&email)
                .map_err(|e| ApiError::Email(format!("Failed to send email: {}", e)))
        })
        .await
        .map_err(|e| ApiError::Email(format!("Task join error: {}", e)))??;

        tracing::info!("Welcome email sent successfully to {}", lead.email);
        Ok(())
    }

    pub async fn send_admin_notification(&self, lead: &Lead) -> Result<(), ApiError> {
        self.send_admin_notification_with_retry(lead, 3).await
    }

    async fn send_admin_notification_with_retry(&self, lead: &Lead, max_retries: u32) -> Result<(), ApiError> {
        let mut attempts = 0;
        let mut last_error = None;

        while attempts < max_retries {
            match self.send_admin_notification_internal(lead).await {
                Ok(_) => {
                    if attempts > 0 {
                        tracing::info!("Admin notification sent successfully after {} retries", attempts);
                    }
                    return Ok(());
                }
                Err(e) => {
                    attempts += 1;
                    last_error = Some(e);
                    if attempts < max_retries {
                        tracing::warn!("Admin notification attempt {} failed, retrying...", attempts);
                        tokio::time::sleep(tokio::time::Duration::from_secs(2_u64.pow(attempts))).await;
                    }
                }
            }
        }

        Err(last_error.unwrap_or_else(|| ApiError::Email("Failed to send admin notification after retries".to_string())))
    }

    async fn send_admin_notification_internal(&self, lead: &Lead) -> Result<(), ApiError> {
        let to: Mailbox = self
            .admin_email
            .parse()
            .map_err(|_| ApiError::Email("Invalid admin email address".to_string()))?;

        let from: Mailbox = self
            .smtp_from
            .parse()
            .map_err(|_| ApiError::Email("Invalid from address".to_string()))?;

        let subject = format!(
            "[New Lead] {} — {} — {}",
            lead.full_name, lead.company, lead.budget
        );

        // Create HTML email for admin
        let html_body = email_templates::admin_notification_html(lead);

        let email = Message::builder()
            .from(from.clone())
            .to(to)
            .subject(subject)
            .reply_to(from)
            .header(ContentType::TEXT_HTML)
            .body(html_body)
            .map_err(|e| ApiError::Email(format!("Failed to build email: {}", e)))?;

        let transport = self.create_transport()?;

        tokio::task::spawn_blocking(move || {
            transport
                .send(&email)
                .map_err(|e| ApiError::Email(format!("Failed to send email: {}", e)))
        })
        .await
        .map_err(|e| ApiError::Email(format!("Task join error: {}", e)))??;

        tracing::info!("Admin notification sent successfully to {}", self.admin_email);
        Ok(())
    }
}
