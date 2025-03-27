"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-lg">
			<nav className="container mx-auto flex items-center justify-between px-4 py-4">
				<Link href="/" className="flex items-center space-x-2">
					<Image
						src="/icons/favi.svg"
						alt="MetalMint Logo"
						width={28}
						height={28}
					/>
					<span className="text-xl font-semibold text-gold">MetalMint</span>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center space-x-8">
					<Link href="#" className="text-gray-600 hover:text-gray-900">
						Products
					</Link>
					<Link href="#" className="text-gray-600 hover:text-gray-900">
						Learn
					</Link>
					<Link href="#" className="text-gray-600 hover:text-gray-900">
						Community
					</Link>
					<Link href="#" className="text-gray-600 hover:text-gray-900">
						FAQ
					</Link>
					<div className="flex items-center space-x-4">
						<a href="/login">
							<Button
								variant="outline"
								className="h-12 border-white/20 bg-white/10 rounded-lg"
							>
								Login
							</Button>
						</a>
						<a href="/register">
							<Button className="bg-emerald-700 hover:bg-emerald-800 h-12">
								Get Started
							</Button>
						</a>
					</div>
				</div>

				{/* Mobile Navigation */}
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="outline" size="icon" className="md:hidden">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Open menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="w-[300px] sm:w-[350px]">
						<div className="flex flex-col gap-6 mt-8">
							<Link
								href="#"
								className="text-lg font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100"
							>
								Products
							</Link>
							<Link
								href="#"
								className="text-lg font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100"
							>
								Learn
							</Link>
							<Link
								href="#"
								className="text-lg font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100"
							>
								Community
							</Link>
							<Link
								href="#"
								className="text-lg font-medium text-gray-600 hover:text-gray-900 py-2 border-b border-gray-100"
							>
								FAQ
							</Link>
							<div className="flex flex-col gap-3 mt-4">
								<a href="/register">
									<Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12">
										Get Started
									</Button>
								</a>
								<a href="/login">
									<Button variant="outline" className="w-full rounded-sm ">
										Login
									</Button>
								</a>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
