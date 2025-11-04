"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Home, LogOut, Plus, User } from "lucide-react"
import { BookingForm } from "@/components/booking-form"

type Booking = {
  id: string
  service: string
  date: string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  address: string
}

export function CustomerDashboard() {
 
  const router = useRouter()
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Mock bookings data
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      service: "Deep Cleaning",
      date: "2025-01-15",
      time: "10:00 AM",
      status: "upcoming",
      address: "123 Main St, City",
    },
    {
      id: "2",
      service: "Regular Cleaning",
      date: "2025-01-08",
      time: "2:00 PM",
      status: "completed",
      address: "123 Main St, City",
    },
  ])


  const upcomingBookings = bookings.filter((b) => b.status === "upcoming")
  const pastBookings = bookings.filter((b) => b.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-primary">PAT PRO CLEANING</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, Sahr</span>
              <Button variant="outline" size="sm" >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h2>
          <p className="text-muted-foreground">Manage your bookings and account</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="new">New Booking</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{upcomingBookings.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pastBookings.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{bookings.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Upcoming Bookings</h3>
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-4">
                  {upcomingBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader>
                        <CardTitle>{booking.service}</CardTitle>
                        <CardDescription>{booking.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {booking.time}
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No upcoming bookings</p>
                    <Button className="mt-4" onClick={() => setShowBookingForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Book a Service
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Past Bookings */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Past Bookings</h3>
              {pastBookings.length > 0 ? (
                <div className="grid gap-4">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader>
                        <CardTitle>{booking.service}</CardTitle>
                        <CardDescription>{booking.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {booking.time}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                          Book Again
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No past bookings</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <BookingForm />
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Sahr</p>
                    <p className="text-sm text-muted-foreground">sahr@example.com</p>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
