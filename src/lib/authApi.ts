"use server"

import { cookies } from "next/headers"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api"

interface AuthResponse {
  access_token: string
  refresh_token: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
}

interface ErrorResponse {
  detail: string | { msg: string; type: string }[]
}

interface RegistrationData {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
}

interface LoginData {
  email: string
  password: string
}

interface OtpVerificationData {
  otp: string
  purpose: string
}

interface UserSession {
  userId: string
  email: string
  firstName: string
  lastName: string
  isVerified: boolean
  lastLogin: string
}

// Store user session data in a cookie for client-side access
async function setUserSession(userData: UserSession) {
  const cookieStore = await cookies()
  cookieStore.set("user_session", JSON.stringify(userData), {
    // Not httpOnly so it can be read by client
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  })
}

// Store tokens securely in httpOnly cookies
async function setAuthTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies()

  // Set access token with shorter expiry
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
    sameSite: "strict",
  })

  // Set refresh token with longer expiry
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
    sameSite: "strict",
  })

  // Set a non-httpOnly auth state cookie for UI state management
  cookieStore.set("auth_state", "authenticated", {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  })
}

export async function registerUser(data: RegistrationData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        mobile_number: data.phoneNumber,
        password: data.password,
      }),
    })

    const responseData = await response.json()
    console.log("Register API Response:", responseData)

    if (!response.ok) {
      return { success: false, error: extractError(responseData) }
    }

    if (responseData.access_token && responseData.refresh_token) {
      // Store tokens securely
      await setAuthTokens(responseData.access_token, responseData.refresh_token)

      // Create user session for dashboard
      if (responseData.user) {
        await setUserSession({
          userId: responseData.user.id,
          email: responseData.user.email,
          firstName: responseData.user.first_name || data.firstName,
          lastName: responseData.user.last_name || data.lastName,
          isVerified: false, // Will be verified after OTP
          lastLogin: new Date().toISOString(),
        })
      }

      return sendOtp(responseData.access_token)
    }

    console.log("Access token missing, attempting login...")
    return loginUser({ email: data.email, password: data.password })
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function loginUser(data: LoginData): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()
    console.log("Login API Response:", responseData)

    if (!response.ok) {
      return { success: false, error: extractError(responseData) }
    }

    // Check for tokens in the response
    const accessToken = responseData.access || responseData.access_token
    const refreshToken = responseData.refresh || responseData.refresh_token

    if (!accessToken || !refreshToken) {
      return { success: false, error: "Tokens missing in response" }
    }

    // Store tokens securely
    await setAuthTokens(accessToken, refreshToken)

    // Get user profile to store in session
    const userProfile = await fetchUserProfile(accessToken)
    if (userProfile) {
      await setUserSession({
        userId: userProfile.id,
        email: userProfile.email,
        firstName: userProfile.first_name || "",
        lastName: userProfile.last_name || "",
        isVerified: userProfile.is_verified || false,
        lastLogin: new Date().toISOString(),
      })
    }

    console.log("✅ Login successful, sending OTP...")
    return await sendOtp(accessToken)
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

