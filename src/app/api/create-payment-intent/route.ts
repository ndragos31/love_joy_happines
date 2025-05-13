import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  try {
    console.log("🔵 Starting payment intent creation...");
    const { amount } = await req.json();
    console.log("💰 Amount received:", amount);

    // Create a PaymentIntent with the order amount and currency
    console.log("🔄 Creating payment intent with Stripe...");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency: "ron",
      payment_method_types: ["card"], // Only allow card payments
    });

    console.log("✅ Payment intent created successfully:", {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("❌ Error creating payment intent:", err);
    console.error("Error details:", {
      message: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : undefined,
    });
    return NextResponse.json(
      { error: "Error creating payment intent" },
      { status: 500 }
    );
  }
}
