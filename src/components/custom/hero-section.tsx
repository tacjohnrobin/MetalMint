"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	const [scrollY, setScrollY] = useState(0);

	// Handle scroll for parallax effect
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="m-4 md:m-12  lg:h-[600px]  bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-900 text-white overflow-hidden rounded-3xl md:rounded-[40px]">
			<div className="container mx-auto px-4 py-16 md:py-24  px-24 relative max-w-6xl">
				{/* Parallax Background Image 1 - Top Right */}
				<div
					className="absolute top-6 right-6 w-28 h-28 md:w-72 md:h-84 opacity-90 pointer-events-none z-0 rotate-12"
					style={{
						transform: `translate(${scrollY * -0.06}px, ${scrollY * 0.03}px)`,
						transition: "transform 0.1s ease-out",
					}}
				>
					<Image
						src="/image/para.png?height=300&width=300"
						alt="Decorative gold coin"
						width={300}
						height={300}
						className="object-contain rounded-full"
					/>
				</div>

				{/* Parallax Background Image 2 - Bottom Left */}
				<div
					className="absolute bottom-[-50%] left-10 md:left-40 bottom-3 w-24 h-24 md:w-72 md:h-72 opacity-90 pointer-events-none z-0 -rotate-6"
					style={{
						transform: `translate(${scrollY * 0.04}px, ${scrollY * -0.05}px)`,
						transition: "transform 0.1s ease-out",
					}}
				>
					<Image
						src="/image/para-flip.png?height=300&width=300"
						alt="Decorative gold coin"
						width={300}
						height={300}
						className="object-contain"
					/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-[1fr,0.5fr] gap-8 items-start px-6">
					{/* Left Content */}
					<div className="space-y-6 md:pr-8 relative z-10 max-w-3xl">
						<h1 className="text-4xl md:text-5xl  lg:text-6xl  font-bold ">
							<span className="text-gold">Progressive</span> Financial Growth
							Strategies
						</h1>
						<p className="text-lg  text-gray-300 max-w-xl">
							Secure your financial future with our premium selection of
							precious metals. Trusted by investors since 2021.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<a href="/register">
								<Button className="w-fit bg-white hover:bg-gray-100 text-emerald-700 hover:text-emerald-800 font-medium px-8 py-6">
									Invest Today
								</Button>
							</a>
						</div>
					</div>

					{/* Right Image - Wider and overflowing at bottom */}
					<div className="relative h-full md:absolute md:right-0 md:bottom-0 md:w-[55%] lg:w-[50%] xl:w-[45%] md:translate-y-[15%] md:translate-x-[5%] z-10">
						<div className="absolute inset-0 bg-amber-500/40 blur-3xl rounded-full -z-10"></div>
						<div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
							<Image
								src="/image/hero.png"
								alt="Metal Mint Gold Bar"
								fill
								className="object-contain drop-shadow-2xl scale-110"
								sizes="(max-width: 500px) 100vw, 50vw"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
