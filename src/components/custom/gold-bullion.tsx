import Image from "next/image";
import Link from "next/link";
import { UserRound, Zap } from "lucide-react";

export default function GoldDashboard() {
	return (
		<main className=" w-full flex min-h-[700px] items-center justify-center bg-gradient-to-br from-emerald-950 to-emerald-900 p-4 font-sans text-white">
			<div className=" max-w-7xl">
				<div className="grid grid-cols-12 gap-4">
					{/* Logo and Title Section */}
					<div className="col-span-12 md:col-span-4 flex items-center gap-4">
						<div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
							<Image
								src="/icons/favi.svg"
								width={36}
								height={36}
								alt="Gold coin"
							/>
						</div>
						<div>
							<div className="text-emerald-300 text-sm font-medium tracking-wider">
								METALMINT GOLD
							</div>
							<div className="text-4xl font-bold">USXW</div>
						</div>
					</div>
					<div className=" md:hidden col-span-12 md:col-span-4 mt-4">
						<div className="text-sm text-emerald-300 tracking-wider">
							Circulating supply
						</div>
						<div className="text-5xl font-bold mt-2 bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">
							$133.12m
						</div>
						<div className="text-emerald-300 mt-1">1.43m grams</div>

						<div className="mt-8 flex gap-4  ">
							<Link
								href="#"
								className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-900/50"
							>
								Buy Gold
							</Link>
							<Link
								href="#"
								className="px-6 py-3 bg-emerald-800/40 backdrop-blur-sm text-white font-medium rounded-lg border border-emerald-700/50 hover:bg-emerald-800/60 transition-all duration-300 shadow-lg"
							>
								Transaction explorer
							</Link>
						</div>
					</div>

					{/* Equation Section */}
					<div className="col-span-12 md:col-span-5 bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center gap-4 border border-emerald-800/50 shadow-lg">
						<div className="flex items-center">
							<div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mr-2 shadow-md">
								<span className="text-lg font-bold text-white">M</span>
							</div>
							<div>
								<div className="text-3xl font-bold">1</div>
								<div className="text-sm text-emerald-200">USXW</div>
							</div>
						</div>
						<div className="text-3xl text-emerald-200">=</div>
						<div className="flex items-center">
							<div className="h-10 w-10 rounded-full mr-2 shadow-md overflow-hidden">
								<Image
									src="/image/mcoin.png?height=40&width=40"
									width={40}
									height={40}
									alt="Gold coin"
									className="rounded-full"
								/>
							</div>
							<div>
								<div className="text-3xl font-bold">1</div>
								<div className="text-sm text-emerald-200">gram of gold</div>
							</div>
						</div>
					</div>

					{/* Storage Fees Section */}
					<div className="col-span-12 md:col-span-3 bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center relative border border-emerald-800/50 shadow-lg">
						<div className="absolute top-4 right-4">
							<div className="h-8 w-8 rounded-full bg-emerald-800/70 flex items-center justify-center shadow-md">
								<UserRound className="h-5 w-5 text-emerald-300" />
							</div>
						</div>
						<div className="text-5xl font-bold">$0</div>
						<div className="text-sm mt-1 text-emerald-200">Storage fees</div>
					</div>

					{/* Circulating Supply Section */}
					<div className="hidden md:grid col-span-12 md:col-span-4 mt-4">
						<div className="text-sm text-emerald-300 tracking-wider">
							Circulating supply
						</div>
						<div className="text-5xl font-bold mt-2 bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent">
							$133.12m
						</div>
						<div className="text-emerald-300 mt-1">1.43m grams</div>

						<div className="mt-8 flex gap-4  ">
							<Link
								href="#"
								className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-900/50"
							>
								Buy Gold
							</Link>
							<Link
								href="#"
								className="px-6 py-3 bg-emerald-800/40 backdrop-blur-sm text-white font-medium rounded-lg border border-emerald-700/50 hover:bg-emerald-800/60 transition-all duration-300 shadow-lg"
							>
								Transaction explorer
							</Link>
						</div>
					</div>

					{/* Redemption Section */}
					<div className="col-span-12 md:col-span-3 bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 flex flex-col h-full border border-emerald-800/50 shadow-lg">
						<div className="text-sm mb-auto text-emerald-300 tracking-wider">
							Redemption
						</div>
						<div className="flex items-center justify-center flex-col h-full">
							<div className="bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent text-5xl font-bold">
								100
							</div>
							<div className="text-sm text-emerald-300">grams min.</div>
						</div>
					</div>

					{/* Transaction Speed Section */}
					<div className="col-span-12 md:col-span-2 bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 flex flex-col h-full border border-emerald-800/50 shadow-lg">
						<div className="text-sm mb-auto text-emerald-300 tracking-wider">
							Transaction Speed
						</div>
						<div className="flex items-center justify-center flex-col h-full">
							<div className="rounded-full bg-emerald-800/70 p-2 mb-2">
								<Zap className="h-8 w-8 text-emerald-300" />
							</div>
							<div className="text-4xl font-bold">2-3</div>
							<div className="text-sm text-emerald-300">Seconds</div>
						</div>
					</div>

					{/* Divisibility Section */}
					<div className="col-span-12 md:col-span-3 bg-emerald-900/40 backdrop-blur-sm rounded-xl p-6 flex flex-col h-full border border-emerald-800/50 shadow-lg">
						<div className="text-sm mb-auto text-emerald-300 tracking-wider">
							Divisibility
						</div>
						<div className="flex items-center justify-center flex-col h-full">
							<div className="flex items-baseline">
								<span className="bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent text-5xl font-bold">
									0
								</span>
								<span className="bg-gradient-to-r from-emerald-300 to-emerald-100 bg-clip-text text-transparent text-3xl font-bold">
									.00001
								</span>
							</div>
							<div className="text-sm text-emerald-300">USXW</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
