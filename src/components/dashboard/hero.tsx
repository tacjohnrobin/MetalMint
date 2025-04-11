"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import CircuitBackground from "./circuit-background";
import DashboardPreview from "./dashboard-preview";
import { theme } from "@/lib/theme";
import Image from "next/image";

export default function Hero() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<div className="relative overflow-hidden bg-gradient-to-b  from-white to-[#f5f6f1ff] ">
			{/* Circuit Background */}
			<div className="absolute inset-0 z-0">
				<CircuitBackground />
			</div>

			{/* Fade-out effect at the bottom - positioned to affect dashboard too */}
			<div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-white via-white/80 to-transparent z-30"></div>

			<div className="relative z-20">
				{/* Navigation */}
				<header className="relative">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 ">
						<div className="relative flex h-20 items-center justify-between">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Link
										href="/"
										className="hidden md:flex items-center space-x-2"
									>
										<div className="bg-gray-900 rounded-md p-2">
											<svg
												width="20"
												height="20"
												viewBox="0 0 24 24"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
												<path
													d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"
													fill="white"
												/>
											</svg>
										</div>
										<span className="text-gray-900 font-semibold text-xl">
											MetalMint
										</span>
									</Link>
								</div>
							</div>

							<nav className="hidden md:flex space-x-8">
								<Link
									href="/gold"
									className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm md:text-md lg:text-lg font-medium"
								>
									MetalMint Tokens
								</Link>
							</nav>

							<div className="hidden md:flex">
								<Button className="bg-emerald-600 hover:bg-emerald-700 p-6">
									Get Wallet
								</Button>
							</div>
						</div>
					</div>
				</header>

				{/* Hero content */}
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center">
					<div className="flex flex-col items-center justify-center space-y-8">
						<h1 className="text-4xl  font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
							<span className="block">Hunt for Digital Gold,</span>
							<span
								className="block"
								style={{
									background: theme.gradients.gold,
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									textShadow: "0 0 20px rgba(255, 215, 0, 0.5)",
								}}
							>
								Cultivate Your Currency
							</span>
						</h1>

						<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
							Enthusiasts and investors looking to maximize their earnings
							through strategic Investing
						</p>

						<div className="w-mt-5 max-w-5xl mx-auto sm:justify-center md:mt-8">
							<div className="rounded-md shadow">
								<Link
									href="/register"
									className="w-full bg-emerald-700 hover:bg-emerald-800 p-4 text-white rounded-md"
								>
									Get Started
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Dashboard Preview */}
				<div className=" w-full relative z-20 px-4 mx-auto pb-8 flex justify-center items-center overflow-hidden">
					<Image
						src="/image/hero-banner.png"
						alt="hero banner"
						width={1000}
						height={400}
						className="border-t-8 border-x-4 border-black rounded-2xl mx-auto "
					/>
				</div>
			</div>
		</div>
	);
}
