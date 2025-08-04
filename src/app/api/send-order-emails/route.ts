import { NextResponse } from "next/server";
import { sendCustomerOrderConfirmation, sendCompanyOrderNotification } from "@/lib/emailService";

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
    const customerEmail = await sendCustomerOrderConfirmation(order);

    // Send company notification email
    const companyEmail = await sendCompanyOrderNotification(order);

    return NextResponse.json({
      success: true,
      customerEmail: customerEmail,
      companyEmail: companyEmail,
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
