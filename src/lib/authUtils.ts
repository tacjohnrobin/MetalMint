"use server";

import { cookies } from "next/headers";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

/**
 * Set authentication tokens in cookies
 */
export async function setAuthTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  
  cookieStore.set(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });

  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

/**
 * Get the access token from cookies
 */
export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get(ACCESS_TOKEN_KEY)?.value || null;
}

/**
 * Get the refresh token from cookies (if needed)
 */
export async function getRefreshToken(): Promise<string | null> {
  return (await cookies()).get(REFRESH_TOKEN_KEY)?.value || null;
}

/**
 * Remove authentication tokens from cookies (Logout)
 */
export async function removeAuthTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}

/**
 * Middleware to check if the user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const accessToken = await getAccessToken();
  return !!accessToken; // Returns true if token exists
}

/**
 * Fetch the current user's profile
 * @returns {Promise<object | null>} User profile data or null if unauthorized
 */
export async function getUserProfile(): Promise<object | null> {
  const token = await getAccessToken();
  if (!token) {
    console.error("❌ No access token found");
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me/profile/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("⚠️ Failed to fetch user profile:", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    return null;
  }
}
