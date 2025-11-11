import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const from = process.env.FROM_EMAIL as string

export async function sendBookingUpdate(
  to: string,
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED",
  bookingId: number,
  customerName: string,
  serviceNames: string,
  date: string
) {
  const subject =
    status === "CONFIRMED"
      ? "Booking Confirmed ✅"
      : status === "CANCELLED"
      ? "Booking Cancelled ❌"
      : "Booking Completed 🎉"

  const html = `
    <p>Hi ${customerName},</p>
    <p>Your cleaning booking <strong>#${bookingId}</strong> has been <strong>${status.toLowerCase()}</strong>.</p>
    <ul>
      <li>Services: ${serviceNames}</li>
      <li>Date: ${new Date(date).toLocaleString()}</li>
    </ul>
    <p>Thank you for choosing Pat Pro Cleaning!</p>
  `

  await resend.emails.send({ from, to, subject, html })
}