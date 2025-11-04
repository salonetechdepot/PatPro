"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  LogOut,
  Users,
  XCircle,
  CalendarDays,
  Plus,
  Edit,
  Trash2,
  Star,
  User,
  Mail,
  Phone,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"

type Booking = {
  id: string
  customerName: string
  customerEmail: string
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  address: string
  amount: number
}

type Customer = {
  id: string
  name: string
  email: string
  phone: string
  totalBookings: number
  lastBooking: string
}

type Staff = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: "active" | "inactive"
  assignedJobs: number
}

type Service = {
  id: string
  name: string
  description: string
  price: number
  duration: string
  category: string
}

type Lead = {
  id: string
  name: string
  email: string
  phone: string
  service: string
  message: string
  status: "new" | "contacted" | "converted" | "lost"
  createdAt: string
}

type Feedback = {
  id: string
  customerName: string
  service: string
  rating: number
  comment: string
  date: string
  status: "pending" | "approved" | "rejected"
}

type AdminUser = {
  id: string
  name: string
  email: string
  role: "super_admin" | "admin" | "manager"
  status: "active" | "inactive"
  lastLogin: string
}

export function AdminDashboard() {

  const router = useRouter()

  // Mock data
  const [bookings] = useState<Booking[]>([
    {
      id: "1",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      service: "Deep Cleaning",
      date: "2025-01-15",
      time: "10:00 AM",
      status: "confirmed",
      address: "123 Main St, City",
      amount: 150,
    },
    {
      id: "2",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      service: "Regular Cleaning",
      date: "2025-01-16",
      time: "2:00 PM",
      status: "pending",
      address: "456 Oak Ave, City",
      amount: 100,
    },
    {
      id: "3",
      customerName: "Bob Johnson",
      customerEmail: "bob@example.com",
      service: "Office Cleaning",
      date: "2025-01-14",
      time: "9:00 AM",
      status: "completed",
      address: "789 Business Blvd, City",
      amount: 200,
    },
  ])

  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      totalBookings: 5,
      lastBooking: "2025-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "(555) 234-5678",
      totalBookings: 3,
      lastBooking: "2025-01-16",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      phone: "(555) 345-6789",
      totalBookings: 8,
      lastBooking: "2025-01-14",
    },
  ])

  const [staff] = useState<Staff[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@patpro.com",
      phone: "(555) 111-2222",
      role: "Senior Cleaner",
      status: "active",
      assignedJobs: 12,
    },
    {
      id: "2",
      name: "Mike Davis",
      email: "mike@patpro.com",
      phone: "(555) 222-3333",
      role: "Cleaner",
      status: "active",
      assignedJobs: 8,
    },
    {
      id: "3",
      name: "Emily Brown",
      email: "emily@patpro.com",
      phone: "(555) 333-4444",
      role: "Supervisor",
      status: "active",
      assignedJobs: 15,
    },
  ])

  const [services] = useState<Service[]>([
    {
      id: "1",
      name: "Deep Cleaning",
      description: "Comprehensive deep cleaning service for homes and offices",
      price: 150,
      duration: "3-4 hours",
      category: "Residential",
    },
    {
      id: "2",
      name: "Regular Cleaning",
      description: "Standard cleaning service for regular maintenance",
      price: 100,
      duration: "2-3 hours",
      category: "Residential",
    },
    {
      id: "3",
      name: "Office Cleaning",
      description: "Professional office and commercial space cleaning",
      price: 200,
      duration: "4-5 hours",
      category: "Commercial",
    },
    {
      id: "4",
      name: "Move In/Out Cleaning",
      description: "Thorough cleaning for moving in or out",
      price: 250,
      duration: "5-6 hours",
      category: "Residential",
    },
    {
      id: "5",
      name: "Carpet Cleaning",
      description: "Professional carpet and upholstery cleaning",
      price: 120,
      duration: "2-3 hours",
      category: "Specialty",
    },
  ])

  const [leads] = useState<Lead[]>([
    {
      id: "1",
      name: "Alice Williams",
      email: "alice@example.com",
      phone: "(555) 444-5555",
      service: "Deep Cleaning",
      message: "Interested in weekly deep cleaning service for my home",
      status: "new",
      createdAt: "2025-01-12",
    },
    {
      id: "2",
      name: "Tom Anderson",
      email: "tom@example.com",
      phone: "(555) 555-6666",
      service: "Office Cleaning",
      message: "Need regular office cleaning for 5000 sq ft space",
      status: "contacted",
      createdAt: "2025-01-11",
    },
    {
      id: "3",
      name: "Lisa Martinez",
      email: "lisa@example.com",
      phone: "(555) 666-7777",
      service: "Move In/Out Cleaning",
      message: "Moving out next month, need thorough cleaning",
      status: "converted",
      createdAt: "2025-01-10",
    },
  ])

  const [feedback] = useState<Feedback[]>([
    {
      id: "1",
      customerName: "John Doe",
      service: "Deep Cleaning",
      rating: 5,
      comment: "Excellent service! The team was professional and thorough. My home has never been cleaner.",
      date: "2025-01-14",
      status: "approved",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      service: "Regular Cleaning",
      rating: 4,
      comment: "Great job overall. Would appreciate if they could arrive on time consistently.",
      date: "2025-01-13",
      status: "approved",
    },
    {
      id: "3",
      customerName: "Bob Johnson",
      service: "Office Cleaning",
      rating: 5,
      comment: "Outstanding work! Our office looks amazing. Highly recommend Pat Pro Cleaning.",
      date: "2025-01-12",
      status: "pending",
    },
  ])

  const [adminUsers] = useState<AdminUser[]>([
    {
      id: "1",
      name: "Admin User",
      email: "admin@patpro.com",
      role: "super_admin",
      status: "active",
      lastLogin: "2025-01-12 10:30 AM",
    },
    {
      id: "2",
      name: "Manager Smith",
      email: "manager@patpro.com",
      role: "manager",
      status: "active",
      lastLogin: "2025-01-12 09:15 AM",
    },
    {
      id: "3",
      name: "Support Admin",
      email: "support@patpro.com",
      role: "admin",
      status: "active",
      lastLogin: "2025-01-11 04:45 PM",
    },
  ])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0)
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const completedBookings = bookings.filter((b) => b.status === "completed").length

  const getStatusBadge = (status: Booking["status"]) => {
    const variants = {
      pending: "secondary",
      confirmed: "default",
      completed: "default",
      cancelled: "secondary",
    } as const

    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      confirmed: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      completed: "bg-green-100 text-green-800 hover:bg-green-100",
      cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge variant={variants[status]} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getLeadStatusBadge = (status: Lead["status"]) => {
    const colors = {
      new: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      contacted: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      converted: "bg-green-100 text-green-800 hover:bg-green-100",
      lost: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge variant="secondary" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getFeedbackStatusBadge = (status: Feedback["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      rejected: "bg-red-100 text-red-800 hover:bg-red-100",
    }

    return (
      <Badge variant="secondary" className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-primary">PAT PRO CLEANING - Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, Sahr</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage bookings, customers, and business operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingBookings}</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedBookings}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">Active customers</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="admin-users">Admin Users</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${totalRevenue}</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{leads.filter((l) => l.status === "new").length}</div>
                    <p className="text-xs text-muted-foreground">Awaiting contact</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Bookings</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{pendingBookings}</div>
                    <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{customers.length}</div>
                    <p className="text-xs text-muted-foreground">Active customers</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">{booking.service}</p>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {feedback.slice(0, 3).map((item) => (
                        <div key={item.id} className="border-b pb-3 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{item.customerName}</p>
                            {renderStars(item.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>Track and manage potential customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service Interest</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{lead.service}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{lead.message}</TableCell>
                        <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{getLeadStatusBadge(lead.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Contact
                            </Button>
                            <Button size="sm" variant="outline">
                              Convert
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage and track all service bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.customerName}</p>
                            <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.service}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                            <Clock className="h-4 w-4 ml-2" />
                            {booking.time}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{booking.address}</TableCell>
                        <TableCell>${booking.amount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Confirm
                                </Button>
                                <Button size="sm" variant="outline">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <Button size="sm" variant="outline">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Customer Feedback</CardTitle>
                <CardDescription>Manage customer reviews and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <Card key={item.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <CardTitle className="text-base">{item.customerName}</CardTitle>
                              {renderStars(item.rating)}
                            </div>
                            <CardDescription>
                              {item.service} • {new Date(item.date).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          {getFeedbackStatusBadge(item.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{item.comment}</p>
                        {item.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline">
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage customer information</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Last Booking</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.totalBookings}</TableCell>
                        <TableCell>{new Date(customer.lastBooking).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Staff Management</CardTitle>
                    <CardDescription>Manage your cleaning staff and assignments</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Staff
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Staff Member</DialogTitle>
                        <DialogDescription>Enter the details of the new staff member</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="staff-name">Full Name</Label>
                          <Input id="staff-name" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="staff-email">Email</Label>
                          <Input id="staff-email" type="email" placeholder="Enter email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="staff-phone">Phone</Label>
                          <Input id="staff-phone" placeholder="Enter phone number" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="staff-role">Role</Label>
                          <Select>
                            <SelectTrigger id="staff-role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cleaner">Cleaner</SelectItem>
                              <SelectItem value="senior">Senior Cleaner</SelectItem>
                              <SelectItem value="supervisor">Supervisor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Staff Member</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Assigned Jobs</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>{member.assignedJobs}</TableCell>
                        <TableCell>
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Service Management</CardTitle>
                    <CardDescription>Manage your cleaning services and pricing</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                        <DialogDescription>Create a new cleaning service offering</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="service-name">Service Name</Label>
                          <Input id="service-name" placeholder="Enter service name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service-description">Description</Label>
                          <Textarea id="service-description" placeholder="Enter service description" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="service-price">Price ($)</Label>
                            <Input id="service-price" type="number" placeholder="0" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="service-duration">Duration</Label>
                            <Input id="service-duration" placeholder="e.g., 2-3 hours" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="service-category">Category</Label>
                          <Select>
                            <SelectTrigger id="service-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="specialty">Specialty</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Service</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <Card key={service.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{service.name}</CardTitle>
                            <Badge variant="secondary" className="mt-2">
                              {service.category}
                            </Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Price:</span>
                            <span className="font-semibold">${service.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Duration:</span>
                            <span className="text-sm">{service.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Schedule & Calendar</CardTitle>
                <CardDescription>View and manage booking schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline">Today</Button>
                      <Button variant="outline">Week</Button>
                      <Button variant="outline">Month</Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-8">
                    <div className="flex items-center justify-center h-96 text-muted-foreground">
                      <div className="text-center">
                        <CalendarDays className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Calendar View</p>
                        <p className="text-sm">Interactive calendar with drag-and-drop scheduling</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Today's Jobs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">5</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">This Week</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">23</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Next Week</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">18</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin-users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Admin User Management</CardTitle>
                    <CardDescription>Manage admin accounts and permissions</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Admin
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Admin User</DialogTitle>
                        <DialogDescription>Create a new admin account with specific permissions</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="admin-name">Full Name</Label>
                          <Input id="admin-name" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-email">Email</Label>
                          <Input id="admin-email" type="email" placeholder="Enter email" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-role">Role</Label>
                          <Select>
                            <SelectTrigger id="admin-role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="admin-password">Temporary Password</Label>
                          <Input id="admin-password" type="password" placeholder="Enter temporary password" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create Admin User</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {admin.role
                              .split("_")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </Badge>
                        </TableCell>
                        <TableCell>{admin.lastLogin}</TableCell>
                        <TableCell>
                          <Badge variant={admin.status === "active" ? "default" : "secondary"}>{admin.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-12 w-12 text-primary" />
                    </div>
                    <div>
                      <Button variant="outline">Change Photo</Button>
                      <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max size 2MB</p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="profile-name">Full Name</Label>
                      <Input id="profile-name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-email">Email</Label>
                      <Input id="profile-email" type="email" defaultValue={user?.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-phone">Phone</Label>
                      <Input id="profile-phone" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="profile-role">Role</Label>
                      <Input id="profile-role" defaultValue="Super Admin" disabled />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Change Password</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>Save Changes</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Settings</CardTitle>
                  <CardDescription>Configure your business information and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Business Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input id="business-name" defaultValue="Pat Pro Cleaning" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-phone">Business Phone</Label>
                        <Input id="business-phone" placeholder="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-email">Business Email</Label>
                        <Input id="business-email" type="email" placeholder="info@patpro.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business-website">Website</Label>
                        <Input id="business-website" placeholder="www.patpro.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-address">Business Address</Label>
                      <Textarea id="business-address" placeholder="Enter full business address" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Booking Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive alerts for new bookings</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Lead Notifications</Label>
                          <p className="text-sm text-muted-foreground">Get notified about new leads</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Feedback Notifications</Label>
                          <p className="text-sm text-muted-foreground">Alerts for new customer feedback</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive email updates</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Booking Settings</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="booking-buffer">Booking Buffer Time (minutes)</Label>
                        <Input id="booking-buffer" type="number" defaultValue="30" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="advance-booking">Advance Booking Days</Label>
                        <Input id="advance-booking" type="number" defaultValue="30" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-confirm Bookings</Label>
                        <p className="text-sm text-muted-foreground">Automatically confirm new bookings</p>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>Save Settings</Button>
                    <Button variant="outline">Reset to Default</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
