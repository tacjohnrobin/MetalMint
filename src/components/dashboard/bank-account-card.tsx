"use client";

import { useState } from "react";
import { Copy, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface BankAccountCardProps {
	name: string;
	balance: number;
	cardNumber: string;
	accountId: string;
}

export function BankAccountCard({
	name,
	balance,
	cardNumber,
	accountId,
}: BankAccountCardProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(accountId);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="space-y-2">
			<Card className="relative overflow-hidden p-6 bg-blue-500 text-white rounded-xl">
				<div className="flex flex-col h-full justify-between">
					<div>
						<h3 className="font-medium">{name}</h3>
						<p className="text-xl font-bold">${balance.toFixed(2)}</p>
					</div>

					<div className="flex justify-between items-end mt-8">
						<div>
							<div className="text-xs mb-1">••/••</div>
							<div>{cardNumber}</div>
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
								<div className="w-4 h-4 bg-white rounded-full opacity-80"></div>
								<div className="w-4 h-4 bg-white rounded-full opacity-80 -ml-2"></div>
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
				<div className="truncate max-w-[180px]">{accountId}</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={handleCopy}
							>
								{copied ? (
									<CheckCircle className="h-4 w-4 text-green-500" />
								) : (
									<Copy className="h-4 w-4" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{copied ? "Copied!" : "Copy account ID"}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
