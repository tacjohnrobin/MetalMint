import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, FeatherIcon, Menu, Shield } from "lucide-react";
import Features from "@/components/custom/features";
import SecuritySection from "@/components/custom/securitySection";
import Navbar from "@/components/custom/navBar";
import Footer from "@/components/custom/footer";
import CTASection from "@/components/custom/cta";

export default function Home() {
	return (
		<div className="min-h-screen">
			<header>
				<Navbar />
			</header>

			<main>
				<section className="relative min-h-screen flex items-center">
					<div
						className="absolute inset-0 z-0"
						style={{
							backgroundImage: "url('/image/coingraph1.jpg')",
							backgroundSize: "cover",
							backgroundPosition: "75% 10%",
						}}
					/>
					<div className="container  px-4 z-10">
						<div className="grid md:grid-cols-2 gap-12 md:items-center ">
							<div className="space-y-6 lg:pl-4 pt-0">
								<h1 className="w-full text-5xl md:text-6xl lg:text-8xl font-bold  md:font-bold leading-tight tracking-tight">
									Dream big, Invest smart
								</h1>
								<p className="text-md md:text-lg text-gray-600 md:text-xl max-w-[300px] lg:max-w-[500px] mb-8">
									{" "}
									Invest in gold with fixed daily returns, backed by real mining
									for stability and profit.
								</p>
								<a href="/register">
									<Button className="bg-[#e8ff54] text-black hover:bg-[#d4eb40] text-lg md:text-xl px-8 py-6 lg:px-12 lg:py-8 ">
										Get Started
									</Button>
								</a>
							</div>
							<div className="relative">
								<div className="" />
								{/* 
                <Image
                  width={1000}
                  height={1000}
                  layout="responsive"
                  objectFit="cover"
                  src="/image/coingraph.jpg"
                  alt="Investment App Interface"
                  
                />
                */}
							</div>
						</div>
					</div>
				</section>
				<section className="bg-[#f5f6f1ff]">
					<div className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
						<h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-12 md:mb-16 max-w-3xl mx-auto">
							Protect your spending & savings with precious metals
						</h1>
						<div className="grid md:grid-cols-3 gap-6 lg:gap-8">
							<div className="bg-white rounded-lg p-6 shadow-sm">
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
									<CreditCard className="w-6 h-6 text-blue-500" />
								</div>
								<h2 className="text-xl font-semibold text-[#0A1F44] mb-3">
									Spend gold & silver
								</h2>
								<p className="text-gray-600 mb-4">
									Use gold and silver as money, anywhere MasterCard is accepted.
								</p>
								<Link
									href="#"
									className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center"
								>
									Learn more
									<svg
										className="w-4 h-4 ml-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Link>
							</div>

							<div className="bg-white rounded-lg p-6 shadow-sm">
								<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
									<Menu className="w-6 h-6 text-gray-500" />
								</div>
								<h2 className="text-xl font-semibold text-[#0A1F44] mb-3">
									Manage your wealth
								</h2>
								<p className="text-gray-600 mb-4">
									Keep your hard-earned savings safe with physical precious
									metals.
								</p>
								<Link
									href="#"
									className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center"
								>
									Learn more
									<svg
										className="w-4 h-4 ml-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Link>
							</div>

							<div className="bg-white rounded-lg p-6 shadow-sm">
								<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
									<Shield className="w-6 h-6 text-blue-500" />
								</div>
								<h2 className="text-xl font-semibold text-[#0A1F44] mb-3">
									Secure storage
								</h2>
								<p className="text-gray-600 mb-4">
									Your gold and silver are safely stored in our world-class
									vaults.
								</p>
								<Link
									href="#"
									className="text-blue-500 hover:text-blue-600 font-medium inline-flex items-center"
								>
									Learn more
									<svg
										className="w-4 h-4 ml-1"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Link>
							</div>
						</div>
					</div>
				</section>
				<section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-12">
					<Features />
				</section>
				<SecuritySection />
				<CTASection />
			</main>
			<Footer />
		</div>
	);
}
