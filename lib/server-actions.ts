"use server"

import { prisma } from "./prisma"
import { revalidatePath } from "next/cache"
import {notifyAdminNewBooking, sendBookingUpdate} from "../lib/mailer"
import { send24hReminder } from "../lib/reminders"
import { sendCustomerConfirmation } from "../lib/mailer"


export async function createService(data: {
  name: string
  description: string
  price: number
  durationMin: number
  category?: string
  imageUrl?: string
}) {
  "use server"
  await prisma.service.create({ data })
  revalidatePath("/admin")
}

export async function deleteService(id: number) {
  "use server"
  await prisma.service.delete({ where: { id } })
  revalidatePath("/admin")
}

export async function updateService(
  id: number,
  data: {
    name: string
    description: string
    price: number
    durationMin: number
    category?: string
    imageUrl?: string
  }
) {
  "use server"
  await prisma.service.update({ where: { id }, data })
  revalidatePath("/admin")
}

//Bookinf action
export async function createBooking(data: {
  serviceIds: number[]
  bookingDate: Date
  address?: string
  notes?: string
  clerkId: string
  email: string
  name: string
  phone?: string
}) {
  "use server"

  // 1. ensure customer exists
  let customer = await prisma.customer.findUnique({ where: { clerkId: data.clerkId } })
  if (!customer) {
    customer = await prisma.customer.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
    })
  }

  // 2. create booking with include
  const booking = await prisma.booking.create({
    data: {
      customerId: customer.id,
      bookingDate: data.bookingDate,
      status: "PENDING",
      notes: data.notes,
      services: { create: data.serviceIds.map((id) => ({ serviceId: id, qty: 1 })) },
    },
    include: { services: { include: { service: true } } }, // ⬅ required for email
  })

  // 3. send friendly confirmation
  await sendCustomerConfirmation(
    customer.email,
    customer.name,
    booking.id,
    booking.services.map((s) => s.service.name).join(", "),
    booking.bookingDate.toISOString()
  )

 // 4. schedule 24 h reminder (email + SMS to customer & email to admin)
const reminderTime = new Date(booking.bookingDate.getTime() - 24 * 60 * 60 * 1000)
setTimeout(() => send24hReminder(
  { name: customer.name, email: customer.email, phone: customer.phone || undefined },
  booking
), reminderTime.getTime() - Date.now())

  // 4. notify admin
  await notifyAdminNewBooking(
  booking.id,
  customer.name,
  customer.email,
  booking.services.map((s) => s.service.name).join(", "),
  booking.bookingDate.toISOString()
)

  revalidatePath("/account")
  return booking
}

//booking status update
export async function confirmBooking(id: number) {
  "use server"
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: "CONFIRMED" },
    include: { customer: true, services: { include: { service: true } } },
  })
  await sendBookingUpdate(
    booking.customer.email,
    "CONFIRMED",
    booking.id,
    booking.customer.name,
    booking.services.map((s) => s.service.name).join(", "),
    booking.bookingDate.toISOString()
  )
  revalidatePath("/admin")
}

export async function cancelBooking(id: number) {
  "use server"
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED" },
    include: { customer: true, services: { include: { service: true } } },
  })
  await sendBookingUpdate(
    booking.customer.email,
    "CANCELLED",
    booking.id,
    booking.customer.name,
    booking.services.map((s) => s.service.name).join(", "),
    booking.bookingDate.toISOString()
  )
  revalidatePath("/admin")
}

export async function completeBooking(id: number) {
  "use server"
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: "COMPLETED" },
    include: { customer: true, services: { include: { service: true } } },
  })
  await sendBookingUpdate(
    booking.customer.email,
    "COMPLETED",
    booking.id,
    booking.customer.name,
    booking.services.map((s) => s.service.name).join(", "),
    booking.bookingDate.toISOString()
  )
  revalidatePath("/admin")
}

//costumer dashboard action
export async function rescheduleBooking(id: number, newDate: Date) {
  "use server"
  await prisma.booking.update({ where: { id }, data: { bookingDate: newDate } })
  revalidatePath("/account")
}

export async function updateCustomerProfile(
  clerkId: string,
  data: { name?: string; phone?: string; address?: string }
) {
  "use server"
  await prisma.customer.update({ where: { clerkId }, data })
  revalidatePath("/account")
}

export async function bookAgain(customerId: number, serviceIds: number[]) {
  "use server"
  await prisma.booking.create({
    data: {
      customerId,
      bookingDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow 9 am
      status: "PENDING",
      services: { create: serviceIds.map((id) => ({ serviceId: id, qty: 1 })) },
    },
  })
  revalidatePath("/account")
}