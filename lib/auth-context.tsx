"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("patpro_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call your API
    // Demo credentials:
    // Admin: admin@patpro.com / admin123
    // Customer: customer@example.com / customer123

    if (email === "admin@patpro.com" && password === "admin123") {
      const adminUser: User = {
        id: "1",
        email: "admin@patpro.com",
        name: "Admin User",
        role: "admin",
      }
      setUser(adminUser)
      localStorage.setItem("patpro_user", JSON.stringify(adminUser))
      return true
    } else if (email === "customer@example.com" && password === "customer123") {
      const customerUser: User = {
        id: "2",
        email: "customer@example.com",
        name: "John Doe",
        role: "customer",
      }
      setUser(customerUser)
      localStorage.setItem("patpro_user", JSON.stringify(customerUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("patpro_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
