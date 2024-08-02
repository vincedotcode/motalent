// contactService.ts
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendContactEmail = async (contactData) => {
  const { name, email, subject, message } = contactData;

  const htmlMessage = `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #2E8B57;">You have a new contact form submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="border-left: 4px solid #2E8B57; padding-left: 16px; margin: 16px 0; color: #555;">${message}</p>
      <p style="color: #888; font-size: 0.9em;">This email was sent from your website's contact form.</p>
    </div>
  `;

  const msg = {
    to: process.env.CONTACT_EMAIL, 
    from: process.env.FROM_EMAIL, 
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    html: htmlMessage,
  };

  try {
    await sgMail.send(msg);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);

    if (error.response) {
      console.error(error.response.body);
    }

    return { success: false, message: 'Failed to send email' };
  }
};

export default sendContactEmail;
