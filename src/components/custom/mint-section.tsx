import {
	ArrowRight,
	Shield,
	Coins,
	BarChart3,
	DollarSign,
	Lock,
	AlertTriangle,
	CheckCircle,
	Scale,
	Zap,
	Layers,
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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

export default function MetalMintSection() {
	return (
		<div className="flex min-h-screen flex-col">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-amber-900/10 to-background">
				<div className="container px-4 md:px-6">
					<div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px] items-center">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
									Introducing
								</div>
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
									Metal Mint <span className="text-amber-500">Gold Token</span>
								</h1>
								<p className="max-w-[600px] text-muted-foreground md:text-xl">
									A revolutionary digital currency backed by physical gold,
									combining the stability of precious metals with the efficiency
									of blockchain technology.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Button
									size="lg"
									className="bg-amber-500 hover:bg-amber-600 text-white"
								>
									Buy Metal Mint
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
								<Button variant="outline" size="lg">
									Explore Features
								</Button>
							</div>
						</div>
						<div className="relative h-[400px] w-full rounded-xl overflow-hidden border bg-gradient-to-br from-amber-900/20 to-background p-6">
							<div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-white/10"></div>
							<div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
								<div className="flex items-center justify-center h-24 w-24 rounded-full bg-amber-100 mb-6">
									<Coins className="h-12 w-12 text-amber-600" />
								</div>
								<div className="grid grid-cols-2 gap-8 w-full max-w-md">
									<div className="flex flex-col items-center">
										<div className="text-3xl font-bold text-amber-500">
											1 MMT
										</div>
										<div className="text-sm text-muted-foreground mt-1">
											Metal Mint Token
										</div>
									</div>
									<div className="flex items-center justify-center">
										<div className="text-2xl">=</div>
									</div>
									<div className="flex flex-col items-center col-start-1 col-end-3">
										<div className="text-3xl font-bold">1 gram</div>
										<div className="text-sm text-muted-foreground mt-1">
											99.99% Pure Gold
										</div>
									</div>
								</div>
								<div className="grid grid-cols-3 gap-4 w-full mt-8">
									<Card className="bg-background/50 backdrop-blur">
										<CardContent className="p-4 text-center">
											<p className="text-xs text-muted-foreground">
												Storage Fees
											</p>
											<p className="text-xl font-bold text-amber-500">0%</p>
										</CardContent>
									</Card>
									<Card className="bg-background/50 backdrop-blur">
										<CardContent className="p-4 text-center">
											<p className="text-xs text-muted-foreground">
												Transaction Speed
											</p>
											<p className="text-xl font-bold text-amber-500">2-5s</p>
										</CardContent>
									</Card>
									<Card className="bg-background/50 backdrop-blur">
										<CardContent className="p-4 text-center">
											<p className="text-xs text-muted-foreground">
												Divisibility
											</p>
											<p className="text-xl font-bold text-amber-500">0.001</p>
										</CardContent>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Key Features Section */}
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								Key Features
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								What is Metal Mint?
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Metal Mint is a digital token that represents ownership of
								physical gold. Each token is backed by 1 gram of 99.99% pure
								gold, stored in secure, insured vaults and regularly audited by
								independent third parties.
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
								<p className="text-sm text-muted-foreground">
									Every Metal Mint token is backed 1:1 by physical gold stored
									in high-security vaults, giving you true ownership of gold
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
								<p className="text-sm text-muted-foreground">
									Regular audits by trusted third parties verify that all tokens
									are fully backed by physical gold, with reports publicly
									available on the blockchain.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Zero Storage Fees
								</CardTitle>
								<DollarSign className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Unlike other gold-backed tokens, Metal Mint charges no storage
									fees, making it more cost-effective for long-term gold
									ownership.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Fast Transactions
								</CardTitle>
								<Zap className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Transfer Metal Mint tokens globally in seconds, making gold
									ownership more liquid and accessible than traditional physical
									gold.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Low Redemption Minimum
								</CardTitle>
								<Scale className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Redeem your tokens for physical gold with a minimum of just 10
									grams, significantly lower than industry standards.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Multi-Chain Support
								</CardTitle>
								<Layers className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Metal Mint operates across multiple blockchain networks,
									providing flexibility and reducing dependency on any single
									platform.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50 dark:bg-amber-950/10">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								Mechanism
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								How Metal Mint Works
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Metal Mint operates on a transparent mechanism that ensures each
								token's value is directly tied to the price of gold.
							</p>
						</div>
					</div>

					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 mt-12 items-center">
						<div className="space-y-6">
							<div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:to-amber-500/20">
								<div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 -translate-x-1/2 text-white text-xs font-bold">
									1
								</div>
								<h3 className="text-xl font-bold">Gold Acquisition</h3>
								<p className="text-muted-foreground mt-2">
									Metal Mint purchases 99.99% pure gold from certified
									refineries and mints, ensuring the highest quality gold
									backing.
								</p>
							</div>

							<div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:to-amber-500/20">
								<div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 -translate-x-1/2 text-white text-xs font-bold">
									2
								</div>
								<h3 className="text-xl font-bold">Secure Storage</h3>
								<p className="text-muted-foreground mt-2">
									The gold is stored in high-security vaults across multiple
									jurisdictions, with 24/7 surveillance and comprehensive
									insurance coverage.
								</p>
							</div>

							<div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:to-amber-500/20">
								<div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 -translate-x-1/2 text-white text-xs font-bold">
									3
								</div>
								<h3 className="text-xl font-bold">Token Issuance</h3>
								<p className="text-muted-foreground mt-2">
									For each gram of gold acquired and stored, one Metal Mint
									token (MMT) is issued on the blockchain, maintaining the 1:1
									backing ratio.
								</p>
							</div>

							<div className="relative pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:to-amber-500/20">
								<div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 -translate-x-1/2 text-white text-xs font-bold">
									4
								</div>
								<h3 className="text-xl font-bold">Regular Audits</h3>
								<p className="text-muted-foreground mt-2">
									Independent auditors verify the gold reserves quarterly, with
									audit reports published on the blockchain for complete
									transparency.
								</p>
							</div>

							<div className="relative pl-8">
								<div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 -translate-x-1/2 text-white text-xs font-bold">
									5
								</div>
								<h3 className="text-xl font-bold">Price Tracking</h3>
								<p className="text-muted-foreground mt-2">
									The value of each Metal Mint token automatically tracks the
									current market price of gold, updated in real-time.
								</p>
							</div>
						</div>

						<div className="relative rounded-xl overflow-hidden border bg-card p-6">
							<div className="space-y-6">
								<div className="space-y-2">
									<h3 className="text-xl font-bold">
										Metal Mint Token Metrics
									</h3>
									<p className="text-sm text-muted-foreground">
										Current status of the Metal Mint ecosystem
									</p>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<Card>
										<CardContent className="p-4">
											<div className="text-xs text-muted-foreground">
												Circulating Supply
											</div>
											<div className="text-2xl font-bold text-amber-500">
												2.45M
											</div>
											<div className="text-xs text-muted-foreground">
												tokens (2,450 kg gold)
											</div>
										</CardContent>
									</Card>
									<Card>
										<CardContent className="p-4">
											<div className="text-xs text-muted-foreground">
												Market Cap
											</div>
											<div className="text-2xl font-bold text-amber-500">
												$156.8M
											</div>
											<div className="text-xs text-muted-foreground">
												at current gold price
											</div>
										</CardContent>
									</Card>
								</div>

								<div className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>Token Distribution</span>
										<span>100% backed by physical gold</span>
									</div>
									<Progress
										value={100}
										className="h-2 bg-amber-100"
										indicatorClassName="bg-amber-500"
									/>
								</div>

								<div className="space-y-2">
									<h4 className="text-sm font-medium">
										Gold Storage Locations
									</h4>
									<div className="grid grid-cols-2 gap-2 text-sm">
										<div className="flex items-center space-x-2">
											<div className="h-2 w-2 rounded-full bg-amber-500"></div>
											<span>Zurich, Switzerland (40%)</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="h-2 w-2 rounded-full bg-amber-400"></div>
											<span>Singapore (25%)</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="h-2 w-2 rounded-full bg-amber-300"></div>
											<span>New York, USA (20%)</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="h-2 w-2 rounded-full bg-amber-200"></div>
											<span>Dubai, UAE (15%)</span>
										</div>
									</div>
								</div>

								<div className="flex justify-between text-sm">
									<span>Last Audit Date:</span>
									<span className="font-medium">March 15, 2025</span>
								</div>

								<Button variant="outline" size="sm" className="w-full">
									View Audit Reports
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Advantages Section */}
			<section id="advantages" className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								Advantages
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Why Choose Metal Mint?
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Metal Mint offers unique advantages over both traditional
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
										<p className="text-sm text-muted-foreground">
											Unlike volatile cryptocurrencies, Metal Mint's value is
											tied to physical gold, providing stability and protection
											against inflation.
										</p>
										<div className="mt-4 rounded-lg bg-muted p-4">
											<div className="text-xs text-muted-foreground mb-2">
												Price Volatility Comparison (30-day)
											</div>
											<div className="space-y-2">
												<div className="space-y-1">
													<div className="flex justify-between text-xs">
														<span>Bitcoin</span>
														<span>±15.8%</span>
													</div>
													<Progress
														value={15.8}
														max={20}
														className="h-1.5 bg-muted-foreground/20"
													/>
												</div>
												<div className="space-y-1">
													<div className="flex justify-between text-xs">
														<span>Ethereum</span>
														<span>±12.3%</span>
													</div>
													<Progress
														value={12.3}
														max={20}
														className="h-1.5 bg-muted-foreground/20"
													/>
												</div>
												<div className="space-y-1">
													<div className="flex justify-between text-xs">
														<span>Metal Mint</span>
														<span>±1.2%</span>
													</div>
													<Progress
														value={1.2}
														max={20}
														className="h-1.5 bg-amber-500"
													/>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Intrinsic Value</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											While many cryptocurrencies have no underlying assets,
											Metal Mint is backed by a precious metal with thousands of
											years of recognized value.
										</p>
										<div className="mt-4 flex items-center justify-center">
											<div className="relative h-40 w-40">
												<div className="absolute inset-0 flex items-center justify-center">
													<div className="h-32 w-32 rounded-full bg-amber-100 flex items-center justify-center">
														<Coins className="h-16 w-16 text-amber-500" />
													</div>
												</div>
												<div className="absolute top-0 right-0">
													<div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
														Digital Asset
													</div>
												</div>
												<div className="absolute bottom-0 left-0">
													<div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
														Physical Gold
													</div>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Energy Efficiency</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Metal Mint uses an energy-efficient blockchain, avoiding
											the massive energy consumption associated with
											proof-of-work cryptocurrencies.
										</p>
										<div className="mt-4 rounded-lg bg-muted p-4">
											<div className="text-xs text-muted-foreground mb-2">
												Energy Consumption per Transaction
											</div>
											<div className="space-y-2">
												<div className="space-y-1">
													<div className="flex justify-between text-xs">
														<span>Bitcoin</span>
														<span>~700 kWh</span>
													</div>
													<Progress
														value={100}
														className="h-1.5 bg-muted-foreground/20"
													/>
												</div>
												<div className="space-y-1">
													<div className="flex justify-between text-xs">
														<span>Ethereum</span>
														<span>~60 kWh</span>
													</div>
													<Progress
														value={8.6}
														className="h-1.5 bg-muted-foreground/20"
													/>
												</div>
												<div className="space-y-1">
													<div className="flex justify-between text-xs">
														<span>Metal Mint</span>
														<span>~0.001 kWh</span>
													</div>
													<Progress
														value={0.00014}
														className="h-1.5 bg-amber-500"
													/>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Regulatory Clarity</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											As an asset-backed token, Metal Mint operates within a
											clearer regulatory framework than many cryptocurrencies.
										</p>
										<div className="mt-4 grid grid-cols-2 gap-2">
											<div className="rounded-lg border p-3 text-center">
												<div className="text-xs text-muted-foreground mb-1">
													Metal Mint
												</div>
												<div className="text-sm font-medium">
													Asset-backed security
												</div>
											</div>
											<div className="rounded-lg border p-3 text-center">
												<div className="text-xs text-muted-foreground mb-1">
													Cryptocurrencies
												</div>
												<div className="text-sm font-medium">
													Regulatory uncertainty
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
						<TabsContent value="gold" className="mt-6">
							<div className="grid gap-6 lg:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Zero Storage Fees</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Metal Mint charges no storage fees, unlike most
											gold-backed tokens that charge annual fees of 0.25-1%.
										</p>
										<div className="mt-4 rounded-lg bg-muted p-4">
											<div className="text-xs text-muted-foreground mb-2">
												Annual Storage Fees Comparison
											</div>
											<Table>
												<TableBody>
													<TableRow>
														<TableCell className="font-medium">
															Metal Mint
														</TableCell>
														<TableCell className="text-right text-amber-500 font-bold">
															0.00%
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="font-medium">
															Competitor A
														</TableCell>
														<TableCell className="text-right">0.25%</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="font-medium">
															Competitor B
														</TableCell>
														<TableCell className="text-right">0.40%</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="font-medium">
															Competitor C
														</TableCell>
														<TableCell className="text-right">0.75%</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Lower Redemption Minimum</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Metal Mint allows redemption starting at just 10 grams,
											making physical gold more accessible to smaller investors.
										</p>
										<div className="mt-4 rounded-lg bg-muted p-4">
											<div className="text-xs text-muted-foreground mb-2">
												Minimum Redemption Comparison
											</div>
											<Table>
												<TableBody>
													<TableRow>
														<TableCell className="font-medium">
															Metal Mint
														</TableCell>
														<TableCell className="text-right text-amber-500 font-bold">
															10 grams
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="font-medium">
															Competitor A
														</TableCell>
														<TableCell className="text-right">
															100 grams
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="font-medium">
															Competitor B
														</TableCell>
														<TableCell className="text-right">
															400 grams
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="font-medium">
															Competitor C
														</TableCell>
														<TableCell className="text-right">
															1,000 grams
														</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Multi-Chain Support</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Metal Mint operates across multiple blockchain networks,
											providing flexibility and reducing dependency on any
											single platform.
										</p>
										<div className="mt-4 rounded-lg bg-muted p-4">
											<div className="text-xs text-muted-foreground mb-2">
												Blockchain Network Support
											</div>
											<div className="grid grid-cols-2 gap-2 text-sm">
												<div className="flex items-center space-x-2">
													<CheckCircle className="h-4 w-4 text-amber-500" />
													<span>Ethereum</span>
												</div>
												<div className="flex items-center space-x-2">
													<CheckCircle className="h-4 w-4 text-amber-500" />
													<span>Binance Smart Chain</span>
												</div>
												<div className="flex items-center space-x-2">
													<CheckCircle className="h-4 w-4 text-amber-500" />
													<span>Polygon</span>
												</div>
												<div className="flex items-center space-x-2">
													<CheckCircle className="h-4 w-4 text-amber-500" />
													<span>Solana</span>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle>Advanced Security</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Our multi-layered security approach for both digital
											tokens and physical gold storage exceeds industry
											standards.
										</p>
										<div className="mt-4 space-y-2">
											<div className="flex items-start space-x-2">
												<Shield className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
												<div>
													<span className="text-sm font-medium">
														Multi-signature authentication
													</span>
													<p className="text-xs text-muted-foreground">
														Requiring multiple approvals for transactions
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-2">
												<Shield className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
												<div>
													<span className="text-sm font-medium">
														Cold storage for private keys
													</span>
													<p className="text-xs text-muted-foreground">
														Keys stored offline in secure environments
													</p>
												</div>
											</div>
											<div className="flex items-start space-x-2">
												<Shield className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
												<div>
													<span className="text-sm font-medium">
														Distributed vault network
													</span>
													<p className="text-xs text-muted-foreground">
														Gold stored across multiple secure locations
													</p>
												</div>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</section>

			{/* Security Section */}
			<section
				id="security"
				className="w-full py-12 md:py-24 lg:py-32 bg-amber-50 dark:bg-amber-950/10"
			>
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								Security
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Comprehensive Security Measures
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Metal Mint implements industry-leading security measures to
								protect both the digital tokens and physical gold reserves.
							</p>
						</div>
					</div>

					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Physical Security
								</CardTitle>
								<Shield className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Gold reserves are stored in Class 3 high-security vaults with
									24/7 surveillance, armed guards, and biometric access
									controls.
								</p>
								<ul className="mt-4 space-y-2 text-sm">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>24/7 armed security personnel</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Advanced motion detection systems</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Biometric access controls</span>
									</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Insurance Coverage
								</CardTitle>
								<Shield className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									All gold holdings are fully insured against theft, damage, and
									other potential losses by Lloyd's of London and other leading
									insurance providers.
								</p>
								<ul className="mt-4 space-y-2 text-sm">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>100% insurance coverage</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Coverage during transit and storage</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Protection against natural disasters</span>
									</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Blockchain Security
								</CardTitle>
								<Lock className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Metal Mint utilizes advanced blockchain technology with
									multi-signature authentication and regular security audits.
								</p>
								<ul className="mt-4 space-y-2 text-sm">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Multi-signature transaction approval</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Regular smart contract audits</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Cold storage of private keys</span>
									</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Regular Audits
								</CardTitle>
								<CheckCircle className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Independent third-party auditors regularly verify that all
									tokens are fully backed by physical gold reserves.
								</p>
								<ul className="mt-4 space-y-2 text-sm">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Quarterly physical gold audits</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Blockchain token supply verification</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Public audit reports</span>
									</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Regulatory Compliance
								</CardTitle>
								<CheckCircle className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									Metal Mint operates in full compliance with relevant financial
									regulations and anti-money laundering requirements.
								</p>
								<ul className="mt-4 space-y-2 text-sm">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>KYC/AML procedures</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Compliance with securities laws</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Regular regulatory reporting</span>
									</li>
								</ul>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-lg font-medium">
									Wallet Security
								</CardTitle>
								<Lock className="h-5 w-5 text-amber-500" />
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">
									User wallets feature advanced encryption, two-factor
									authentication, and optional hardware wallet integration.
								</p>
								<ul className="mt-4 space-y-2 text-sm">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>End-to-end encryption</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Biometric authentication options</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-4 w-4 text-amber-500 mt-0.5" />
										<span>Hardware wallet compatibility</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* How to Use Section */}
			<section id="how-to" className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								User Guide
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								How to Use Metal Mint
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Getting started with Metal Mint is simple. Here's everything you
								need to know about acquiring, storing, and using your tokens.
							</p>
						</div>
					</div>

					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
						<Card className="md:col-span-3">
							<CardHeader>
								<CardTitle>Acquiring Metal Mint</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
									<div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
											<DollarSign className="h-6 w-6 text-amber-700" />
										</div>
										<h3 className="text-xl font-bold">Direct Purchase</h3>
										<p className="text-center text-sm text-muted-foreground">
											Buy Metal Mint directly through our platform using
											credit/debit cards or bank transfers.
										</p>
									</div>
									<div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
											<Coins className="h-6 w-6 text-amber-700" />
										</div>
										<h3 className="text-xl font-bold">
											Cryptocurrency Exchange
										</h3>
										<p className="text-center text-sm text-muted-foreground">
											Exchange other cryptocurrencies for Metal Mint on
											supported exchanges.
										</p>
									</div>
									<div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
											<BarChart3 className="h-6 w-6 text-amber-700" />
										</div>
										<h3 className="text-xl font-bold">Secondary Market</h3>
										<p className="text-center text-sm text-muted-foreground">
											Purchase Metal Mint from other users through peer-to-peer
											transactions.
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Storing Your Tokens</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Official Metal Mint Wallet (web, iOS, Android)
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Hardware wallets (Ledger, Trezor)
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Compatible third-party wallets
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Custodial storage on supported exchanges
										</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Using Metal Mint</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Hold as a store of value and inflation hedge
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Trade on supported exchanges
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Transfer to other users instantly
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Redeem for physical gold or fiat currency
										</span>
									</li>
									<li className="flex items-start space-x-2">
										<CheckCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-muted-foreground">
											Use as collateral for loans on supported platforms
										</span>
									</li>
								</ul>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Fees & Costs</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<h4 className="font-medium">Purchase Fee</h4>
										<p className="text-sm text-muted-foreground">
											0.5% of transaction value
										</p>
									</div>
									<div>
										<h4 className="font-medium">Storage Fee</h4>
										<p className="text-sm text-muted-foreground text-amber-500 font-bold">
											0.00% (No storage fees)
										</p>
									</div>
									<div>
										<h4 className="font-medium">Transfer Fee</h4>
										<p className="text-sm text-muted-foreground">
											0.1% of transaction value
										</p>
									</div>
									<div>
										<h4 className="font-medium">Redemption Fee</h4>
										<p className="text-sm text-muted-foreground">
											0.5% + shipping costs (for physical gold)
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Risks Section */}
			<section
				id="risks"
				className="w-full py-12 md:py-24 lg:py-32 bg-amber-50 dark:bg-amber-950/10"
			>
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								Risk Disclosure
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Risks & Challenges
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								While Metal Mint is designed to be secure and stable, it's
								important to understand the potential risks involved.
							</p>
						</div>
					</div>

					<div className="mx-auto max-w-4xl mt-12 border rounded-xl overflow-hidden">
						<div className="bg-amber-100 p-4 flex items-center space-x-2">
							<AlertTriangle className="h-5 w-5 text-amber-700" />
							<h3 className="font-bold">Important Risk Disclosure</h3>
						</div>
						<div className="p-6 space-y-4">
							<div className="space-y-2">
								<h4 className="font-medium">Market Risk</h4>
								<p className="text-sm text-muted-foreground">
									The price of gold can fluctuate based on market conditions,
									economic factors, and global events, which will affect the
									value of your Metal Mint holdings.
								</p>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Counterparty Risk</h4>
								<p className="text-sm text-muted-foreground">
									Metal Mint relies on custodians to securely store the physical
									gold. While we use reputable partners and maintain insurance,
									there is always some level of counterparty risk.
								</p>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Regulatory Risk</h4>
								<p className="text-sm text-muted-foreground">
									Changes in regulations regarding digital assets or gold
									ownership could impact Metal Mint's operations or value in
									certain jurisdictions.
								</p>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Technology Risk</h4>
								<p className="text-sm text-muted-foreground">
									As with any digital asset, there are inherent technology risks
									related to the blockchain, smart contracts, and wallet
									security.
								</p>
							</div>
							<div className="space-y-2">
								<h4 className="font-medium">Liquidity Risk</h4>
								<p className="text-sm text-muted-foreground">
									During periods of market stress, it may be more difficult to
									buy or sell Metal Mint at desired prices or in desired
									quantities.
								</p>
							</div>
						</div>
					</div>

					<div className="mx-auto max-w-4xl mt-8 text-center">
						<p className="text-sm text-muted-foreground">
							Metal Mint is committed to transparency and risk mitigation. We
							continuously work to address these challenges through robust
							security measures, insurance coverage, regulatory compliance, and
							technological improvements.
						</p>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id="faq" className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<div className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-sm text-amber-800">
								FAQ
							</div>
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Frequently Asked Questions
							</h2>
							<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Find answers to common questions about Metal Mint.
							</p>
						</div>
					</div>

					<div className="mx-auto max-w-4xl mt-12">
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									Is Metal Mint fully backed by physical gold?
								</AccordionTrigger>
								<AccordionContent>
									Yes, each Metal Mint token is 100% backed by physical gold
									stored in secure vaults. The gold reserves are regularly
									audited by independent third parties, with audit reports
									publicly available on our website and blockchain.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									How is the price of Metal Mint determined?
								</AccordionTrigger>
								<AccordionContent>
									The price of Metal Mint is directly tied to the current market
									price of gold. Each token represents 1 gram of 99.99% pure
									gold, so the token's value fluctuates with the gold market
									price, plus a small premium for liquidity.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									Can I redeem Metal Mint for physical gold?
								</AccordionTrigger>
								<AccordionContent>
									Yes, Metal Mint can be redeemed for physical gold. The minimum
									redemption quantity is 10 grams, and there is a redemption fee
									of 0.5% plus shipping costs. Alternatively, you can redeem for
									fiat currency at the current market value of gold.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-4">
								<AccordionTrigger>
									Where is the gold stored and is it insured?
								</AccordionTrigger>
								<AccordionContent>
									The gold backing Metal Mint is stored in high-security vaults
									in multiple jurisdictions, including Switzerland, Singapore,
									the United States, and Dubai. All gold holdings are fully
									insured against theft, damage, and other potential losses by
									Lloyd's of London and other leading insurance providers.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-5">
								<AccordionTrigger>
									What blockchain does Metal Mint use?
								</AccordionTrigger>
								<AccordionContent>
									Metal Mint operates on multiple blockchains including
									Ethereum, Binance Smart Chain, Polygon, and Solana. This
									multi-chain approach provides flexibility, reduces dependency
									on any single platform, and allows users to choose the network
									with the lowest fees and fastest transaction times.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-6">
								<AccordionTrigger>
									Are there any ongoing fees for holding Metal Mint?
								</AccordionTrigger>
								<AccordionContent>
									No, Metal Mint charges zero storage fees for holding tokens,
									regardless of how long you hold them. This is a significant
									advantage over other gold-backed tokens and traditional gold
									storage options that typically charge annual fees of 0.25-1%.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-7">
								<AccordionTrigger>
									Is Metal Mint available worldwide?
								</AccordionTrigger>
								<AccordionContent>
									Metal Mint is available in most countries, but due to varying
									regulations, availability may be limited in certain
									jurisdictions. Please check our Terms of Service for the most
									up-to-date information on supported regions.
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-8">
								<AccordionTrigger>
									How do I get started with Metal Mint?
								</AccordionTrigger>
								<AccordionContent>
									Getting started is simple. Create an account on our platform,
									complete the verification process, and you can begin
									purchasing Metal Mint using various payment methods. Download
									our wallet app to securely store and manage your tokens.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 bg-amber-500 text-white">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Ready to Get Started?
							</h2>
							<p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
								Join thousands of investors who trust Metal Mint for secure,
								convenient gold ownership.
							</p>
						</div>
						<div className="flex flex-col gap-2 min-[400px]:flex-row">
							<Button
								size="lg"
								className="bg-white text-amber-500 hover:bg-gray-100"
							>
								Buy Metal Mint
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
		</div>
	);
}
