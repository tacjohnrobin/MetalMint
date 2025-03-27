"use client";

import { useState } from "react";
import type React from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatedInput } from "./animated-input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loginUser, verifyOtp } from "@/lib/authApi";

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [isOtpView, setIsOtpView] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [otp, setOtp] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isOtpLoading, setIsOtpLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const result = await loginUser({ email, password });

			if (!result.success) {
				throw new Error(result.error || "Login failed");
			}

			toast({
				title: "OTP Sent",
				description: "Please check your email for the OTP",
			});

			setIsOtpView(true);
		} catch (error) {
			toast({
				title: "Login Failed",
				description:
					error instanceof Error ? error.message : "Something went wrong",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleOtpSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsOtpLoading(true);

		try {
			console.log("Submitting OTP:", otp, "for email:", email);

			const result = await verifyOtp({ email, otp });

			if (!result.success) {
				throw new Error(result.error || "OTP verification failed");
			}

			toast({
				title: "Success",
				description: "You have been successfully logged in",
			});

			console.log("OTP Verified! Redirecting...");

			// Delay the navigation slightly to ensure state updates properly
			setTimeout(() => {
				router.push("/home");
			}, 100); // Delay 100ms to ensure stability
		} catch (error) {
			toast({
				title: "Verification Failed",
				description: error instanceof Error ? error.message : "Invalid OTP",
				variant: "destructive",
			});
		} finally {
			setIsOtpLoading(false);
		}
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
								<AnimatedInput
									id="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full"
									label="email"
									disabled={isLoading}
								/>
							</div>
							<div className="grid gap-2">
								<AnimatedInput
									id="password"
									type="password"
									label="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full"
									disabled={isLoading}
								/>
							</div>
							<Button
								type="submit"
								className="w-full py-6 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700"
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Logging in...
									</>
								) : (
									"Login"
								)}
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
								We've sent a one-time unique code to{" "}
								<span className="text-gray-600 font-semibold">{email}</span>
							</p>
						</div>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<AnimatedInput
									id="otp"
									label="enter OTP"
									type="text"
									required
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									disabled={isOtpLoading}
								/>
							</div>
							<Button
								type="submit"
								className="w-full py-6 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700"
								disabled={isOtpLoading}
							>
								{isOtpLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Verifying...
									</>
								) : (
									"Verify OTP"
								)}
							</Button>
						</div>
						<Button
							variant="link"
							onClick={() => setIsOtpView(false)}
							className="w-full"
							disabled={isOtpLoading}
							type="button"
						>
							Back to Login
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
