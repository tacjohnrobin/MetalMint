"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { BarChart3, DollarSign, TrendingUp } from "lucide-react";
import Image from "next/image";

const tabContent = [
	{
		id: "investment",
		title: "Investment Plans",
		content: {
			heading: "Investment Plans for Everyone",
			description:
				"Start with as little as $500 or scale up to $25,000. Whether you're new to investing or a seasoned pro, our tiered plans help you achieve your financial goals with ease.",
			features: ["Live Charts", "Secure Trading", "Explore Tools"],
			cta: "Start Investing",
			image: {
				src: "/image/handgold.png",
				alt: "Investment plans dashboard",
			},
		},
	},
	{
		id: "earnings",
		title: "Daily Earnings",
		content: {
			heading: "Daily Earnings, Just for You",
			description:
				"Receive consistent daily payouts in USX W, our secure internal token (1:1 USD value). Watch your earnings grow in real-time and reinvest to maximize your profits effortlessly.",
			features: [],
			cta: "Start Investing",
			image: {
				src: "/image/slide2.png",
				alt: "Daily earnings chart",
			},
		},
	},
	{
		id: "growth",
		title: "Growth",
		content: {
			heading: "Grow Your Wealth with Confidence",
			description:
				"Enjoy a fixed 300% return over 1050 days. Our investment model ensures long-term gains with minimal risk, making it perfect for those seeking financial growth and security.",
			features: [],
			cta: "Start Investing",
			image: {
				src: "/image/coins (2).png",
				alt: "Growth projection graph",
			},
		},
	},
];

const SliderTabs = () => {
	const [activeTab, setActiveTab] = useState("investment");

	return (
		<section className="py-12 w-full max-w-7xl mx-auto">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter text-center md:text-4xl">
					Explore Our Financial Tools
				</h2>
				<p className="mx-auto max-w-[700px] text-muted-foreground text-center mt-4">
					Unlock your financial potential with our innovative tools.
				</p>

				{/* Mobile view - stacked layout */}
				<div className="flex flex-col lg:hidden mt-8 space-y-8">
					<div className="flex justify-center overflow-x-auto pb-4 no-scrollbar">
						<div className="flex space-x-2">
							{tabContent.map((tab) => (
								<Button
									key={tab.id}
									variant={activeTab === tab.id ? "default" : "secondary"}
									onClick={() => setActiveTab(tab.id)}
									className={cn(
										"flex items-center whitespace-nowrap px-3 py-2",
										activeTab === tab.id
											? "bg-emerald-700 text-primary-foreground rounded-full"
											: "",
									)}
									size="sm"
								>
									{tab.icon}
									<span>{tab.title}</span>
								</Button>
							))}
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						key={`image-${activeTab}`}
						className="w-full flex justify-center px-4"
					>
						<div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
							<Image
								src={
									tabContent.find((tab) => tab.id === activeTab)?.content.image
										?.src || "/image/mint.png"
								}
								alt={
									tabContent.find((tab) => tab.id === activeTab)?.content.image
										?.alt || "Financial dashboard"
								}
								fill
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
								priority
							/>
						</div>
					</motion.div>

					<Card className="border-none shadow-none">
						<CardHeader className="px-4 pb-2">
							<CardTitle className="text-2xl">
								{
									tabContent.find((tab) => tab.id === activeTab)?.content
										.heading
								}
							</CardTitle>
							<CardDescription className="text-sm mt-2">
								{
									tabContent.find((tab) => tab.id === activeTab)?.content
										.description
								}
							</CardDescription>
						</CardHeader>
						<CardContent className="px-4 py-2">
							{tabContent.find((tab) => tab.id === activeTab)?.content.features
								.length > 0 && (
								<ul className="list-disc pl-5 space-y-1">
									{tabContent
										.find((tab) => tab.id === activeTab)
										?.content.features.map((feature, index) => (
											<li key={index} className="text-sm">
												{feature}
											</li>
										))}
								</ul>
							)}
						</CardContent>
						<CardFooter className="px-4 pt-2">
							{tabContent.find((tab) => tab.id === activeTab)?.content.cta ? (
								<a href="/register">
									<Button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800">
										{
											tabContent.find((tab) => tab.id === activeTab)?.content
												.cta
										}
									</Button>
								</a>
							) : null}
						</CardFooter>
					</Card>
				</div>

				{/* Desktop view - grid layout */}
				<div className="hidden lg:grid grid-cols-2 gap-12 mt-10">
					<div className="flex flex-col">
						<div className="flex space-x-3 pb-6">
							{tabContent.map((tab) => (
								<Button
									key={tab.id}
									variant={activeTab === tab.id ? "default" : "secondary"}
									onClick={() => setActiveTab(tab.id)}
									className={cn(
										"flex items-center",
										activeTab === tab.id
											? "bg-emerald-700 text-primary-foreground rounded-full"
											: "",
									)}
								>
									{tab.icon}
									<span>{tab.title}</span>
								</Button>
							))}
						</div>

						<Card className="border-none shadow-none mt-2">
							<CardHeader className="px-0">
								<CardTitle className="text-3xl">
									{
										tabContent.find((tab) => tab.id === activeTab)?.content
											.heading
									}
								</CardTitle>
								<CardDescription className="text-lg mt-2">
									{
										tabContent.find((tab) => tab.id === activeTab)?.content
											.description
									}
								</CardDescription>
							</CardHeader>
							<CardContent className="px-0 py-4">
								{tabContent.find((tab) => tab.id === activeTab)?.content
									.features.length > 0 && (
									<ul className="list-disc pl-5 space-y-2">
										{tabContent
											.find((tab) => tab.id === activeTab)
											?.content.features.map((feature, index) => (
												<li key={index}>{feature}</li>
											))}
									</ul>
								)}
							</CardContent>
							<CardFooter className="px-0 pt-2">
								{tabContent.find((tab) => tab.id === activeTab)?.content.cta ? (
									<a href="/register">
										<Button className="px-6 py-6 bg-emerald-700 hover:bg-emerald-800">
											{
												tabContent.find((tab) => tab.id === activeTab)?.content
													.cta
											}
										</Button>
									</a>
								) : null}
							</CardFooter>
						</Card>
					</div>

					<div className="flex items-center justify-center">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4 }}
							key={`desktop-${activeTab}`}
							className="relative w-full max-w-xl aspect-[4/3] rounded-xl overflow-hidden shadow-lg"
						>
							<Image
								src={
									tabContent.find((tab) => tab.id === activeTab)?.content.image
										?.src || "/image/mint.png"
								}
								alt={
									tabContent.find((tab) => tab.id === activeTab)?.content.image
										?.alt || "Financial dashboard"
								}
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SliderTabs;
