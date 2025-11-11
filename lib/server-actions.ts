"use server"

import { prisma } from "./prisma"
import { revalidatePath } from "next/cache"
import {sendBookingUpdate} from "../lib/mailer"


export async function createService(data: {
  name: string
  description: string
  price: number
  durationMin: number
}) {
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
  }
) {
  "use server"
  await prisma.service.update({ where: { id }, data })
  revalidatePath("/admin")
}

//Bookinf action
export async function createBooking(data: {
  serviceIds: number[] // can be multiple
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

  // 2. create booking
  const booking = await prisma.booking.create({
    data: {
      customerId: customer.id,
      bookingDate: data.bookingDate,
      status: "PENDING",
      notes: data.notes,
      services: {
        create: data.serviceIds.map((sid) => ({ serviceId: sid, qty: 1 })),
      },
    },
  })

  revalidatePath("/admin")
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

