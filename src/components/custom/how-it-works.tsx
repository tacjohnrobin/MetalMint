import {
	ShieldCheck,
	Building2,
	CreditCard,
	ArrowDownToLine,
	ClipboardCheck,
	TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksSection() {
	const features = [
		{
			icon: <CreditCard className="h-8 w-8 text-blue-500" />,
			title: "Gold Acquisition & Storage",
			description:
				"Physical gold is purchased and stored in secure, insured vaults.",
		},
		{
			icon: <Building2 className="h-8 w-8 text-blue-500" />,
			title: "Token Issuance",
			description:
				"Tokens are issued on the blockchain, each representing 1 gram of gold.",
		},
		{
			icon: <ShieldCheck className="h-8 w-8 text-blue-500" />,
			title: "Regular Audits",
			description:
				"Independent auditors verify that all tokens are fully backed by physical gold.",
		},
		{
			icon: <TrendingUp className="h-8 w-8 text-blue-500" />,
			title: "Price Tracking",
			description:
				"Token value automatically tracks the current market price of gold.",
		},
		{
			icon: <ArrowDownToLine className="h-8 w-8 text-blue-500" />,
			title: "Easy Redemption",
			description:
				"Redeem your tokens for physical gold with our simple redemption process.",
		},
		{
			icon: <ClipboardCheck className="h-8 w-8 text-blue-500" />,
			title: "Full Transparency",
			description:
				"Complete transparency with regular reporting and blockchain verification.",
		},
	];

	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-amber-50">
			<div className="container px-4 md:px-6 max-w-7xl mx-auto">
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
						We are not a bank. We&apos;re better.
					</h2>
					<p className="max-w-[900px] mx-auto text-gray-600 text-lg">
						GoldToken operates on a simple principle: each token represents
						ownership of physical gold, with a transparent mechanism ensuring
						its value is directly tied to gold prices.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
					{features.map((feature, index) => (
						<div key={index} className="flex flex-col items-center text-center">
							<div className="mb-4 rounded-full bg-amber-100 p-3 w-16 h-16 flex items-center justify-center">
								{feature.icon}
							</div>
							<h3 className="text-xl font-bold mb-2">{feature.title}</h3>
							<p className="text-gray-600">{feature.description}</p>
						</div>
					))}
				</div>

				<div className="mt-16 flex justify-center gap-4">
					<Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
						Sign up
					</Button>
					<Button
						variant="outline"
						className="border-blue-600 text-blue-600 hover:bg-blue-50"
					>
						Trust and Security
					</Button>
				</div>
			</div>
		</section>
	);
}
