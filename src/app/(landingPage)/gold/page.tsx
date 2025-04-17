import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Coins, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import GoldDashboard from "@/components/custom/gold-bullion";
import Navbar from "@/components/custom/navBar";
import HowItWorksSection from "@/components/custom/how-it-works";
import { AdvantagesSection } from "@/components/custom/advantage-section";
import Footer from "@/components/custom/footer";

export default function page() {
	return (
		<div className=" min-h-screen bg-background">
			<Navbar />

			<header className="top-0 left-0 right-0 bg-white/30 backdrop-blur-lg transition-transform duration-300">
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
						<Link href="/gold" className="text-gray-600 hover:text-gray-900">
							MetalMint gold
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
				</nav>
			</header>
			<main className="grid place-items-center">
				<section className="w-full py-12  bg-gradient-to-b from-amber-50 to-white">
					<div className="container px-4 md:px-6 mt-12 md:mt-0">
						<div className="px-4 md:px-8 lg:px-12 grid gap-6 lg:grid-cols-2 items-center justify-center text-center lg:text-left">
							<div className="space-y-4 lg:pl-24">
								<h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xlxl max-w-[500px] ">
									MetalMint <span className="text-gold">GOLD</span>
									<br></br>
									<span className="text-4xl font-medium">(USXW)</span>
								</h1>
								<p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
									The digital currency backed by physical gold.
								</p>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Button
										size="lg"
										className="p-6 bg-emerald-700 md:bg-emerald-800"
									>
										Get Started
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</div>
							</div>
							<div className="flex justify-center">
								<Image
									src="/image/coins (1).png?height=500&width=500"
									width={500}
									height={500}
									alt="Gold Token Illustration"
									className="rounded-lg object-cover"
								/>
							</div>
						</div>
					</div>
				</section>
				<section className=" w-full ">
					<p className="max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center my-12 mx-auto">
						MetalMint combines the stability of physical gold with the
						convenience of digital currency. Each token is 100% backed by
						physical gold, stored in secure vaults and regularly audited.
					</p>
					<div className="">
						<GoldDashboard />
					</div>
				</section>

				<section id="about" className="w-full py-12 md:py-24 max-w-6xl">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl ">
									What is MetalMint?
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									MetalMint is a digital currency that represents ownership of
									physical gold. Each token is backed by 1 gram of 99.99% pure
									gold, stored in secure, insured vaults and regularly audited
									by independent third parties.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
							<Card>
								<CardHeader className=" space-y-0 pb-2">
									<Image
										src="/icons/gold.svg"
										alt="Gold Icon"
										width={24}
										height={24}
									/>
									<CardTitle className="text-lg font-medium">
										Physical Gold Backing
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-500">
										Every MetalMint is backed 1:1 by physical gold stored in
										high-security vaults, giving you true ownership of gold
										without the hassle of storage.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-lg font-medium">
										Transparent Verification
									</CardTitle>
									<CheckCircle className="h-5 w-5 text-amber-500" />
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-500">
										Regular audits by trusted third parties verify that all
										tokens are fully backed by physical gold, with reports
										publicly available.
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-lg font-medium">
										Digital Convenience
									</CardTitle>
									<BarChart3 className="h-5 w-5 text-amber-500" />
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-500">
										Transfer, trade, and store your gold-backed tokens
										digitally, making gold ownership more accessible and
										flexible than ever before.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
				<HowItWorksSection />

				<AdvantagesSection />

				<section id="faq" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold  sm:text-4xl md:text-4xl">
									Frequently Asked Questions
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Find answers to common questions about MetalMint.
								</p>
							</div>
						</div>

						<div className="mx-auto max-w-4xl mt-12">
							<Accordion type="single" collapsible className="w-full">
								<AccordionItem value="item-1">
									<AccordionTrigger>
										Is MetalMint fully backed by physical gold?
									</AccordionTrigger>
									<AccordionContent>
										Yes, each MetalMint is 100% backed by physical gold stored
										in secure vaults. The gold reserves are regularly audited by
										independent third parties, with audit reports publicly
										available on our website.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger>
										How is the price of MetalMint determined?
									</AccordionTrigger>
									<AccordionContent>
										The price of MetalMint is directly tied to the current
										market price of gold. Each token represents 1 gram of 99.99%
										pure gold, so the token's value fluctuates with the gold
										market price, plus a small premium to cover storage and
										insurance costs.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-3">
									<AccordionTrigger>
										Can I redeem MetalMint for physical gold?
									</AccordionTrigger>
									<AccordionContent>
										Yes, MetalMint can be redeemed for physical gold. Minimum
										redemption quantities apply (typically 50 grams), and there
										is a redemption fee plus shipping costs. Alternatively, you
										can redeem for fiat currency at the current market value of
										gold.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-4">
									<AccordionTrigger>
										Where is the gold stored and is it insured?
									</AccordionTrigger>
									<AccordionContent>
										The gold backing MetalMint is stored in high-security vaults
										in multiple jurisdictions, including Switzerland, Singapore,
										and the United States. All gold holdings are fully insured
										against theft, damage, and other potential losses by leading
										insurance providers.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-5">
									<AccordionTrigger>
										What blockchain does MetalMint use?
									</AccordionTrigger>
									<AccordionContent>
										MetalMint operates on a secure, energy-efficient blockchain
										that provides fast transaction speeds and low fees. Our
										technology is designed to be scalable and environmentally
										responsible.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-6">
									<AccordionTrigger>
										Are there any ongoing fees for holding MetalMint?
									</AccordionTrigger>
									<AccordionContent>
										There is a small annual storage fee of 0.25% (charged
										monthly) to cover the costs of storing and insuring the
										physical gold. This fee is significantly lower than
										traditional gold storage options.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-7">
									<AccordionTrigger>
										Is MetalMint available worldwide?
									</AccordionTrigger>
									<AccordionContent>
										MetalMint is available in most countries, but due to varying
										regulations, availability may be limited in certain
										jurisdictions. Please check our Terms of Service for the
										most up-to-date information on supported regions.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-8">
									<AccordionTrigger>
										How do I get started with MetalMint?
									</AccordionTrigger>
									<AccordionContent>
										Getting started is simple. Create an account on our
										platform, complete the verification process, and you can
										begin purchasing MetalMint using various payment methods.
										Download our wallet app to securely store and manage your
										tokens.
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</div>
				</section>

				<section className="w-full py-12 md:py-24 lg:py-32 bg-amber-500 text-white">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									Ready to Get Started?
								</h2>
								<p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Join thousands of investors who trust MetalMint for secure,
									convenient gold ownership.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button
									size="lg"
									className="bg-white text-amber-500 hover:bg-gray-100"
								>
									Create Account
								</Button>
								<Button
									variant="outline"
									size="lg"
									className="border-white text-white hover:bg-amber-600"
								>
									Learn More
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
