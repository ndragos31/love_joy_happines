import nodemailer from "nodemailer";

// Email configuration for Yahoo
const emailConfig = {
  host: "smtp.mail.yahoo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.YAHOO_USER, // Your Yahoo email address
    pass: process.env.YAHOO_APP_PASSWORD, // Yahoo App Password
  },
};

// Create transporter
const transporter = nodemailer.createTransport(emailConfig);

// Verify connection configuration
transporter.verify((error: Error | null) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    // Email server is ready
  }
});

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    attributes?: Record<string, string>;
  }>;
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
  promoCode?: string;
  paymentMethod: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Send customer order confirmation
export async function sendCustomerOrderConfirmation(order: OrderDetails) {
  const mailOptions = {
    from: `"Love Joy Happiness" <${process.env.YAHOO_USER}>`,
    to: order.email,
    replyTo: "lovejoyhappinesscontact@yahoo.com",
    subject: `Comanda #${order.orderNumber} confirmată - Love Joy Happiness`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b6b;">Mulțumim pentru comanda ta!</h1>
        <p>Dragă ${order.customerName},</p>
        <p>Am primit cu succes comanda ta cu numărul <strong>#${
          order.orderNumber
        }</strong>.</p>
        
        <h2 style="color: #333;">Detalii comandă #${order.orderNumber}:</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Produse comandate:</h3>
          ${order.items
            .map(
              (item) => `
            <div style="margin: 10px 0;">
              <p style="margin: 5px 0; font-weight: 600;">
                ${item.name} x ${item.quantity} - ${(
                item.price * item.quantity
              ).toFixed(2)} lei
              </p>
              ${item.attributes && Object.keys(item.attributes).length > 0
                ? `<p style="margin: 5px 0; padding-left: 15px; color: #666; font-size: 14px;">
                    ${Object.entries(item.attributes)
                      .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                      .join(", ")}
                  </p>`
                : ""}
            </div>
          `
            )
            .join("")}
          
          <div style="border-top: 1px solid #ddd; margin-top: 15px; padding-top: 15px;">
            <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)} lei</p>
            ${order.discount && order.discount > 0
              ? `<p style="color: #10b981;"><strong>Reducere${order.promoCode ? ` (${order.promoCode})` : ""}:</strong> -${order.discount.toFixed(2)} lei</p>`
              : ""}
            <p><strong>Transport:</strong> ${order.shipping.toFixed(2)} lei</p>
            <p style="font-size: 18px;"><strong>Total:</strong> ${order.total.toFixed(
              2
            )} lei</p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Adresa de livrare:</h3>
          <p>${order.address}</p>
          <p>${order.city}, ${order.county} ${order.postalCode}</p>
          <p>Telefon: ${order.phone}</p>
        </div>
        
        <p><strong>Metoda de plată:</strong> ${order.paymentMethod}</p>
        
        <p>Te vom ține la curent cu statusul comenzii tale prin email.</p>
        
        <p>Pentru orice întrebări, ne poți contacta la <a href="mailto:lovejoyhappinesscontact@yahoo.com">lovejoyhappinesscontact@yahoo.com</a></p>
        
        <div style="margin-top: 30px; text-align: center; color: #666;">
          <p>Cu drag,</p>
          <p>Echipa Love Joy Happiness</p>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    // Customer email sent successfully
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending customer email:", error);
    throw error;
  }
}

