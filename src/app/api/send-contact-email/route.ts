import { NextResponse } from "next/server";
import { sendContactFormEmails } from "@/lib/emailService";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message }: ContactFormData = await req.json();

    // Send both emails using the new email service
    const result = await sendContactFormEmails({ name, email, message });

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      companyEmailId: result.companyMessageId,
      customerEmailId: result.customerMessageId,
    });
  } catch (error) {
    console.error("Error sending contact emails:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
