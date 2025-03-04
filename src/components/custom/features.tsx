import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react";

export default function Features() {
	return (
		<main className="min-h-screen w-full max-w-7xl mx-auto  py-8 md:py-12 lg:py-16">
			{/* Row 1: Invest in fractions */}
			<section className="grid  md:grid-cols-2 items-center bg-[#e18a07]">
				<div className="p-4 py-8 md:p-12 lg:p-16">
					<h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Grow Your Wealth with Confidence
					</h1>
					<p className="text-white/90 text-md md:text-lg mb-8 leading-relaxed">
						Enjoy a fixed 300% return over 1050 days. Our investment model
						ensures long-term gains with minimal risk, making it perfect for
						those seeking financial growth and security.
					</p>
					<Button variant="secondary" size="lg" className="font-medium">
						Start Investing
					</Button>
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

			{/* Row 2: Learn the basics */}
			<section className="grid md:grid-cols-2 items-center bg-amber-50">
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 md:order-none">
					<Image
						src="/image/service3.jpeg"
						alt="Geometric shapes illustrating investment growth"
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-4 py-8 md:p-12 lg:p-16">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
						Daily Earnings, Just for You
					</h2>
					<p className="text-gray-600 text-md  md:text-lg mb-8 leading-relaxed">
						Receive consistent daily payouts in USX W, our secure internal token
						(1:1 USD value). Watch your earnings grow in real-time and reinvest
						to maximize your profits effortlessly.
					</p>
					<Button
						size="lg"
						className="font-medium bg-emerald-700 hover:bg-emerald-800"
					>
						Start Investing
					</Button>
				</div>
			</section>

			{/* Row 3: Advanced Trading */}
			<section className="grid md:grid-cols-2 items-center bg-[#e18a07]">
				<div className="p-4 py-8 px- md:p-12 lg:p-16">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Investment Plans for Everyone
					</h2>
					<p className="text-white/90 text-md md:text-lg mb-8 leading-relaxed">
						Start with as little as $500 or scale up to $25,000. Whether you're
						new to investing or a seasoned pro, our tiered plans help you
						achieve your financial goals with ease.
					</p>
					<div className="flex col gap-8 mb-8">
						<div className="flex items-center gap-2 text-white">
							<BarChart3 className="h-6 w-6" />
							<span>Live Charts</span>
						</div>
						<div className="flex items-center gap-2 text-white">
							<Shield className="h-6 w-6" />
							<span>Secure Trading</span>
						</div>
					</div>
					<Button variant="secondary" size="lg" className="font-medium">
						Explore Tools
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
					<Image
						src="/image/service1.jpeg"
						alt="Advanced trading platform interface"
						fill
						className="object-cover"
					/>
				</div>
			</section>

			{/* Row 4: Community */}
			<section className="grid md:grid-cols-2 items-center bg-white">
				<div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 md:order-none">
					<Image
						src="/image/service5.jpeg"
						alt="Investment community illustration"
						fill
						className="object-cover"
					/>
				</div>
				<div className="p-4 py-8 md:p-12 lg:p-16 bg-white">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
						Learn the basics of investing: From the ground up
					</h2>
					<p className="text-gray-600 text-md md:text-lg mb-8 leading-relaxed">
						We teach you the basics and get you started on your investment
						journey in no time.
					</p>
					<div className="flex items-center gap-3 text-gray-600 mb-8">
						<Users className="h-6 w-6" />
						<span>Join 100,000+ investors</span>
					</div>
					<Button
						size="lg"
						className="px-6 py-4 font-medium bg-emerald-700 hover:bg-emerald-800"
					>
						Join Community
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</section>
		</main>
	);
}
