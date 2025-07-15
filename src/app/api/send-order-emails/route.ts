import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory cache to prevent duplicate email sends
const processedOrders = new Map<string, number>();

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

// Helper function to add delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to check if order was recently processed
const isOrderRecentlyProcessed = (orderNumber: string): boolean => {
  const now = Date.now();
  const lastProcessed = processedOrders.get(orderNumber);

  if (lastProcessed && now - lastProcessed < 300000) {
    // 5 minutes
    return true;
  }

  return false;
};

// Helper function to mark order as processed
const markOrderAsProcessed = (orderNumber: string): void => {
  processedOrders.set(orderNumber, Date.now());

  // Clean up old entries (older than 10 minutes)
  const tenMinutesAgo = Date.now() - 600000;
  for (const [order, timestamp] of processedOrders.entries()) {
    if (timestamp < tenMinutesAgo) {
      processedOrders.delete(order);
    }
  }
};

export async function POST(req: Request) {
  try {
    const order: OrderDetails = await req.json();

    // Check if this order was recently processed
    if (isOrderRecentlyProcessed(order.orderNumber)) {
      return NextResponse.json({
        success: true,
        message: "Order already processed recently",
        skipped: true,
      });
    }

    // Mark order as being processed
    markOrderAsProcessed(order.orderNumber);

    // Send customer confirmation email first
    const customerEmail = await resend.emails.send({
      from: "Love Joy Happiness <onboarding@resend.dev>",
      to: order.email,
      replyTo: "lovejoyhappinesscontact@yahoo.com",
      subject: `Comanda #${order.orderNumber} confirmată - Love Joy Happiness`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ff6b6b;">Mulțumim pentru comanda ta!</h1>
          <p>Dragă ${order.customerName},</p>
          <p>Am primit cu succes comanda ta cu numărul <strong>#${order.orderNumber}</strong>.</p>
          
          <h2 style="color: #333;">Detalii comandă #${order.orderNumber}:</h2>
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
          
          <p><strong>Metoda de plată:</strong> ${order.paymentMethod}</p>
          
          <p>Te vom ține la curent cu statusul comenzii tale prin email.</p>
          
          <p>Pentru orice întrebări, ne poți contacta la <a href="mailto:lovejoyhappinesscontact@yahoo.com">lovejoyhappinesscontact@yahoo.com</a></p>
          
          <div style="margin-top: 30px; text-align: center; color: #666;">
            <p>Cu drag,</p>
            <p>Echipa Love Joy Happiness</p>
          </div>
        </div>
      `,
    });

    // Add 10-second delay before sending company email
    await delay(10000);

    // Send company notification email
    const companyEmail = await resend.emails.send({
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

    return NextResponse.json({
      success: true,
      customerEmail: customerEmail.data,
      companyEmail: companyEmail.data,
      message: "Emails sent successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send order emails",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