async function fetchUserProfile(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

const sendOtp = async (token: string) => {
  if (!token) {
    console.error("❌ Invalid token detected!", token)
    return { success: false, error: "Invalid authentication token" }
  }

  console.log("🔹 Sending OTP with token:", token)

  try {
    const response = await fetch(`${API_BASE_URL}/auth/otp/send/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ purpose: "VA" }), // Ensure correct purpose
    })

    const data = await response.json()
    console.log("🔹 OTP API Response:", data)

    if (!response.ok) {
      return { success: false, error: extractError(data) }
    }

    console.log("✅ OTP sent successfully", data)
    return { success: true }
  } catch (error) {
    console.error("❌ Error sending OTP:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function verifyOtp(
  data: OtpVerificationData,
): Promise<{ success: boolean; data?: AuthResponse; error?: string }> {
  try {
    // Ensure purpose is correctly set
    const purpose = data.purpose || "VA" // Default to "VA" if missing

    console.log("Verifying OTP:", data.otp, "Purpose:", purpose)

    // Retrieve access token from cookies
    const accessToken = (await cookies()).get("access_token")?.value
    if (!accessToken) {
      console.error("❌ Access token is missing!")
      return { success: false, error: "Authentication token is missing" }
    }

    // Construct the request body
    const requestBody = {
      otp_code: data.otp,
      purpose,
    }

    console.log("📤 Sending OTP verification request with:", requestBody)

    const response = await fetch(`${API_BASE_URL}/auth/otp/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    })

    const responseData = await response.json()
    console.log("✅ OTP Verification Response:", responseData)

    if (!response.ok) {
      return { success: false, error: extractError(responseData) }
    }

    // Save new tokens after successful OTP verification
    await setAuthTokens(responseData.access_token, responseData.refresh_token)

    // Update user session to mark as verified
    const userSession = getUserSessionFromCookie()
    if (userSession) {
      await setUserSession({
        ...userSession,
        isVerified: true,
      })
    }

    return { success: true, data: responseData }
  } catch (error) {
    console.error("❌ OTP verification error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

// Helper function to get user session from cookie
async function getUserSessionFromCookie(): Promise<UserSession | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("user_session")

  if (!sessionCookie?.value) return null

  try {
    return JSON.parse(sessionCookie.value) as UserSession
  } catch (error) {
    console.error("Error parsing user session:", error)
    return null
  }
}

export async function getUserProfile() {
  const accessToken = (await cookies()).get("access_token")?.value
  if (!accessToken) return null

  try {
    const response = await fetch(`${API_BASE_URL}/users/me/`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) {
      console.error("Failed to fetch user profile:", response.statusText)

      // If unauthorized, try to refresh the token
      if (response.status === 401) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
          // Retry with new token
          return getUserProfile()
        }
      }

      return null
    }

    const userData = await response.json()

    // Update user session with latest data
    await setUserSession({
      userId: userData.id,
      email: userData.email,
      firstName: userData.first_name || "",
      lastName: userData.last_name || "",
      isVerified: userData.is_verified || false,
      lastLogin: new Date().toISOString(),
    })

    return userData
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

export async function getCurrentUser() {
  const accessToken = (await cookies()).get("access_token")?.value
  if (!accessToken) return null

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!response.ok) {
      // If unauthorized, try to refresh the token
      if (response.status === 401) {
        const refreshed = await refreshAccessToken()
        if (refreshed) {
          // Retry with new token
          return getCurrentUser()
        }
      }

      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Function to refresh the access token using the refresh token
async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get("refresh_token")?.value

  if (!refreshToken) {
    console.error("No refresh token available")
    return false
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!response.ok) {
      console.error("Failed to refresh token:", response.statusText)
      // Clear invalid tokens
      await logout()
      return false
    }

    const data = await response.json()

    if (!data.access) {
      console.error("No access token in refresh response")
      return false
    }

    // Update only the access token
    cookieStore.set("access_token", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "strict",
    })

    return true
  } catch (error) {
    console.error("Error refreshing token:", error)
    return false
  }
}

export async function logout() {
  const cookieStore = await cookies()

  // Clear all auth-related cookies
  cookieStore.delete("access_token")
  cookieStore.delete("refresh_token")
  cookieStore.delete("user_session")
  cookieStore.delete("auth_state")
}

function extractError(responseData: any): string {
  console.log("Extracting error from:", responseData)
  if (!responseData) return "Empty response from server"

  if (typeof responseData.detail === "string") {
    return responseData.detail
  } else if (Array.isArray(responseData.detail)) {
    return responseData.detail.map((err: { msg: any }) => err.msg || "Unknown error").join(", ")
  } else if (typeof responseData === "object") {
    return JSON.stringify(responseData)
  }

  return "An unexpected error occurred"
}

