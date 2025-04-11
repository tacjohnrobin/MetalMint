import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="w-full h-screen bg-gradient-to-r from-[#0a1929] to-[#0f2942] text-white overflow-hidden">
			<div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 px-24 relative">
				<div className="grid grid-cols-1 md:grid-cols-[1fr,0.8fr] gap-8 items-center">
					{/* Left Content */}
					<div className="space-y-6 md:pr-8">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
							<span className="text-amber-400">Premium</span> Metal Investments
						</h1>
						<p className="text-lg md:text-xl text-gray-300 max-w-md">
							Secure your financial future with our premium selection of
							precious metals. Trusted by investors since 2021.
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<Button className="w-fit bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-6">
								Explore Products
							</Button>
						</div>
					</div>

					{/* Right Image - Wider and overflowing at bottom */}
					<div className="relative h-full md:absolute md:right-0 md:bottom-0 md:w-[55%] lg:w-[50%] xl:w-[45%] md:translate-y-[15%] md:translate-x-[5%]">
						<div className="absolute inset-0 bg-amber-500/40 blur-3xl rounded-full -z-10"></div>
						<div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px]">
							<Image
								src="/image/hero1.png"
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