// Send company order notification
export async function sendCompanyOrderNotification(order: OrderDetails) {
  const mailOptions = {
    from: `"Love Joy Happiness" <${process.env.YAHOO_USER}>`,
    to: "lovejoyhappinesscontact@yahoo.com",
    replyTo: "lovejoyhappinesscontact@yahoo.com",
    subject: `Comandă nouă #${order.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b6b;">Comandă nouă primită!</h1>
        <p>O nouă comandă a fost plasată pe site.</p>
        
        <h2 style="color: #333;">Detalii comandă #${order.orderNumber}:</h2>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Informații client:</h3>
          <p><strong>Nume:</strong> ${order.customerName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Telefon:</strong> ${order.phone}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Produse comandate:</h3>
          ${order.items
            .map(
              (item) => `
            <div style="margin: 10px 0;">
              <p style="margin: 5px 0; font-weight: 600;">
                ${item.name} x ${item.quantity} - ${(
                item.price * item.quantity
              ).toFixed(2)} lei
              </p>
              ${item.attributes && Object.keys(item.attributes).length > 0
                ? `<p style="margin: 5px 0; padding-left: 15px; color: #666; font-size: 14px;">
                    ${Object.entries(item.attributes)
                      .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
                      .join(", ")}
                  </p>`
                : ""}
            </div>
          `
            )
            .join("")}
          
          <div style="border-top: 1px solid #ddd; margin-top: 15px; padding-top: 15px;">
            <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)} lei</p>
            ${order.discount && order.discount > 0
              ? `<p style="color: #10b981;"><strong>Reducere${order.promoCode ? ` (${order.promoCode})` : ""}:</strong> -${order.discount.toFixed(2)} lei</p>`
              : ""}
            <p><strong>Transport:</strong> ${order.shipping.toFixed(2)} lei</p>
            <p style="font-size: 18px;"><strong>Total:</strong> ${order.total.toFixed(
              2
            )} lei</p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Adresa de livrare:</h3>
          <p>${order.address}</p>
          <p>${order.city}, ${order.county} ${order.postalCode}</p>
        </div>
        
        <p><strong>Metoda de plată:</strong> ${order.paymentMethod}</p>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    // Company email sent successfully
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending company email:", error);
    throw error;
  }
}

// Send contact form emails
export async function sendContactFormEmails(contactData: ContactFormData) {
  // Send notification to company
  const companyMailOptions = {
    from: `"Love Joy Happiness" <${process.env.YAHOO_USER}>`,
    to: "lovejoyhappinesscontact@yahoo.com",
    replyTo: contactData.email,
    subject: `Mesaj nou de contact de la ${contactData.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b6b;">Mesaj nou de contact!</h1>
        <p>Ați primit un mesaj nou prin formularul de contact de pe site.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Detalii contact:</h3>
          <p><strong>Nume:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Mesaj:</h3>
          <p style="white-space: pre-wrap;">${contactData.message}</p>
        </div>
        
        <p><em>Puteți răspunde direct la acest email pentru a contacta clientul.</em></p>
      </div>
    `,
  };

  // Send confirmation to customer
  const customerMailOptions = {
    from: `"Love Joy Happiness" <${process.env.YAHOO_USER}>`,
    to: contactData.email,
    replyTo: "lovejoyhappinesscontact@yahoo.com",
    subject: "Mesajul tău a fost primit - Love Joy Happiness",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b6b;">Mulțumim pentru mesajul tău!</h1>
        <p>Dragă ${contactData.name},</p>
        <p>Am primit mesajul tău și îți mulțumim că ne-ai contactat. Echipa noastră va analiza cererea ta și te va contacta în cel mai scurt timp posibil.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Mesajul tău:</h3>
          <p style="white-space: pre-wrap; font-style: italic;">"${contactData.message}"</p>
        </div>
        
        <p>Pentru urgențe, ne poți contacta direct la:</p>
        <ul>
          <li>Telefon: +40 750 485 858</li>
          <li>Email: lovejoyhappinesscontact@yahoo.com</li>
        </ul>
        
        <div style="margin-top: 30px; text-align: center; color: #666;">
          <p>Cu drag,</p>
          <p>Echipa Love Joy Happiness</p>
        </div>
      </div>
    `,
  };

  try {
    // Send both emails
    const [companyResult, customerResult] = await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    // Contact form emails sent successfully
    return {
      success: true,
      companyMessageId: companyResult.messageId,
      customerMessageId: customerResult.messageId,
    };
  } catch (error) {
    console.error("Error sending contact form emails:", error);
    throw error;
  }
}
