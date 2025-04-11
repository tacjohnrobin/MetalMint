import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react";

export default function Features() {
	return (
		<main className="w-full max-w-7xl mx-auto py-8 md:py-12 lg:py-16 ">
			{/* Row 1: Invest in fractions 
			<section className="grid md:grid-cols-2 items-center bg-gradient-to-br from-gold to-emerald rounded-2xl overflow-hidden shadow-xl">
				<div className="p-8 md:p-12 lg:p-16">
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Grow Your Wealth with Confidence
					</h1>
					<p className="text-white/90 text-md md:text-lg mb-8 leading-relaxed">
						Enjoy a fixed 300% return over 1050 days. Our investment model
						ensures long-term gains with minimal risk, making it perfect for
						those seeking financial growth and security.
					</p>
					<a href="/login">
						<Button
							size="lg"
							className="bg-white text-gold hover:bg-emerald hover:text-white transition-colors duration-300"
						>
							Start Investing
						</Button>
					</a>
				</div>
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
					<Image
						src="/image/service2.jpeg"
						alt="Investment platform illustration showing various company logos"
						fill
						className="object-cover"
					/>
				</div>
			</section>

			{/* Row 2: Daily Earnings 
			<section className="grid md:grid-cols-2 items-center gap-8 mt-8 md:mt-12">
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 md:order-none">
					<Image
						src="/image/service3.jpeg"
						alt="Geometric shapes illustrating investment growth"
						fill
						className="object-cover rounded-2xl"
					/>
				</div>
				<div className="p-8 md:p-12 lg:p-16 bg-white rounded-2xl shadow-lg">
					<h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
						Daily Earnings, Just for You
					</h2>
					<p className="text-charcoal/70 text-md md:text-lg mb-8 leading-relaxed">
						Receive consistent daily payouts in USX W, our secure internal token
						(1:1 USD value). Watch your earnings grow in real-time and reinvest
						to maximize your profits effortlessly.
					</p>
					<a href="/login">
						<Button
							size="lg"
							className="bg-gold hover:bg-emerald text-white transition-colors duration-300"
						>
							Start Investing
						</Button>
					</a>
				</div>
			</section>

			{/* Row 3: Investment Plans 
			<section className="grid md:grid-cols-2 items-center gap-8 mt-8 md:mt-12">
				<div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-emerald to-gold rounded-2xl shadow-xl">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Investment Plans for Everyone
					</h2>
					<p className="text-white/90 text-md md:text-lg mb-8 leading-relaxed">
						Start with as little as $500 or scale up to $25,000. Whether you're
						new to investing or a seasoned pro, our tiered plans help you
						achieve your financial goals with ease.
					</p>
					<div className="flex flex-col gap-8 mb-8">
						<div className="flex items-center gap-2 text-white">
							<BarChart3 className="h-6 w-6" />
							<span>Live Charts</span>
						</div>
						<div className="flex items-center gap-2 text-white">
							<Shield className="h-6 w-6" />
							<span>Secure Trading</span>
						</div>
					</div>
					<a href="/register">
						<Button 
							variant="outline" 
							size="lg" 
							className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-colors duration-300"
						>
							Explore Tools
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</a>
				</div>
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
					<Image
						src="/image/service1.jpeg"
						alt="Advanced trading platform interface"
						fill
						className="object-cover rounded-2xl"
					/>
				</div>
			</section>

			{/* Row 4: Community */}
			<section className="grid md:grid-cols-2 items-center gap-8 mt-8 md:mt-12 bg-emerald-700">
				<div className="p-8 md:p-12 lg:p-16 bg-emerald-700 rounded-2xl text-white  ">
					<h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
						Learn the basics of investing: From the ground up
					</h2>
					<p className="text-charcoal/70 text-md md:text-lg mb-8 leading-relaxed">
						We teach you the basics and get you started on your investment
						journey in no time.
					</p>
					<div className="flex items-center gap-3 text-charcoal/70 mb-8">
						<Users className="h-6 w-6" />
						<span>Join 100,000+ investors</span>
					</div>
					<Button
						size="lg"
						className="hover:bg-white bg-emerald-700  text-white hover:text-emerald-700 transition-colors duration-300 p-6"
					>
						Join Community
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 md:order-none">
					<Image
						src="/image/grow-metal.png"
						alt="Investment community illustration"
						fill
						className="object-cover rounded-2xl"
					/>
				</div>
			</section>
		</main>
	);
}
