"use client";

import { useState } from "react";
import type React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [isOtpView, setIsOtpView] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState(""); // ✅ Added missing state for password

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically call your authentication API
		// For this example, we'll just switch to the OTP view
		setIsOtpView(true);
	};

	const handleOtpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would verify the OTP
		// For this example, we'll just log a message
		console.log("OTP submitted");
	};

	return (
		<div className={cn("flex flex-col gap-6 text-black", className)} {...props}>
			{!isOtpView ? (
				<form onSubmit={handleLogin}>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col items-center gap-2">
							<h1 className="text-xl md:text-2xl font-bold">
								Sign in to your account
							</h1>
							<div className="text-center text-sm text-muted-foreground">
								Don&apos;t have an account?{" "}
								<a
									href="/register"
									className="text-emerald-500 underline-offset-4 hover:underline"
								>
									Sign up
								</a>
							</div>
						</div>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full py-6"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>{" "}
								{/* ✅ Fixed duplicate label */}
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)} // ✅ Corrected state update
									className="w-full py-6"
								/>
							</div>
							<Button
								type="submit"
								className="w-full py-6 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700"
							>
								Login
							</Button>
						</div>
					</div>
				</form>
			) : (
				<form onSubmit={handleOtpSubmit}>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col items-center gap-2">
							<h1 className="text-xl font-bold">Enter OTP</h1>
							<p className="text-center text-sm text-muted-foreground">
								We've sent a one-time password to {email}
							</p>
						</div>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="otp">One-Time Password</Label>
								<Input id="otp" type="text" placeholder="Enter OTP" required />
							</div>
							<Button type="submit" className="w-full">
								Verify OTP
							</Button>
						</div>
						<Button
							variant="link"
							onClick={() => setIsOtpView(false)}
							className="w-full"
						>
							Back to Login
						</Button>
					</div>
				</form>
			)}
			{!isOtpView && (
				<>
					<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
						<span className="relative z-10 bg-background px-2 text-muted-foreground">
							Or
						</span>
					</div>
					<div className="items center">
						<Button variant="outline" className="w-full py-6">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
									fill="currentColor"
								/>
							</svg>
							Continue with Google
						</Button>
					</div>
				</>
			)}
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
				By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
				and <a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
