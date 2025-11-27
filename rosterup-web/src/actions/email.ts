"use server";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: EmailPayload) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.log("---------------------------------------------------");
    console.log("📧 [MOCK EMAIL SERVICE - NO BREVO KEY]");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log("Body:", html);
    console.log("---------------------------------------------------");
    return { success: true, mock: true };
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "RosterUp", email: "no-reply@rosterup.com" }, // You might need to verify a sender in Brevo
        to: [{ email: to }],
        subject: subject,
        htmlContent: html,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Error sending email via Brevo:", error);
    return { success: false, error };
  }
}
