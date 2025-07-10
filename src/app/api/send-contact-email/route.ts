import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const { name, email, message }: ContactFormData = await req.json();

    // Send notification email to company
    const companyEmail = await resend.emails.send({
      from: "Love Joy Happiness <onboarding@resend.dev>",
      to: "lovejoyhappinesscontact@yahoo.com",
      replyTo: email,
      subject: `Mesaj nou de contact de la ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ff6b6b;">Mesaj nou de contact!</h1>
          <p>Ați primit un mesaj nou prin formularul de contact de pe site.</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3>Detalii contact:</h3>
            <p><strong>Nume:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3>Mesaj:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p><em>Puteți răspunde direct la acest email pentru a contacta clientul.</em></p>
        </div>
      `,
    });

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "Love Joy Happiness <onboarding@resend.dev>",
      to: email,
      replyTo: "lovejoyhappinesscontact@yahoo.com",
      subject: "Mesajul tău a fost primit - Love Joy Happiness",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #ff6b6b;">Mulțumim pentru mesajul tău!</h1>
          <p>Dragă ${name},</p>
          <p>Am primit mesajul tău și îți mulțumim că ne-ai contactat. Echipa noastră va analiza cererea ta și te va contacta în cel mai scurt timp posibil.</p>
          
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h3>Mesajul tău:</h3>
            <p style="white-space: pre-wrap; font-style: italic;">"${message}"</p>
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
    });

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
      companyEmailId: companyEmail.data?.id,
      customerEmailId: customerEmail.data?.id,
    });
  } catch (error) {
    console.error("Error sending contact emails:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send emails" },
      { status: 500 }
    );
  }
}
