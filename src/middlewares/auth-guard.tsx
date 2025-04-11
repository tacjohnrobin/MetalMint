"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface AuthGuardProps {
	children: React.ReactNode;
	requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
	const { isLoading, isAuthenticated, redirectToLogin, redirectToDashboard } =
		useAuth();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!isLoading) {
			// If auth is required but user is not authenticated
			if (requireAuth && !isAuthenticated) {
				// Store the intended destination
				sessionStorage.setItem("redirectAfterLogin", pathname);
				redirectToLogin();
			}

			// If auth pages are accessed while authenticated
			if (
				!requireAuth &&
				isAuthenticated &&
				(pathname === "/login" || pathname === "/register")
			) {
				redirectToDashboard();
			}
		}
	}, [isLoading, isAuthenticated, pathname, requireAuth]);

	// Show nothing while checking authentication
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				Loading...
			</div>
		);
	}

	// If we need auth and user is not authenticated, render nothing (redirect happens in useEffect)
	if (requireAuth && !isAuthenticated) {
		return null;
	}

	// If we don't need auth and user is authenticated, render nothing (redirect happens in useEffect)
	if (
		!requireAuth &&
		isAuthenticated &&
		(pathname === "/login" || pathname === "/register")
	) {
		return null;
	}

	// Otherwise, render children
	return <>{children}</>;
}
