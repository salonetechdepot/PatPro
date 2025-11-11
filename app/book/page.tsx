import { prisma } from "../../lib/prisma"
import { BookingForm } from "../../components/booking-form"

export default async function BookPage() {
  const services = await prisma.service.findMany({ orderBy: { id: "asc" } })
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Book a Cleaning</h1>
      <BookingForm services={services} />
    </main>
  )
}