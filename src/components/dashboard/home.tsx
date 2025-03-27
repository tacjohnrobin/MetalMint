"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { VerificationAlert } from "./verificationAlert";
import { getCurrentUser } from "@/lib/authApi"; // Import your auth API
import { useEffect, useState } from "react";

import CryptoCarousel from "./carousel-component";

export default function Home() {
	const [user, setUser] = useState<{ firstName: string } | null>(null);

	useEffect(() => {
		async function fetchUser() {
			const currentUser = await getCurrentUser();
			if (currentUser) {
				setUser(currentUser);
			}
		}
		fetchUser();
	}, []);

	return (
		<div className="min-h-screen">
			<div className="mx-auto max-w-5xl">
				<VerificationAlert />
				<h1 className="text-2xl font-semibold text-gray-900 mb-6">
					Good Evening,{" "}
					<span className="text-emerald-700">
						{user ? user.firstName : "User"}
					</span>
				</h1>
				{/* Portfolio Card */}
				<div className="mb-6 overflow-hidden rounded-xl bg-gold shadow-xl">
					<div className="relative flex items-center justify-between h-full m-0 p-0 ">
						<div className="space-y-4 text-center md:text-left w-full p-8">
							<h2 className="text-lg font-medium text-white">
								Your MetalMint Portfolio
							</h2>
							<p className="mt-1 text-4xl font-medium text-white">$6227.98</p>
							<p className="mt-1 text-sm font-medium text-white">
								~ 67.4670 USXW
							</p>
							<Button className="mt-4 bg-white py-6 px-10 text-gray-600 hover:bg-gray-100 rounded-3xl hover:text-emerald-700 text-lg">
								swap
							</Button>
						</div>
						<div className="relative h-400 w-400 hidden md:flex right-15">
							<Image
								src="/image/gold-hero.webp?height=120&width=160"
								alt="Gold liquid asset graphic"
								width={1000}
								height={1000}
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
					<div className="rounded-xl bg-white p-6 overflow-hidden shadow-lg">
						<div className="mb-8 flex items-center ">
							<div className="flex border border-gray-100 rounded-xl px-2">
								<div className="mr-2 flex h-6 w-6 items-center justify-center ">
									<span className="text-yellow-500">⭐</span>
								</div>
								<span className="font-medium text-gray-900">Stake</span>
							</div>
						</div>

						<div className="flex items-end justify-between ">
							<div>
								<h3 className="text-xl font-bold text-gray-900 max-w-[300px]">
									Grow your assets by staking in $USXW
								</h3>
								<p className="mt-2 text-sm text-gray-600 max-w-[320px]">
									Get up to{" "}
									<span className="font-medium text-yellow-600">300% APR</span>{" "}
									in gold, along with $METALMINT eligibility
								</p>
							</div>
							<div className="relative h-24 w-24  lg:h-36 lg:w-36 left-1 ">
								<Image
									src="/image/mint.png?height=100&width=100"
									alt="Staking icon"
									width={200}
									height={200}
									className="object-contain lg:w-[200px] lg:h-[220px]"
								/>
							</div>
						</div>
					</div>

					{/* Money Market Card */}
					<div className="rounded-xl bg-white pl-6 py-6 shadow-lg">
						<div className="mb-4 flex items-center">
							<div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
								<span className="text-yellow-500">🪙</span>
							</div>
							<span className="font-medium text-gray-900">Money Market</span>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<h3 className="text-xl font-bold text-gray-900 max-w-[290px]">
									Earn interest and borrow against your assets
								</h3>
								<p className="mt-2 text-sm text-gray-600">
									Low borrow interest{" "}
									<span className="font-medium text-yellow-600">~ 4.5%</span>
								</p>
							</div>
							<div className="relative h-36 w-36 lg:h-48 lg:w-48 left-[1%]">
								<Image
									src="/image/gold-coin.png?height=200&width=200"
									alt="Money market icon"
									width={200}
									height={200}
									className="object-contain lg:w-[200px] lg:h-[220px]"
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
					<div className="mb-4 ">
						<CryptoCarousel />
					</div>
				</div>
			</div>
		</div>
	);
}
