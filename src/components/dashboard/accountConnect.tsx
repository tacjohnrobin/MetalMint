"use client";

import { useState } from "react";
import { Copy, Plus, CreditCard, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface BankCard {
	id: string;
	type: string;
	name: string;
	balance: number;
	cardNumber: string;
	accountId: string;
}

export default function BankAccountsPage() {
	const [cards, setCards] = useState<BankCard[]>([
		{
			id: "card-1",
			type: "checking",
			name: "Stripe Checking",
			balance: 1810.0,
			cardNumber: "•••• •••• •••• 7680",
			accountId: "OW1IWGFMbEp5bnRrDWo1em80eTFhbW1Y",
		},
		{
			id: "card-2",
			type: "saving",
			name: "Stripe Saving",
			balance: 2100.0,
			cardNumber: "•••• •••• •••• 1578",
			accountId: "ckdyUHYxeFdBcWZrWkt5RGxlUZTTVFRbU",
		},
	]);

	const [copiedId, setCopiedId] = useState<string | null>(null);

	const handleCopyAccountId = (id: string) => {
		navigator.clipboard.writeText(id);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	return (
		<div className="container mx-auto py-8 px-4 md:px-6">
			<h1 className="text-3xl font-bold mb-2">My Bank Accounts</h1>
			<p className="text-gray-500 mb-8">
				Effortlessly Manage Your Banking Activities
			</p>

			<div className="mb-8">
				<div className=" md:flex items-center justify-between mb-4">
					<h2 className="text-xl font-semibold">Your cards</h2>
					<Button
						variant="outline"
						className="hidden md:flex items-center gap-2"
					>
						<Plus className="h-4 w-4" />
						Connect Account
					</Button>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cards.map((card) => (
						<div key={card.id} className="space-y-2">
							<Card className="relative overflow-hidden p-6 bg-emerald-500 text-white rounded-xl">
								<div className="flex flex-col h-full justify-between">
									<div>
										<h3 className="font-medium">{card.name}</h3>
										<p className="text-sm font-bold font-times-new-roman">
											${card.balance.toFixed(2)}
										</p>
									</div>

									<div className="flex justify-between items-end mt-8">
										<div>
											<div className="text-xs mb-1">••/••</div>
											<div>{card.cardNumber}</div>
										</div>
										<div className="flex flex-col items-end">
											<div className="w-8 h-8 mb-2">
												<svg viewBox="0 0 24 24" className="w-full h-full">
													<path
														fill="currentColor"
														d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"
														opacity="0.4"
													/>
													<path
														fill="currentColor"
														d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"
														opacity="0.7"
													/>
													<path
														fill="currentColor"
														d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
													/>
												</svg>
											</div>
											<div className="flex items-center justify-center w-10 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md">
												<Image
													src="/icons/mastercard.svg"
													width={32}
													height={32}
													alt="mastercard"
												/>
											</div>
										</div>
									</div>
								</div>

								{/* Wave pattern background */}
								<div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
									<svg
										viewBox="0 0 100 300"
										preserveAspectRatio="none"
										className="h-full w-full"
									>
										<path
											d="M0,0 L100,0 L100,300 L0,300 Z"
											fill="none"
											stroke="white"
											strokeWidth="12"
											strokeDasharray="16 32"
											strokeLinecap="round"
											strokeLinejoin="round"
											transform="translate(0, 0)"
										/>
										<path
											d="M0,50 Q25,45 50,50 T100,50 V300 H0 Z"
											fill="white"
											fillOpacity="0.1"
										/>
										<path
											d="M0,100 Q25,95 50,100 T100,100 V300 H0 Z"
											fill="white"
											fillOpacity="0.1"
										/>
										<path
											d="M0,150 Q25,145 50,150 T100,150 V300 H0 Z"
											fill="white"
											fillOpacity="0.1"
										/>
									</svg>
								</div>
							</Card>

							<div className="flex items-center justify-between text-sm text-gray-500">
								<div className="truncate max-w-[180px]">{card.accountId}</div>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8"
												onClick={() => handleCopyAccountId(card.accountId)}
											>
												{copiedId === card.accountId ? (
													<CheckCircle className="h-4 w-4 text-green-500" />
												) : (
													<Copy className="h-4 w-4" />
												)}
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>
												{copiedId === card.accountId
													? "Copied!"
													: "Copy account ID"}
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div className="md:hidden w-full flex justify-center  items-center pt-6">
								<Button variant="outline" className="  gap-2">
									<Plus className="h-4 w-4" />
									Connect Account
								</Button>
							</div>
						</div>
					))}

					{/* Connect new account card 
					<Card className="flex flex-col items-center justify-center p-6 h-[200px] border-dashed cursor-pointer hover:bg-gray-50 transition-colors">
						<div className="rounded-full bg-blue-100 p-3 mb-3">
							<CreditCard className="h-6 w-6 text-blue-500" />
						</div>
						<p className="font-medium text-gray-900">Connect New Account</p>
						<p className="text-sm text-gray-500 text-center mt-1">
							Link your bank account or card
						</p>
					</Card>*/}
				</div>
			</div>
		</div>
	);
}
