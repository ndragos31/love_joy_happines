import nodemailer from "nodemailer";
import { getTranslations } from "next-intl/server";

const emailConfig = {
  host: "smtp.mail.yahoo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.YAHOO_USER,
    pass: process.env.YAHOO_APP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(emailConfig);

transporter.verify((error: Error | null) => {
  if (error) {
    console.error("Email configuration error:", error);
  }
});

interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerType?: string;
  companyName?: string;
  cui?: string;
  regCom?: string;
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

export async function sendCustomerOrderConfirmation(
  order: OrderDetails,
  locale: "ro" | "en"
) {
  const t = await getTranslations({ locale, namespace: "email.orderConfirmation" });

  const mailOptions = {
    from: `"Love Joy Happiness" <${process.env.YAHOO_USER}>`,
    to: order.email,
    replyTo: "lovejoyhappinesscontact@yahoo.com",
    subject: t("subject", { orderNumber: order.orderNumber }),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b6b;">${t("heading")}</h1>
        <p>${t("greeting", { customerName: order.customerName })}</p>
        <p>${t("intro", { orderNumber: order.orderNumber })}</p>

        <h2 style="color: #333;">${t("detailsHeading", { orderNumber: order.orderNumber })}</h2>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${t("productsHeading")}</h3>
          ${order.items
            .map(
              (item) => `
            <div style="margin: 10px 0;">
              <p style="margin: 5px 0; font-weight: 600;">
                ${item.name} x ${item.quantity} - ${(item.price * item.quantity).toFixed(2)} lei
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
            <p><strong>${t("subtotalLabel")}</strong> ${order.subtotal.toFixed(2)} lei</p>
            ${order.discount && order.discount > 0
              ? `<p style="color: #10b981;"><strong>${t("discountLabel")}${order.promoCode ? ` (${order.promoCode})` : ""}</strong> -${order.discount.toFixed(2)} lei</p>`
              : ""}
            <p><strong>${t("shippingLabel")}</strong> ${order.shipping.toFixed(2)} lei</p>
            <p style="font-size: 18px;"><strong>${t("totalLabel")}</strong> ${order.total.toFixed(2)} lei</p>
          </div>
        </div>

        ${order.customerType === "company" ? `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${t("companyDetailsHeading")}</h3>
          <p><strong>${t("companyLabel")}</strong> ${order.companyName}</p>
          <p><strong>${t("cuiLabel")}</strong> ${order.cui}</p>
          <p><strong>${t("regComLabel")}</strong> ${order.regCom}</p>
        </div>
        ` : ""}

        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${t("shippingAddressHeading")}</h3>
          <p>${order.address}</p>
          <p>${order.city}, ${order.county} ${order.postalCode}</p>
          <p>${t("phoneLabel")} ${order.phone}</p>
        </div>

        <p><strong>${t("paymentMethodLabel")}</strong> ${order.paymentMethod}</p>

        <p>${t("statusUpdate")}</p>

        <p>${t("contactLine")} <a href="mailto:lovejoyhappinesscontact@yahoo.com">lovejoyhappinesscontact@yahoo.com</a></p>

        <div style="margin-top: 30px; text-align: center; color: #666;">
          <p>${t("signatureKindly")}</p>
          <p>${t("signatureTeam")}</p>
        </div>
      </div>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending customer email:", error);
    throw error;
  }
}

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

        ${order.customerType === "company" ? `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Date Facturare (Persoană Juridică):</h3>
          <p><strong>Companie:</strong> ${order.companyName}</p>
          <p><strong>CUI:</strong> ${order.cui}</p>
          <p><strong>Nr. Reg. Com.:</strong> ${order.regCom}</p>
        </div>
        ` : ""}

        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>Produse comandate:</h3>
          ${order.items
            .map(
              (item) => `
            <div style="margin: 10px 0;">
              <p style="margin: 5px 0; font-weight: 600;">
                ${item.name} x ${item.quantity} - ${(item.price * item.quantity).toFixed(2)} lei
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
            <p style="font-size: 18px;"><strong>Total:</strong> ${order.total.toFixed(2)} lei</p>
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
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending company email:", error);
    throw error;
  }
}

export async function sendContactFormEmails(
  contactData: ContactFormData,
  locale: "ro" | "en"
) {
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

  const t = await getTranslations({ locale, namespace: "email.contactReply" });

  const customerMailOptions = {
    from: `"Love Joy Happiness" <${process.env.YAHOO_USER}>`,
    to: contactData.email,
    replyTo: "lovejoyhappinesscontact@yahoo.com",
    subject: t("subject"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b6b;">${t("heading")}</h1>
        <p>${t("greeting", { customerName: contactData.name })}</p>
        <p>${t("body")}</p>

        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <h3>${t("yourMessageHeading")}</h3>
          <p style="white-space: pre-wrap; font-style: italic;">"${contactData.message}"</p>
        </div>

        <p>${t("urgentHeading")}</p>
        <ul>
          <li>${t("phoneLabel")}</li>
          <li>${t("emailLabel")}</li>
        </ul>

        <div style="margin-top: 30px; text-align: center; color: #666;">
          <p>${t("signatureKindly")}</p>
          <p>${t("signatureTeam")}</p>
        </div>
      </div>
    `,
  };

  try {
    const [companyResult, customerResult] = await Promise.all([
      transporter.sendMail(companyMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

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
