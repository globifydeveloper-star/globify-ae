export async function sendEmail({
  to,
  subject,
  html,
  from,
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}): Promise<void> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY?.trim();
  if (!RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set it in .env.local or your deployment secrets.",
    );
  }

  // ✅ Must use verified Resend domain (globify.in — verified in your Resend dashboard)
  // Do NOT use globify.ae here unless you've also verified that domain in Resend
  const emailFrom = (from ?? "Globify Website <noreply@globify.in>").trim();

  const payload = {
    from: emailFrom,
    to: Array.isArray(to) ? to : [to],
    subject: subject.trim(),
    html,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }
    throw new Error(`Resend error ${res.status}: ${JSON.stringify(data)}`);
  }
}