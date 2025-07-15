import { NextResponse } from "next/server";
import Stripe from "stripe";

// Validate that we have the required environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is required");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil", // Use the API version expected by the TypeScript definitions
});

export async function POST(req: Request) {
  try {
    console.log("🔵 Starting payment intent creation...");

    // Validate request body
    const body = await req.json();
    const { amount } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      console.error("❌ Invalid amount provided:", amount);
      return NextResponse.json(
        { error: "Invalid amount. Amount must be a positive number." },
        { status: 400 }
      );
    }

    console.log("💰 Amount received:", amount);

    // Create a PaymentIntent with the order amount and currency
    console.log("🔄 Creating payment intent with Stripe...");
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency: "ron",
      payment_method_types: ["card"], // Only allow card payments
      metadata: {
        created_at: new Date().toISOString(),
      },
    });

    console.log("✅ Payment intent created successfully:", {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (err) {
    console.error("❌ Error creating payment intent:", err);

    // Handle specific Stripe errors
    if (err instanceof Stripe.errors.StripeError) {
      console.error("Stripe error details:", {
        type: err.type,
        code: err.code,
        message: err.message,
        statusCode: err.statusCode,
      });

      // Return specific error messages for common issues
      if (err.type === "StripeAuthenticationError") {
        return NextResponse.json(
          {
            error: "Stripe authentication failed. Please check your API keys.",
          },
          { status: 401 }
        );
      }

      if (err.type === "StripeInvalidRequestError") {
        return NextResponse.json(
          {
            error:
              "Invalid request to Stripe. Please check your payment details.",
          },
          { status: 400 }
        );
      }
    }

    console.error("Error details:", {
      message: err instanceof Error ? err.message : "Unknown error",
      stack: err instanceof Error ? err.stack : undefined,
    });

    return NextResponse.json(
      { error: "Error creating payment intent. Please try again." },
      { status: 500 }
    );
  }
}
