import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

export async function sendCustomerOrderConfirmation(order: OrderDetails) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Love Joy Happiness <onboarding@resend.dev>",
      to: order.email,
      replyTo: "lovejoyhappinesscontact@yahoo.com",
      subject: `Comanda #${order.orderNumber} confirmată - Love Joy Happiness`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ff6b6b;">Mulțumim pentru comanda ta!</h1>
          <p>Dragă ${order.customerName},</p>
          <p>Am primit cu succes comanda ta cu numărul <strong>#${order.orderNumber}</strong>.</p>
          
          <h2 style="color: #333;">Detalii comandă:</h2>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3>Produse comandate:</h3>
            ${order.items
              .map(
                (item) => `
              <div style="margin: 10px 0;">
                <p style="margin: 5px 0;">
                  ${item.name} x ${item.quantity} - ${(item.price * item.quantity).toFixed(2)} lei
                </p>
              </div>
            `
              )
              .join("")}
            
            <div style="border-top: 1px solid #ddd; margin-top: 15px; padding-top: 15px;">
              <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)} lei</p>
              <p><strong>Transport:</strong> ${order.shipping.toFixed(2)} lei</p>
              <p style="font-size: 18px;"><strong>Total:</strong> ${order.total.toFixed(2)} lei</p>
            </div>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3>Adresa de livrare:</h3>
            <p>${order.address}</p>
            <p>${order.city}, ${order.county} ${order.postalCode}</p>
            <p>Telefon: ${order.phone}</p>
          </div>
          
          <p>Metoda de plată: ${order.paymentMethod}</p>
          
          <p>Te vom ține la curent cu statusul comenzii tale prin email.</p>
          
          <p>Pentru orice întrebări, ne poți contacta la <a href="mailto:lovejoyhappinesscontact@yahoo.com">lovejoyhappinesscontact@yahoo.com</a></p>
          
          <div style="margin-top: 30px; text-align: center; color: #666;">
            <p>Cu drag,</p>
            <p>Echipa Love Joy Happiness</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending customer confirmation email:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to send customer confirmation email:", error);
    throw error;
  }
}

export async function sendCompanyOrderNotification(order: OrderDetails) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Love Joy Happiness <onboarding@resend.dev>",
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
                <p style="margin: 5px 0;">
                  ${item.name} x ${item.quantity} - ${(item.price * item.quantity).toFixed(2)} lei
                </p>
              </div>
            `
              )
              .join("")}
            
            <div style="border-top: 1px solid #ddd; margin-top: 15px; padding-top: 15px;">
              <p><strong>Subtotal:</strong> ${order.subtotal.toFixed(2)} lei</p>
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
    });

    if (error) {
      console.error("Error sending company notification email:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Failed to send company notification email:", error);
    throw error;
  }
}
