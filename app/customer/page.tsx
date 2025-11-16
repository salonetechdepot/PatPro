"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CustomerDashboard } from "@/components/customer-dashboard"

export default function CustomerPage() {
  const router = useRouter()
  return <CustomerDashboard />
}
