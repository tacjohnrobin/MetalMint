"use client";

import { useState } from "react";
import { Coins, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const goldSymbols = [
	{ id: "XAU", name: "Gold", icon: Coins, color: "bg-amber-700", active: true },
	{ id: "GOLD", name: "Gold Futures", icon: Coins, color: "bg-amber-600" },
	{ id: "GC", name: "Gold Contracts", icon: Coins, color: "bg-amber-500" },
	{ id: "GLD", name: "Gold ETF", icon: Coins, color: "bg-amber-400" },
	{ id: "IAU", name: "iShares Gold", icon: Coins, color: "bg-amber-300" },
	{ id: "PHYS", name: "Physical Gold", icon: Coins, color: "bg-yellow-500" },
	{ id: "SGOL", name: "Aberdeen Gold", icon: Coins, color: "bg-yellow-600" },
	{ id: "AAAU", name: "Perth Mint Gold", icon: Coins, color: "bg-yellow-700" },
];

export function GoldSymbolsList() {
	const [activeSymbol, setActiveSymbol] = useState("XAU");

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-2">
			<div className="flex items-center space-x-2 overflow-x-auto pb-2">
				{goldSymbols.map((symbol) => {
					const isActive = activeSymbol === symbol.id;
					const Icon = symbol.icon;

					return (
						<Button
							key={symbol.id}
							variant="ghost"
							className={cn(
								"flex items-center space-x-2 rounded-full px-3 py-1",
								isActive && "bg-gray-100",
							)}
							onClick={() => setActiveSymbol(symbol.id)}
						>
							<div
								className={cn(
									"h-6 w-6 rounded-full flex items-center justify-center",
									symbol.color,
								)}
							>
								<Icon className="h-3 w-3 text-white" />
							</div>
							<span className="font-medium">{symbol.id}</span>
						</Button>
					);
				})}
				<Button variant="ghost" size="icon" className="rounded-full">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
