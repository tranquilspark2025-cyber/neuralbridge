"use server"

export async function sendContactEmail(formData: {
  name: string
  email: string
  projectType: string
  message: string
}) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_TO_EMAIL

    console.log("[v0] API Key exists:", !!apiKey)
    console.log("[v0] To Email value:", toEmail)
    console.log("[v0] To Email is valid:", toEmail && toEmail.includes("@") && !toEmail.startsWith("re_"))

    // Validate API key
    if (!apiKey || !apiKey.startsWith("re_")) {
      console.log("[v0] Invalid or missing RESEND_API_KEY")
      return { success: false, error: "Email configuration error: Invalid API key" }
    }

    // Validate recipient email - ensure it's not the API key and has @ symbol
    const recipientEmail =
      toEmail && toEmail.includes("@") && !toEmail.startsWith("re_") ? toEmail : "brunojasgv.work@gmail.com"

    if (!recipientEmail.includes("@")) {
      console.log("[v0] Invalid recipient email format:", recipientEmail)
      return { success: false, error: "Email configuration error: Invalid recipient" }
    }

    console.log("[v0] Sending email to:", recipientEmail)

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: [recipientEmail],
        subject: `New Project Inquiry: ${formData.projectType}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Project Type:</strong> ${formData.projectType}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.log("[v0] Resend API error:", error)
      return { success: false, error: "Failed to send email" }
    }

    const result = await response.json()
    console.log("[v0] Email sent successfully:", result)
    return { success: true }
  } catch (error) {
    console.log("[v0] Catch error:", error)
    return { success: false, error: "Failed to send email" }
  }
}
