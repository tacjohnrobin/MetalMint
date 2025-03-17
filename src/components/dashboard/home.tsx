import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TokenPriceCard } from "./tokenPriceCard";
import { VerificationAlert } from "./verificationAlert";

export default function Home() {
	return (
		<div className="min-h-screen  ">
			<div className="mx-auto max-w-5xl">
				<VerificationAlert />
				<h1 className="text-2xl font-semibold text-gray-900 mb-6">
					Good Evening, <span className="text-emerald-700">John</span>
				</h1>
				{/* Portfolio Card */}
				<div className="mb-6 overflow-hidden rounded-xl bg-emerald-600 shadow-md">
					<div className="relative flex items-center justify-between p-8">
						<div className="space-y-4 ">
							<h2 className="text-sm font-medium text-white">
								Your MetalMint Portfolio
							</h2>
							<p className="mt-1 text-5xl font-medium text-white">$0</p>
							<Button className="mt-4 bg-white text-gray-600 hover:bg-gray-100 rounded-3xl hover:text-emerald-700">
								Connect Account
							</Button>
						</div>
						<div className="relative h-32 w-40">
							<Image
								src="/placeholder.svg?height=120&width=160"
								alt="Gold liquid asset graphic"
								width={160}
								height={120}
								className="object-contain"
							/>
						</div>
					</div>
				</div>

				{/* Position Section */}
				<div className="mb-4 mt-12">
					<h2 className="text-xl font-bold text-gray-900">
						Open MetalMint Position
					</h2>
					<p className="text-sm text-gray-600">
						Create a new position by performing actions on AURUS
					</p>
				</div>

				{/* Action Cards */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{/* Stake Card */}
					<div className="rounded-xl bg-white p-6 shadow-md">
						<div className="mb-8 flex items-center ">
							<div className="flex border border-gray-100 rounded-xl px-2">
								<div className="mr-2 flex h-6 w-6 items-center justify-center ">
									<span className="text-yellow-500">⭐</span>
								</div>
								<span className="font-medium text-gray-900">Stake</span>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-bold text-gray-900 max-w-[300px]">
									Grow your assets by staking in $USXW
								</h3>
								<p className="mt-2 text-sm text-gray-600 max-w-[320px]">
									Get up to{" "}
									<span className="font-medium text-yellow-600">14% APR</span>{" "}
									in gold and silver, along with $AURUS eligibility
								</p>
							</div>
							<div className="relative h-24 w-24">
								<Image
									src="/placeholder.svg?height=100&width=100"
									alt="Staking icon"
									width={100}
									height={100}
									className="object-contain"
								/>
							</div>
						</div>
					</div>

					{/* Money Market Card */}
					<div className="rounded-xl bg-white p-6 shadow-md">
						<div className="mb-4 flex items-center">
							<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
								<span className="text-yellow-500">🪙</span>
							</div>
							<span className="font-medium text-gray-900">Money Market</span>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-lg font-bold text-gray-900">
									Earn interest and borrow against your assets
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									Low borrow interest{" "}
									<span className="font-medium text-yellow-600">~ 4.5%</span>
								</p>
							</div>
							<div className="relative h-24 w-24">
								<Image
									src="/placeholder.svg?height=100&width=100"
									alt="Money market icon"
									width={100}
									height={100}
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="grid col-span-2 mt-12">
					<div className="mb-4 ">
						<h2 className="text-xl font-bold text-gray-900">MetalMint</h2>
						<p className="text-sm text-gray-600">
							Asset-backed token representing ownership of physical precious
							metals
						</p>
					</div>

					{/* Token Price Cards */}
					<div className="mb-4 grid grid-cols- gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
						<TokenPriceCard
							name="MetalMint"
							symbol="MMT"
							price="$127.45"
							change="+2.15%"
							iconBg="bg-gray-800"
							iconText="M"
						/>
						<TokenPriceCard
							name="Litecoin"
							symbol="LTC"
							price="$93.47"
							change="+3.30%"
							iconBg="bg-blue-600"
							iconText="L"
						/>
						<TokenPriceCard
							name="Gold"
							symbol="XAU"
							price="$2,345.67"
							change="+0.75%"
							iconBg="bg-yellow-600"
							iconText="G"
						/>
						<TokenPriceCard
							name="Silver"
							symbol="XAG"
							price="$28.92"
							change="-0.45%"
							iconBg="bg-gray-400"
							iconText="S"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
