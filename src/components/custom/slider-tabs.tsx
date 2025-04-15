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
		icon: <DollarSign className="h-5 w-5" />,
		content: {
			heading: "Investment Plans for Everyone",
			description:
				"Start with as little as $500 or scale up to $25,000. Whether you're new to investing or a seasoned pro, our tiered plans help you achieve your financial goals with ease.",
			features: ["Live Charts", "Secure Trading", "Explore Tools"],
			cta: null,
			image: {
				src: "/image/handgold.png",
				alt: "Investment plans dashboard",
			},
		},
	},
	{
		id: "earnings",
		title: "Daily Earnings",
		icon: <BarChart3 className="h-5 w-5" />,
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
		icon: <TrendingUp className="h-5 w-5" />,
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
		<section className="w-full py-12 ">
			<div className="container px-4 md:px-6">
				<h2 className="text-3xl font-bold tracking-tighter text-center md:text-4xl">
					Explore Our Financial Tools
				</h2>
				<p className="mx-auto max-w-[700px] text-muted-foreground text-center mt-4">
					Unlock your financial potential with our innovative tools.
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
					<div className="flex flex-col">
						<div className="space-x-2 flex overflow-x-auto pb-4">
							{tabContent.map((tab) => (
								<Button
									key={tab.id}
									variant={activeTab === tab.id ? "default" : "secondary"}
									onClick={() => setActiveTab(tab.id)}
									className={cn(
										"w-fit shrink-0",
										activeTab === tab.id
											? "bg-emerald-700 text-primary-foreground"
											: "",
									)}
								>
									{tab.title}
								</Button>
							))}
						</div>

						<Card className="border-none shadow-none mt-4 ">
							<CardHeader>
								<CardTitle className="text-2xl md:text-3xl lg:text-4xl">
									{
										tabContent.find((tab) => tab.id === activeTab)?.content
											.heading
									}
								</CardTitle>
								<CardDescription className="text-md  lg:text-lg">
									{
										tabContent.find((tab) => tab.id === activeTab)?.content
											.description
									}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="list-disc pl-5">
									{tabContent
										.find((tab) => tab.id === activeTab)
										?.content.features.map((feature, index) => (
											<li key={index}>{feature}</li>
										))}
								</ul>
							</CardContent>
							<CardFooter>
								{tabContent.find((tab) => tab.id === activeTab)?.content.cta ? (
									<a href="/register">
										<Button className="p-6 bg-emerald-700 hover:bg-emerald-800">
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

					<div className="bg-muted rounded-lg h-[400px]  md:h-auto overflow-hidden">
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.4 }}
							key={activeTab} // This forces a re-render when tab changes
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
								className="w-full h-auto object-cover rounded-xl shadow-md md:max-h-[500px]"
								width={500}
								height={500}
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SliderTabs;
