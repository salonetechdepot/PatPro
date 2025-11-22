"use server"
import { prisma } from "../lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { uploadToCloudinary } from "../lib/cloudinary-client"

export async function markOnTheWay(bookingId: number) {
  await prisma.booking.update({ where: { id: bookingId }, data: { status: "IN_PROGRESS" } })
  revalidatePath("/staff")
}

export async function markComplete(bookingId: number) {
  await prisma.booking.update({ where: { id: bookingId }, data: { status: "COMPLETED" } })
  revalidatePath("/staff")
}

export async function uploadJobPhotos(bookingId: number, files: File[]) {
  const urls = await Promise.all(files.map((f) => uploadToCloudinary(f)))
  await prisma.booking.update({
    where: { id: bookingId },
    data: { photos: { push: urls } }, // simple array push (or create Photo table later)
  })
  revalidatePath("/staff")
}


export async function inviteStaff(data: { name: string; email: string; phone?: string; role: string }) {
  "use server"
  const session = await auth()
  if (!session?.userId) throw new Error("Unauthorized")

  const res = await fetch("https://api.clerk.com/v1/invitations", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email_address: data.email,
    public_metadata: { role: "staff", invitedBy: session.userId },
    redirect_url: `https://patpro.onrender.com/staff`,
  }),
})
const invite = await res.json()
console.log("Clerk response", invite) // ⬅ add this
if (!invite.id) throw new Error(`Clerk invite failed: ${JSON.stringify(invite)}`)

  await prisma.staff.create({
    data: {
      clerkId: `invite_${invite.id}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: "invited",
    },
  })

  revalidatePath("/admin")
}