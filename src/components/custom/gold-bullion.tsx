import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function GoldDashboard() {
	return (
		<div className="w-full max-w-6xl">
			{/* Header Section */}
			<div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-4">
					<div className="relative h-16 w-16 overflow-hidden rounded-full bg-gold/50">
						<div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white">
							K
						</div>
					</div>
					<div>
						<div className="text-sm font-medium text-gray-400">
							METALMINT GOLD
						</div>
						<div className="text-3xl font-bold text-white">usxw</div>
					</div>
				</div>

				<div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
					<Button className="bg-blue-600 text-white hover:bg-blue-700">
						Buy Gold
					</Button>
					<Button
						variant="outline"
						className="border-gray-600 text-gray-300 hover:bg-gray-800"
					>
						Transaction explorer
					</Button>
				</div>
			</div>

			{/* Main Grid */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Circulating Supply */}
				<Card className="col-span-1 flex flex-col justify-between bg-[#0d1726] p-6 text-white md:col-span-2 lg:col-span-1">
					<div className="text-sm font-medium text-gray-400">
						Circulating supply
					</div>
					<div>
						<div className="text-4xl font-bold text-white">$133.12m</div>
						<div className="text-sm text-gray-400">1.43m grams</div>
					</div>
				</Card>

				{/* Conversion Rate */}
				<Card className="flex flex-col items-center justify-center bg-[#0d1726] p-6 text-white">
					<div className="flex w-full items-center justify-between gap-4">
						<div className="flex flex-col items-center">
							<div className="relative mb-2 h-10 w-10 overflow-hidden rounded-full bg-[#0d1726]">
								<div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white">
									K
								</div>
							</div>
							<div className="text-2xl font-bold">1</div>
							<div className="text-sm text-gray-400">USXW</div>
						</div>

						<div className="text-2xl font-bold text-blue-500">=</div>

						<div className="flex flex-col items-center">
							<div className="relative mb-2 h-10 w-10 overflow-hidden rounded-full bg-[#f5d76e]">
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="h-6 w-6 rounded-full bg-[#f5d76e]"></div>
								</div>
							</div>
							<div className="text-2xl font-bold">1</div>
							<div className="text-sm text-gray-400">gram of gold</div>
						</div>
					</div>
				</Card>

				{/* Storage Fees */}
				<Card className="flex flex-col items-end justify-between bg-[#0d1726] p-6 text-white">
					<div className="h-2 w-2 rounded-full bg-blue-500"></div>
					<div className="flex flex-col items-end">
						<div className="text-4xl font-bold">$0</div>
						<div className="text-sm text-gray-400">Storage fees</div>
					</div>
				</Card>

				{/* Redemption */}
				<Card className="flex flex-col items-center justify-between bg-[#0d1726] p-6 text-white">
					<div className="text-sm font-medium text-gray-400">Redemption</div>
					<div className="flex flex-col items-center">
						<div className="mb-2 text-blue-500">⋮</div>
						<div className="text-4xl font-bold text-[#8a7a4d]">100</div>
						<div className="text-sm text-gray-400">grams min.</div>
					</div>
				</Card>

				{/* Transaction Speed */}
				<Card className="flex flex-col items-center justify-between bg-[#0d1726] p-6 text-white">
					<div className="text-sm font-medium text-gray-400">
						Transaction Speed
					</div>
					<div className="flex flex-col items-center">
						<Zap className="mb-2 h-8 w-8 text-blue-500" />
						<div className="text-4xl font-bold">2-3</div>
						<div className="text-sm text-gray-400">Seconds</div>
					</div>
				</Card>

				{/* Divisibility */}
				<Card className="flex flex-col items-center justify-between bg-[#0d1726] p-6 text-white">
					<div className="text-sm font-medium text-gray-400">Divisibility</div>
					<div className="flex flex-col items-center">
						<div className="mb-2 text-blue-500">⁄</div>
						<div className="flex items-baseline">
							<span className="text-4xl font-bold text-[#8a7a4d]">0</span>
							<span className="text-xl font-bold text-gray-500">.00001</span>
						</div>
						<div className="text-sm text-gray-400">USXW</div>
					</div>
				</Card>
			</div>
		</div>
	);
}
