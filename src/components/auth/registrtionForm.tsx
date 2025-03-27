"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Navbar } from "./navbarAuth";
import { AnimatedInput } from "./animated-input";
import { useRouter } from "next/navigation";
import CustomPhoneInput from "@/components/phoneInput";
import { registerUser } from "@/lib/authApi";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
	firstName: z.string().min(2, "First name must be at least 2 characters"),
	lastName: z.string().min(2, "Last name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	phoneNumber: z
		.string()
		.min(1, "Phone number is required")
		.regex(
			/^\+[0-9]+$/,
			"Phone number must start with + followed by country code and number",
		),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number",
		),
});

export default function RegistrationPage() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isSlideValid, setIsSlideValid] = useState(false);
	const [registrationError, setRegistrationError] = useState<string | null>(
		null,
	);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
		},
		mode: "onTouched",
	});
	const router = useRouter();

	const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (!isSlideValid || isLoading) return;

		setIsLoading(true);
		setRegistrationError(null);

		try {
			// Get form values
			const values = form.getValues();

			// Call the registration API
			const result = await registerUser(values);

			if (result.success) {
				// Show success toast
				toast({
					title: "Account created!",
					description: "Your account has been created successfully.",
					variant: "default",
				});

				// Redirect to home page
				router.push("/home");
			} else {
				// Show error message
				setRegistrationError(
					result.error || "Registration failed. Please try again.",
				);
				toast({
					title: "Registration failed",
					description:
						result.error || "Something went wrong. Please try again.",
					variant: "destructive",
				});
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Registration error:", error);
			setRegistrationError("An unexpected error occurred. Please try again.");
			toast({
				title: "Registration failed",
				description: "An unexpected error occurred. Please try again.",
				variant: "destructive",
			});
			setIsLoading(false);
		}
	};

	// Check if current slide is valid
	useEffect(() => {
		const checkSlideValidity = async () => {
			const fields = {
				0: ["email"],
				1: ["firstName", "lastName"],
				2: ["phoneNumber"],
				3: ["password"],
			}[currentSlide];

			const result = await form.trigger(fields as any);
			setIsSlideValid(result);
		};

		checkSlideValidity();

		// Subscribe to form changes to update validity
		const subscription = form.watch(() => checkSlideValidity());
		return () => subscription.unsubscribe();
	}, [currentSlide, form]);

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
		console.log(values);
		setIsLoading(false);
	};

	const nextSlide = () => {
		if (currentSlide < 3) setCurrentSlide(currentSlide + 1);
	};

	const slides = [
		// Slide 1: Email
		<React.Fragment key={0}>
			<div className="space-y-2 text-center mb-6">
				<h1 className="text-2xl font-bold">Create your account</h1>
			</div>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<AnimatedInput
								label="Email"
								placeholder=""
								type="email"
								{...field}
							/>
						</FormControl>
						<div className="h-5">
							{form.formState.touchedFields.email &&
								form.formState.errors.email && (
									<p className="text-xs text-rose-400 opacity-80 mt-1 ml-1">
										{form.formState.errors.email.message}
									</p>
								)}
						</div>
					</FormItem>
				)}
			/>

			<div className="text-center text-sm text-muted-foreground">
				By signing up you agree with our{" "}
				<a
					href="#"
					className="text-emerald-600 underline-offset-4 hover:underline"
				>
					terms and conditions{" "}
				</a>
				and{" "}
				<a
					href="#"
					className="text-emerald-600 underline-offset-4 hover:underline"
				>
					Privacy Policy
				</a>
			</div>
		</React.Fragment>,

		// Slide 2: Name
		<React.Fragment key={1}>
			<div className="space-y-2 text-center mb-6">
				<h1 className="text-2xl font-bold">Enter your name</h1>
			</div>
			<div className="grid grid-cols-1 gap-4">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<AnimatedInput label="First Name" placeholder="" {...field} />
							</FormControl>
							<div className="h-5">
								{form.formState.touchedFields.firstName &&
									form.formState.errors.firstName && (
										<p className="text-xs text-rose-400 opacity-80 mt-1 ml-1">
											{form.formState.errors.firstName.message}
										</p>
									)}
							</div>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<AnimatedInput label="Last Name" placeholder="" {...field} />
							</FormControl>
							<div className="h-5">
								{form.formState.touchedFields.lastName &&
									form.formState.errors.lastName && (
										<p className="text-xs text-rose-400 opacity-80 mt-1 ml-1">
											{form.formState.errors.lastName.message}
										</p>
									)}
							</div>
						</FormItem>
					)}
				/>
			</div>
		</React.Fragment>,

		// Slide 3: Phone Number (Using standard AnimatedInput)
		<React.Fragment key={2}>
			<div className="space-y-2 text-center mb-6">
				<h1 className="text-2xl font-bold">Enter your phone number</h1>
			</div>
			<FormField
				control={form.control}
				name="phoneNumber"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<AnimatedInput label="Phone Number" type="tel" {...field} />
						</FormControl>
						<div className="h-5">
							{form.formState.touchedFields.phoneNumber &&
								form.formState.errors.phoneNumber && (
									<p className="text-xs text-rose-400 opacity-80 mt-1 ml-1">
										{form.formState.errors.phoneNumber.message}
									</p>
								)}
						</div>
					</FormItem>
				)}
			/>
			<p className="text-xs text-gray-500 ">
				Enter your phone number starting with + followed by country code (e.g.,
				+1 for US, +234 for NGR)
			</p>
		</React.Fragment>,

		// Slide 4: Password (previously Slide 3)
		<React.Fragment key={3}>
			<div className="space-y-2 text-center mb-6">
				<h1 className="text-2xl font-bold">Input password</h1>
			</div>
			<FormField
				control={form.control}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<AnimatedInput
								label="Password"
								placeholder=""
								type="password"
								{...field}
							/>
						</FormControl>
						<div className="h-5">
							{form.formState.touchedFields.password &&
								form.formState.errors.password && (
									<p className="text-xs text-rose-400 opacity-80 mt-1 ml-1">
										{form.formState.errors.password.message}
									</p>
								)}
						</div>
					</FormItem>
				)}
			/>
			<p className="text-xs text-gray-500 mt-2">
				Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1
				number
			</p>
		</React.Fragment>,
	];

	return (
		<div className="min-h-screen ">
			<header className="w-full flex justify-between items-center px-6 ">
				<Navbar />
			</header>

			<main className="container mx-auto px-4 py-8 text-black">
				<div className="mx-auto max-w-md space-y-6">
					{/* Dots progress indicator */}
					<div className="flex justify-center space-x-2 mb-4">
						{[0, 1, 2, 3].map((step) => (
							<div
								key={step}
								className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
									step === currentSlide
										? "bg-emerald-600 scale-125"
										: step < currentSlide
										? "bg-emerald-600"
										: "bg-gray-200"
								}`}
							/>
						))}
					</div>

					<div className="text-center">
						<p className="text-gray-500 text-sm">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-emerald-600 hover:underline pb-2"
							>
								Sign in
							</Link>
						</p>
					</div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{slides[currentSlide]}

							{registrationError && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
									{registrationError}
								</div>
							)}

							<div className="flex justify-between">
								{currentSlide < 3 && (
									<Button
										type="button"
										className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-400 rounded-3xl px-8 py-6 transition-all duration-300"
										onClick={nextSlide}
										disabled={!isSlideValid}
									>
										Continue
									</Button>
								)}
								{currentSlide === 3 && (
									<button
										type="button"
										onClick={handleSubmit}
										className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-400 rounded-3xl px-8 py-3 transition-all duration-300"
										disabled={!isSlideValid || isLoading}
									>
										{isLoading ? (
											<div className="flex items-center justify-center">
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
												Creating Account...
											</div>
										) : (
											<span className="text-white">Create Account</span>
										)}
									</button>
								)}
							</div>
						</form>
					</Form>
				</div>
			</main>
		</div>
	);
}

{
	/*
	
<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-gray-50 px-2 text-gray-500">
						Or continue with
					</span>
				</div>
			</div>
			<Button
				type="button"
				variant="outline"
				className="w-full py-6 flex items-center justify-center gap-2"
				onClick={() => console.log("Google sign-in")}
			>
				<svg
					viewBox="0 0 24 24"
					width="24"
					height="24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
						<path
							fill="#4285F4"
							d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
						/>
						<path
							fill="#34A853"
							d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
						/>
						<path
							fill="#FBBC05"
							d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
						/>
						<path
							fill="#EA4335"
							d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
						/>
					</g>
				</svg>
				Continue with Google
			</Button>

	*/
}
