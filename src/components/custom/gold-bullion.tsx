"use client";

import { useEffect, useRef } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function GoldDashboard() {
	const containerRef = useRef(null);

	// Function to check if element is in viewport
	interface IntersectionObserverOptions {
		root?: Element | Document | null;
		rootMargin?: string;
		threshold?: number | number[];
	}

	interface UseIntersectionObserverProps {
		ref: React.RefObject<HTMLElement>;
		options?: IntersectionObserverOptions;
	}

	const useIntersectionObserver = (
		ref: React.RefObject<HTMLElement>,
		options: IntersectionObserverOptions = {},
	): void => {
		useEffect(() => {
			if (!ref.current) return;

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (
							(entry.target as HTMLElement).dataset.animate &&
							entry.isIntersecting
						) {
							entry.target.classList.add("animate-in");
						}
					});
				},
				{ threshold: 0.1, ...options },
			);

			const elements = ref.current.querySelectorAll("[data-animate]");
			elements.forEach((element) => observer.observe(element));

			return () => {
				elements.forEach((element) => observer.unobserve(element));
			};
		}, [ref, options]);
	};

	useIntersectionObserver(containerRef);

	return (
		<div ref={containerRef} className="w-full max-w-6xl mx-auto">
			{/* Header Section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="mb-8 flex flex-col items-center gap-6 sm:items-start sm:flex-row sm:justify-between"
			>
				<div className="flex items-center gap-4">
					<div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg">
						<div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-emerald-900">
							K
						</div>
					</div>
					<div>
						<div className="text-sm font-medium text-amber-200">
							METALMINT GOLD
						</div>
						<div className="text-3xl font-bold text-white">usxw</div>
					</div>
				</div>

				<div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
					<Button className="bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg">
						Buy Gold
					</Button>
					<Button
						variant="outline"
						className="border-amber-600/50 text-amber-100 hover:bg-amber-900/20 transition-all duration-300"
					>
						Transaction explorer
					</Button>
				</div>
			</motion.div>

			{/* Main Grid */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Circulating Supply */}
				<Card
					data-animate
					className="col-span-1 flex flex-col justify-between bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white md:col-span-2 lg:col-span-1 border-emerald-800/50 shadow-lg hover:shadow-emerald-700/10 transition-all duration-500 opacity-0 translate-y-4 animate-in:opacity-100 animate-in:translate-y-0"
				>
					<div className="text-sm font-medium text-amber-200">
						Circulating supply
					</div>
					<div>
						<div className="text-4xl font-bold text-white">$133.12m</div>
						<div className="text-sm text-amber-100/70">1.43m grams</div>
					</div>
				</Card>

				{/* Conversion Rate */}
				<Card
					data-animate
					className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white border-emerald-800/50 shadow-lg hover:shadow-emerald-700/10 transition-all duration-500 opacity-0 translate-y-4 animate-in:opacity-100 animate-in:translate-y-0"
					style={{ transitionDelay: "100ms" }}
				>
					<div className="flex w-full items-center justify-between gap-4">
						<div className="flex flex-col items-center">
							<div className="relative mb-2 h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-emerald-800 to-emerald-900">
								<div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-amber-300">
									K
								</div>
							</div>
							<div className="text-2xl font-bold">1</div>
							<div className="text-sm text-amber-100/70">USXW</div>
						</div>

						<div className="text-2xl font-bold text-emerald-400">=</div>

						<div className="flex flex-col items-center">
							<div className="relative mb-2 h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-sm">
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="h-6 w-6 rounded-full bg-amber-400"></div>
								</div>
							</div>
							<div className="text-2xl font-bold">1</div>
							<div className="text-sm text-amber-100/70">gram of gold</div>
						</div>
					</div>
				</Card>

				{/* Storage Fees */}
				<Card
					data-animate
					className="flex flex-col items-end justify-between bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white border-emerald-800/50 shadow-lg hover:shadow-emerald-700/10 transition-all duration-500 opacity-0 translate-y-4 animate-in:opacity-100 animate-in:translate-y-0"
					style={{ transitionDelay: "200ms" }}
				>
					<div className="h-2 w-2 rounded-full bg-amber-400"></div>
					<div className="flex flex-col items-end">
						<div className="text-4xl font-bold">$0</div>
						<div className="text-sm text-amber-100/70">Storage fees</div>
					</div>
				</Card>

				{/* Redemption */}
				<Card
					data-animate
					className="flex flex-col items-center justify-between bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white border-emerald-800/50 shadow-lg hover:shadow-emerald-700/10 transition-all duration-500 opacity-0 translate-y-4 animate-in:opacity-100 animate-in:translate-y-0"
					style={{ transitionDelay: "300ms" }}
				>
					<div className="text-sm font-medium text-amber-200">Redemption</div>
					<div className="flex flex-col items-center">
						<div className="mb-2 text-emerald-400">⋮</div>
						<div className="text-4xl font-bold text-amber-400">100</div>
						<div className="text-sm text-amber-100/70">grams min.</div>
					</div>
				</Card>

				{/* Transaction Speed */}
				<Card
					data-animate
					className="flex flex-col items-center justify-between bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white border-emerald-800/50 shadow-lg hover:shadow-emerald-700/10 transition-all duration-500 opacity-0 translate-y-4 animate-in:opacity-100 animate-in:translate-y-0"
					style={{ transitionDelay: "400ms" }}
				>
					<div className="text-sm font-medium text-amber-200">
						Transaction Speed
					</div>
					<div className="flex flex-col items-center">
						<Zap className="mb-2 h-8 w-8 text-emerald-400" />
						<div className="text-4xl font-bold">2-3</div>
						<div className="text-sm text-amber-100/70">Seconds</div>
					</div>
				</Card>

				{/* Divisibility */}
				<Card
					data-animate
					className="flex flex-col items-center justify-between bg-gradient-to-br from-emerald-900 to-emerald-950 p-6 text-white border-emerald-800/50 shadow-lg hover:shadow-emerald-700/10 transition-all duration-500 opacity-0 translate-y-4 animate-in:opacity-100 animate-in:translate-y-0"
					style={{ transitionDelay: "500ms" }}
				>
					<div className="text-sm font-medium text-amber-200">Divisibility</div>
					<div className="flex flex-col items-center">
						<div className="mb-2 text-emerald-400">⁄</div>
						<div className="flex items-baseline">
							<span className="text-4xl font-bold text-amber-400">0</span>
							<span className="text-xl font-bold text-amber-200/50">
								.00001
							</span>
						</div>
						<div className="text-sm text-amber-100/70">USXW</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
