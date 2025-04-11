"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UserSession {
  userId: string
  email: string
  firstName: string
  lastName: string
  isVerified: boolean
  lastLogin: string
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<UserSession | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for auth state cookie
    const checkAuth = () => {
      const cookies = document.cookie.split(";").reduce(
        (acc, cookie) => {
          const [key, value] = cookie.trim().split("=")
          acc[key] = value
          return acc
        },
        {} as Record<string, string>,
      )

      const authState = cookies["auth_state"]
      const userSession = cookies["user_session"]

      setIsAuthenticated(authState === "authenticated")

      if (userSession) {
        try {
          setUser(JSON.parse(decodeURIComponent(userSession)))
        } catch (error) {
          console.error("Error parsing user session:", error)
          setUser(null)
        }
      }

      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage events (in case another tab logs out)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_state" || e.key === "user_session") {
        checkAuth()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const redirectToLogin = () => {
    router.push("/login")
  }

  const redirectToDashboard = () => {
    router.push("/home")
  }

  return {
    isLoading,
    isAuthenticated,
    user,
    redirectToLogin,
    redirectToDashboard,
  }
}

