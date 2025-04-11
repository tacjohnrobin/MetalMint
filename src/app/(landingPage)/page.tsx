import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowRight,
	BarChart2,
	CreditCard,
	FeatherIcon,
	Menu,
	Shield,
} from "lucide-react";
import Features from "@/components/custom/features";
import SecuritySection from "@/components/custom/securitySection";
import Navbar from "@/components/custom/navBar";
import Footer from "@/components/custom/footer";
import CTASection from "@/components/custom/cta";
import Hero from "@/components/dashboard/hero";
import SliderTabs from "@/components/custom/slider-tabs";
import DigitalCurrenciesSection from "@/components/custom/currency-section";
import HeroSection from "@/components/custom/hero-section";

export default function Home() {
	return (
		<div className="min-h-screen">
			<header>
				<Navbar />
			</header>

			<main>
				{/* 	<section className="relative min-h-screen flex items-center">
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
								
                <Image
                  width={1000}
                  height={1000}
                  layout="responsive"
                  objectFit="cover"
                  src="/image/coingraph.jpg"
                  alt="Investment App Interface"
                  
                />
               
							</div>
						</div>
					</div>
				</section> */}
				{/*<section className="relative relative min-h-screen flex items-center bg-[#f5f6f1ff] mt-12">
					<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background">
						<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
					</div>

					<div className="container relative">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-24">
							<div className="space-y-8 pl-6">
								<div className="space-y-6 ">
									<h1 className="font-bold tracking-tighter text-center lg:text-left text-5xl md:text-6xl lg:text-7xl">
										Make Your Trading{" "}
										<span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
											Exceptional
										</span>
									</h1>
									<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-center lg:text-left">
										Achieve precision and confidence in your trades with our
										advanced technical indicator. Experience up to 95% accuracy
										across multiple markets.
									</p>
								</div>
								<div className="flex flex-wrap gap-4">
									<Button size="lg" className="gap-2">
										Start Trading <ArrowRight className="h-4 w-4" />
									</Button>
									<Button size="lg" variant="outline">
										View Demo
									</Button>
								</div>
								<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-8">
									<div className="space-y-2">
										<h4 className="text-4xl font-bold text-primary">95%</h4>
										<p className="text-sm text-muted-foreground">
											Accuracy Rate
										</p>
									</div>
									<div className="space-y-2">
										<h4 className="text-4xl font-bold text-primary">24/7</h4>
										<p className="text-sm text-muted-foreground">
											Market Coverage
										</p>
									</div>
									<div className="space-y-2">
										<h4 className="text-4xl font-bold text-primary">10k+</h4>
										<p className="text-sm text-muted-foreground">
											Active Traders
										</p>
									</div>
								</div>
							</div>
							<div className="relative hidden lg:block">
								<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-3xl" />
								<div className="relative bg-card rounded-2xl border p-6 shadow-2xl">
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<div className="space-y-1">
												<h3 className="font-semibold">
													MetalMint Indicator Signal
												</h3>
												<p className="text-sm text-muted-foreground">
													Real-time market analysis
												</p>
											</div>
											<Button variant="outline" size="sm">
												Live Demo
											</Button>
										</div>
										<div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center">
											<BarChart2 className="h-24 w-24 text-primary/40" />
										</div>
										<div className="grid grid-cols-3 gap-4">
											{[1, 2, 3].map((i) => (
												<div key={i} className="space-y-2">
													<div className="h-2 rounded-full bg-primary/20" />
													<div className="h-2 w-2/3 rounded-full bg-muted" />
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>*/}
				<section>
					<HeroSection />
				</section>
				<section className="">
					<div className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
						<h1 className="text-center text-3xl md:text-4xl font-bold text-[#0A1F44] mb-12 md:mb-16 max-w-3xl mx-auto">
							Protect your spending & savings with precious metals
						</h1>
						<div className="grid md:grid-cols-3 gap-6 lg:gap-8">
							<div className="w-full bg-white rounded-lg p-6 shadow-sm grid items-center justify-center">
								<div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
									<CreditCard className="w-6 h-6 text-blue-500" />
								</div>
								<h2 className="text-xl text-center font-semibold text-[#0A1F44] mb-3">
									Spend gold & silver
								</h2>
								<p className="text-gray-600 mb-4 text-center">
									Use gold and silver as money, anywhere MasterCard is accepted.
								</p>
								{/*<Link
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
								</Link>*/}
							</div>

							<div className="bg-white rounded-lg p-6 shadow-sm">
								<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<Menu className="w-6 h-6 text-gray-500" />
								</div>
								<h2 className="text-xl font-semibold text-[#0A1F44] mb-3 text-center">
									Manage your wealth
								</h2>
								<p className="text-gray-600 mb-4 text-center">
									Keep your hard-earned savings safe with physical precious
									metals.
								</p>
							</div>

							<div className="bg-white rounded-lg p-6 shadow-sm">
								<div className="w-12 h-12 bg-blue-100 mx-auto rounded-full flex items-center justify-center mb-4">
									<Shield className="w-6 h-6 text-blue-500" />
								</div>
								<h2 className="text-xl font-semibold text-[#0A1F44] mb-3 text-center">
									Secure storage
								</h2>
								<p className="text-gray-600 mb-4 text-center">
									Your gold and silver are safely stored in our world-class
									vaults.
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-6 bg-[#FFFCF6] ">
					<SliderTabs />
				</section>
				<section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 ">
					<DigitalCurrenciesSection />
				</section>
				<section className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 bg-emerald-700 ">
					<Features />
				</section>
				<SecuritySection />
				<CTASection />
			</main>
			<Footer />
		</div>
	);
}
