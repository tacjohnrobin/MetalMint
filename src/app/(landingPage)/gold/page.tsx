import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	CheckCircle,
	Shield,
	Coins,
	BarChart3,
	DollarSign,
	Lock,
	AlertTriangle,
} from "lucide-react";

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

export default function page() {
	return (
		<div className="  items-center ">
			<header>
				<Navbar />
			</header>
			<main className="grid  ">
				<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-amber-50 to-white">
					<div className="container px-4 md:px-6 mt-12 md:mt-0">
						<div className="px-4 md:px-8 lg:px-12 grid gap-6 lg:grid-cols-2 items-center">
							<div className="space-y-4">
								<h1 className="text-4xl font-bold tracking-tighter md:text-5xl max-w-[500px] ">
									The Digital Currency Backed by{" "}
									<span className="text-gold">Real Gold</span>
								</h1>
								<p className="max-w-[500px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
									MetalMint combines the stability of physical gold with the
									convenience of digital currency. Each token is 100% backed by
									physical gold, stored in secure vaults and regularly audited.
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
				<section className=" bg-gold">
					<div className="mx-auto px-6 py-12">
						<GoldDashboard />
					</div>
				</section>

				<section id="about" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm">
									About GoldToken
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									What is GoldToken?
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									GoldToken is a digital currency that represents ownership of
									physical gold. Each token is backed by 1 gram of 99.99% pure
									gold, stored in secure, insured vaults and regularly audited
									by independent third parties.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-lg font-medium">
										Physical Gold Backing
									</CardTitle>
									<Coins className="h-5 w-5 text-amber-500" />
								</CardHeader>
								<CardContent>
									<p className="text-sm text-gray-500">
										Every GoldToken is backed 1:1 by physical gold stored in
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

				<section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									How It Works
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									GoldToken operates on a simple principle: each token
									represents ownership of physical gold, with a transparent
									mechanism ensuring its value is directly tied to gold prices.
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12 items-center">
							<div className="space-y-4">
								<div className="flex items-center space-x-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
										<span className="font-bold text-amber-700">1</span>
									</div>
									<div>
										<h3 className="text-xl font-bold">
											Gold Acquisition & Storage
										</h3>
										<p className="text-gray-500">
											Physical gold is purchased and stored in secure, insured
											vaults.
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
										<span className="font-bold text-amber-700">2</span>
									</div>
									<div>
										<h3 className="text-xl font-bold">Token Issuance</h3>
										<p className="text-gray-500">
											Tokens are issued on the blockchain, each representing 1
											gram of gold.
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
										<span className="font-bold text-amber-700">3</span>
									</div>
									<div>
										<h3 className="text-xl font-bold">Regular Audits</h3>
										<p className="text-gray-500">
											Independent auditors verify that all tokens are fully
											backed by physical gold.
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
										<span className="font-bold text-amber-700">4</span>
									</div>
									<div>
										<h3 className="text-xl font-bold">Price Tracking</h3>
										<p className="text-gray-500">
											Token value automatically tracks the current market price
											of gold.
										</p>
									</div>
								</div>
							</div>
							<div className="flex justify-center">
								<Image
									src="/placeholder.svg?height=400&width=400"
									width={400}
									height={400}
									alt="How GoldToken Works"
									className="rounded-lg object-cover"
								/>
							</div>
						</div>
					</div>
				</section>

				<section id="advantages" className="w-full py-12 md:py-24 lg:py-32">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm">
									Advantages
								</div>
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
									Why Choose GoldToken?
								</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									GoldToken offers unique advantages over both traditional
									cryptocurrencies and other gold-backed tokens.
								</p>
							</div>
						</div>

						<Tabs defaultValue="crypto" className="mx-auto max-w-4xl mt-12">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="crypto">
									vs. Traditional Cryptocurrencies
								</TabsTrigger>
								<TabsTrigger value="gold">
									vs. Other Gold-Backed Tokens
								</TabsTrigger>
							</TabsList>
							<TabsContent value="crypto" className="mt-6">
								<div className="grid gap-6 lg:grid-cols-2">
									<Card>
										<CardHeader>
											<CardTitle>Stability</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												Unlike volatile cryptocurrencies, GoldToken's value is
												tied to physical gold, providing stability and
												protection against inflation.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Intrinsic Value</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												While many cryptocurrencies have no underlying assets,
												GoldToken is backed by a precious metal with thousands
												of years of recognized value.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Energy Efficiency</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												GoldToken uses an energy-efficient blockchain, avoiding
												the massive energy consumption associated with
												proof-of-work cryptocurrencies.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Regulatory Clarity</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												As an asset-backed token, GoldToken operates within a
												clearer regulatory framework than many cryptocurrencies.
											</p>
										</CardContent>
									</Card>
								</div>
							</TabsContent>
							<TabsContent value="gold" className="mt-6">
								<div className="grid gap-6 lg:grid-cols-2">
									<Card>
										<CardHeader>
											<CardTitle>Superior Auditing</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												GoldToken implements more frequent and rigorous
												third-party audits than competitors, ensuring complete
												transparency.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Lower Fees</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												Our streamlined operations allow us to offer lower
												transaction and storage fees compared to other
												gold-backed tokens.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Redemption Options</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												GoldToken offers flexible redemption options, including
												physical delivery of gold or conversion to fiat
												currency.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<CardTitle>Advanced Security</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-gray-500">
												Our multi-layered security approach for both digital
												tokens and physical gold storage exceeds industry
												standards.
											</p>
										</CardContent>
									</Card>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</section>

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
										Is GoldToken fully backed by physical gold?
									</AccordionTrigger>
									<AccordionContent>
										Yes, each GoldToken is 100% backed by physical gold stored
										in secure vaults. The gold reserves are regularly audited by
										independent third parties, with audit reports publicly
										available on our website.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger>
										How is the price of GoldToken determined?
									</AccordionTrigger>
									<AccordionContent>
										The price of GoldToken is directly tied to the current
										market price of gold. Each token represents 1 gram of 99.99%
										pure gold, so the token's value fluctuates with the gold
										market price, plus a small premium to cover storage and
										insurance costs.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-3">
									<AccordionTrigger>
										Can I redeem GoldToken for physical gold?
									</AccordionTrigger>
									<AccordionContent>
										Yes, GoldToken can be redeemed for physical gold. Minimum
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
										The gold backing GoldToken is stored in high-security vaults
										in multiple jurisdictions, including Switzerland, Singapore,
										and the United States. All gold holdings are fully insured
										against theft, damage, and other potential losses by leading
										insurance providers.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-5">
									<AccordionTrigger>
										What blockchain does GoldToken use?
									</AccordionTrigger>
									<AccordionContent>
										GoldToken operates on a secure, energy-efficient blockchain
										that provides fast transaction speeds and low fees. Our
										technology is designed to be scalable and environmentally
										responsible.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-6">
									<AccordionTrigger>
										Are there any ongoing fees for holding GoldToken?
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
										Is GoldToken available worldwide?
									</AccordionTrigger>
									<AccordionContent>
										GoldToken is available in most countries, but due to varying
										regulations, availability may be limited in certain
										jurisdictions. Please check our Terms of Service for the
										most up-to-date information on supported regions.
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-8">
									<AccordionTrigger>
										How do I get started with GoldToken?
									</AccordionTrigger>
									<AccordionContent>
										Getting started is simple. Create an account on our
										platform, complete the verification process, and you can
										begin purchasing GoldToken using various payment methods.
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
									Join thousands of investors who trust GoldToken for secure,
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
			<footer className="w-full border-t bg-background py-6 md:py-12">
				<div className="container px-4 md:px-6">
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						<div className="space-y-4">
							<div className="flex items-center space-x-2">
								<div className="h-6 w-6 bg-amber-500 rounded-full"></div>
								<span className="font-bold">GoldToken</span>
							</div>
							<p className="text-sm text-gray-500">
								The digital currency backed by physical gold, combining the
								stability of precious metals with the convenience of digital
								assets.
							</p>
						</div>
						<div className="space-y-4">
							<h3 className="font-medium">Resources</h3>
							<ul className="space-y-2 text-sm text-gray-500">
								<li>
									<Link href="#" className="hover:text-primary">
										Documentation
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Whitepaper
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Audit Reports
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Blog
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-4">
							<h3 className="font-medium">Company</h3>
							<ul className="space-y-2 text-sm text-gray-500">
								<li>
									<Link href="#" className="hover:text-primary">
										About Us
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Careers
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Contact
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Press Kit
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-4">
							<h3 className="font-medium">Legal</h3>
							<ul className="space-y-2 text-sm text-gray-500">
								<li>
									<Link href="#" className="hover:text-primary">
										Terms of Service
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Risk Disclosure
									</Link>
								</li>
								<li>
									<Link href="#" className="hover:text-primary">
										Compliance
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
						<p>© 2025 GoldToken. All rights reserved.</p>
						<p className="mt-2">
							GoldToken is not available in all jurisdictions. Please review our
							Terms of Service for eligibility requirements.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
