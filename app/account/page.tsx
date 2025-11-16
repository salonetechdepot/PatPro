import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"
import { CustomerDashboard } from "../../components/customer-dashboard"

export default async function AccountPage() {
  const session = await auth()
  if (!session?.userId) redirect("/sign-in")

  // 1. ensure customer row exists (auto-create if first visit)
  let customer = await prisma.customer.findUnique({ where: { clerkId: session.userId } })
  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        clerkId: session.userId,
        email: session.primaryEmailAddress?.emailAddress || "",
        name: session.fullName || "",
      },
    })
  }

  // 2. fetch customer’s real bookings
  const bookings = await prisma.booking.findMany({
    where: { customerId: customer.id },
    include: { services: { include: { service: true } } },
    orderBy: { bookingDate: "desc" },
  })

  return <CustomerDashboard serverBookings={bookings} customer={customer} />
}