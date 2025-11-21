import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { prisma } from "../../lib/prisma"
import { StaffDashboard } from "../../components/staff-dashboard"

export default async function StaffPage() {
  const session = await auth()
  if (!session?.userId) redirect("/sign-in")

  // ensure staff record exists (auto-create on first login)
  let staff = await prisma.staff.findUnique({ where: { clerkId: session.userId } })
  if (!staff) {
    staff = await prisma.staff.create({
      data: {
        clerkId: session.userId,
        email: session.primaryEmailAddress?.emailAddress || "",
        name: session.fullName || "",
      },
    })
  }

  // today + upcoming jobs assigned to this staff
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const bookings = await prisma.booking.findMany({
    where: {
      status: { in: ["PENDING", "CONFIRMED"] },
      assignedStaffId: staff.id, // we’ll add this FK next
    },
    include: { customer: true, services: { include: { service: true } } },
    orderBy: { bookingDate: "asc" },
  })

  return <StaffDashboard staff={staff} bookings={bookings} />
}