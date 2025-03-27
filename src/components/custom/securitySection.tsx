import Image from "next/image";
import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecuritySection() {
	return (
		<div className="w-full  min-h-screen">
			<div className="max-w-6xl mx-auto px-4 py-16">
				<div className="grid lg:grid-cols-2 gap-12 items-start">
					<div className="space-y-12">
						<div className="space-y-4">
							<h1 className="text-6xl font-bold tracking-tight text-slate-900">
								Your money is safe with us
							</h1>
							<p className="text-slate-600 max-w-xl">
								You trust us with your investments and we take that very
								seriously. We are committed to protecting your account with the
								highest standards of security available.
							</p>
						</div>

						<div className="grid sm:grid-cols-2 gap-8">
							{securityFeatures.map((feature, index) => (
								<div key={index} className="space-y-3">
									<div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-100">
										<Building2 className="h-5 w-5 text-emerald-700" />
									</div>
									<h3 className="font-semibold text-slate-900">
										{feature.title}
									</h3>
									<p className="text-sm text-slate-600 leading-relaxed">
										{feature.description}
									</p>
								</div>
							))}
						</div>

						<Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 ">
							Start investing
						</Button>
					</div>

					<div className="hidden md:flex relative lg:ml-auto items-center justify-center pt-36">
						<Image
							src="/image/shield.svg"
							alt="Security illustration"
							width={700}
							height={700}
							className="w-full max-w-xl mx-auto"
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

const securityFeatures = [
	{
		title: "Bank Level Security",
		description:
			"We use state-of-the-art data encryption when handling your financial information and two-factor authentication (2FA) protection. We're backed by top financial market operators and we not only meet traditional banking security standards, we exceed them.",
	},
	{
		title: "Secure Payments",
		description:
			"Our payment processor Flutterwave is PADSS & PCIDSS compliant satisfying the highest level of Security Audit available.",
	},
	{
		title: "Covered by NG & US SEC",
		description:
			"Trading accounts are held by our partners, a firm duly registered by the Securities and Exchange Commission in Nigeria and in the US",
	},
	{
		title: "SIPC Insured",
		description:
			"Your US stocks portfolio is insured by the United States SIPC up to $500,000.",
	},
];
