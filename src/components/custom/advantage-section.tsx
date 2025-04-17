import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AdvantagesSection() {
	return (
		<section
			id="advantages"
			className="w-full py-16 md:py-24 lg:py-32  to-white"
		>
			<div className="container px-4 md:px-6 mx-auto">
				<div className="flex flex-col items-center justify-center space-y-6 text-center">
					<div className="space-y-3">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-950">
							Why Choose MetalMint Gold?
						</h2>
						<p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto mt-2">
							MetalMint offers unique advantages over both traditional
							cryptocurrencies and other gold-backed tokens.
						</p>
					</div>
				</div>

				<Tabs defaultValue="crypto" className="mx-auto max-w-4xl mt-14">
					<TabsList className="grid w-full grid-cols-2 gap-4 p-1 bg-white rounded-xl">
						<TabsTrigger
							value="crypto"
							className="py-3 px-4 rounded-lg data-[state=active]:bg-emerald-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
						>
							vs. Traditional Cryptocurrencies
						</TabsTrigger>
						<TabsTrigger
							value="gold"
							className="py-3 px-4 rounded-lg data-[state=active]:bg-emerald-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
						>
							vs. Other Gold-Backed Tokens
						</TabsTrigger>
					</TabsList>

					<TabsContent value="crypto" className="mt-8">
						<div className="grid gap-6 lg:grid-cols-2">
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">Stability</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										Unlike volatile cryptocurrencies, MetalMint's value is tied
										to physical gold, providing stability and protection against
										inflation.
									</p>
								</CardContent>
							</Card>
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">
										Intrinsic Value
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										While many cryptocurrencies have no underlying assets,
										MetalMint is backed by a precious metal with thousands of
										years of recognized value.
									</p>
								</CardContent>
							</Card>
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">
										Energy Efficiency
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										MetalMint uses an energy-efficient blockchain, avoiding the
										massive energy consumption associated with proof-of-work
										cryptocurrencies.
									</p>
								</CardContent>
							</Card>
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">
										Regulatory Clarity
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										As an asset-backed token, MetalMint operates within a
										clearer regulatory framework than many cryptocurrencies.
									</p>
								</CardContent>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value="gold" className="mt-8">
						<div className="grid gap-6 lg:grid-cols-2">
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">
										Superior Auditing
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										MetalMint implements more frequent and rigorous third-party
										audits than competitors, ensuring complete transparency.
									</p>
								</CardContent>
							</Card>
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">Lower Fees</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										Our streamlined operations allow us to offer lower
										transaction and storage fees compared to other gold-backed
										tokens.
									</p>
								</CardContent>
							</Card>
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">
										Redemption Options
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										MetalMint offers flexible redemption options, including
										physical delivery of gold or conversion to fiat currency.
									</p>
								</CardContent>
							</Card>
							<Card className="border border-emerald-100 shadow-sm hover:shadow-md transition-shadow">
								<CardHeader className="pb-2">
									<CardTitle className="text-emerald-800">
										Advanced Security
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-600">
										Our multi-layered security approach for both digital tokens
										and physical gold storage exceeds industry standards.
									</p>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
