"use client";

import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Coins, Menu, Sheet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import { OrderBook } from "./orderBook";
import { TradingVolume } from "./trading-volume";
import { TradingPanel } from "./trading-panel";
import { Drawer } from "vaul";
import { DrawerTrigger, DrawerContent, DrawerTitle } from "../ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Generate chart data based on time period
const generateChartData = (period: string) => {
	let dataPoints: { time: string; price: number }[] = [];
	const basePrice = 90; // Base price around $90

	switch (period) {
		case "1hr":
			// Generate data for every 5 minutes in the last hour
			for (let i = 0; i < 12; i++) {
				const minutes = i * 5;
				const time = `${Math.floor(minutes / 60)}:${(minutes % 60)
					.toString()
					.padStart(2, "0")}`;
				const randomFactor =
					Math.random() < 0.05 ? 120 / basePrice : 0.9 + Math.random() * 0.2;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 120 && Math.random() >= 0.05) {
					price = 120;
				}
				if (price < 80) {
					price = 80;
				}
				dataPoints.push({
					time,
					price: price,
				});
			}
			break;
		case "24hrs":
			// Generate data for every 2 hours in the last 24 hours
			for (let i = 0; i < 12; i++) {
				const hour = i * 2;
				const time = `${hour.toString().padStart(2, "0")}:00`;
				const randomFactor =
					Math.random() < 0.05 ? 120 / basePrice : 0.9 + Math.random() * 0.2;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 120 && Math.random() >= 0.05) {
					price = 120;
				}
				if (price < 80) {
					price = 80;
				}
				dataPoints.push({
					time,
					price: price,
				});
			}
			break;
		case "1week":
			// Generate data for each day of the week
			const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			for (let i = 0; i < 7; i++) {
				const randomFactor =
					Math.random() < 0.05 ? 120 / basePrice : 0.9 + Math.random() * 0.2;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 120 && Math.random() >= 0.05) {
					price = 120;
				}
				if (price < 80) {
					price = 80;
				}
				dataPoints.push({
					time: days[i],
					price: price,
				});
			}
			break;
		case "1month":
			// Generate data for each week of the month
			for (let i = 1; i <= 4; i++) {
				const randomFactor =
					Math.random() < 0.05 ? 120 / basePrice : 0.9 + Math.random() * 0.2;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 120 && Math.random() >= 0.05) {
					price = 120;
				}
				if (price < 80) {
					price = 80;
				}
				dataPoints.push({
					time: `Week ${i}`,
					price: price,
				});
			}
			break;
		case "1year":
			// Generate data for each month of the year
			const months = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];
			for (let i = 0; i < 12; i++) {
				const randomFactor =
					Math.random() < 0.05 ? 120 / basePrice : 0.9 + Math.random() * 0.2;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 120 && Math.random() >= 0.05) {
					price = 120;
				}
				if (price < 80) {
					price = 80;
				}
				dataPoints.push({
					time: months[i],
					price: price,
				});
			}
			break;
		default:
			dataPoints = generateChartData("24hrs");
	}

	return dataPoints;
};

export default function TradingInterface() {
	const [selectedTimePeriod, setSelectedTimePeriod] = useState("24hrs");
	const [chartData, setChartData] = useState(generateChartData("24hrs"));
	const [currentPrice, setCurrentPrice] = useState(92.75);
	const [priceChange, setPriceChange] = useState(0.32);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const availableBalance = 67.467; // Available USXW balance
	const availableFiat = (availableBalance * currentPrice).toFixed(2); // Updated available USD balance

	// Update chart data when time period changes
	useEffect(() => {
		setChartData(generateChartData(selectedTimePeriod));
	}, [selectedTimePeriod]);

	// Simulate real-time price updates
	useEffect(() => {
		const interval = setInterval(() => {
			const newPrice = currentPrice * (0.995 + Math.random() * 0.01);
			// Keep price within our desired range
			let adjustedPrice = Math.round(newPrice * 100) / 100;
			if (adjustedPrice > 120) adjustedPrice = 120;
			if (adjustedPrice < 80) adjustedPrice = 80;
			setCurrentPrice(adjustedPrice);

			const newChange = (Math.random() > 0.5 ? 1 : -1) * Math.random() * 0.5;
			setPriceChange(Math.round(newChange * 100) / 100);

			// Only update chart data if we're in 1hr view to simulate real-time updates
			if (selectedTimePeriod === "1hr") {
				const newData = [...chartData];
				if (newData.length > 12) newData.shift();

				const lastTime = newData[newData.length - 1]?.time || "0:55";
				const [hours, minutes] = lastTime.split(":").map(Number);
				let newHours = hours;
				let newMinutes = minutes + 5;

				if (newMinutes >= 60) {
					newMinutes = 0;
					newHours = (newHours + 1) % 24;
				}

				const newTimeString = `${newHours}:${newMinutes
					.toString()
					.padStart(2, "0")}`;

				newData.push({
					time: newTimeString,
					price: adjustedPrice,
				});

				setChartData(newData);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [chartData, currentPrice, selectedTimePeriod]);

	// Handle time period selection
	const handleTimePeriodChange = (period: string) => {
		setSelectedTimePeriod(period);
	};

	// Trading functions
	const handleBuy = (amount: string) => {
		console.log(`Buying gold for $${amount}`);
		// Implement buy logic here
	};

	const handleSell = (amount: string) => {
		console.log(`Selling ${amount} XAU`);
		// Implement sell logic here
	};

	const handleSend = () => {
		console.log("Send funds initiated");
		// Implement send logic here
	};

	const handleReceive = () => {
		console.log("Receive funds initiated");
		// Implement receive logic here
	};

	const handleRequest = () => {
		console.log("Request funds initiated");
		// Implement request logic here
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6">
			{/* Left section - Asset info and chart */}
			<div className="lg:col-span-3 xl:col-span-2 space-y-6">
				{/* Gold asset info */}
				<div className="bg-invincible">
					<div className="md:flex items-center bg-white rounded-lg p-6 mb-6 shadow-lg">
						<div className="text-center md:flex space-y-2 pb-6 md:space-y-0 md:space-x-4 md:text-start">
							<div className="h-12 w-12 rounded-full bg-amber-700 flex items-center justify-center mx-auto md:mx-0">
								<Coins className="h-8 w-8 text-white" />
							</div>
							<div>
								<h2 className="text-xl font-semibold tracking-wide">
									MetalMint Gold
								</h2>
								<p className="text-sm font-semibold text-gray-500">(USXW)</p>
							</div>
						</div>

						<div className="md:ml-auto ">
							<div className="flex flex-col items-center space-y-2 md:items-end">
								<div className="text-sm text-gray-500">Available balance</div>
								<div className="text-2xl font-semibold">
									{availableBalance.toFixed(4)}{" "}
									<span className="text-lg">USXW</span>
								</div>
								<div className="text-sm text-gray-500">US${availableFiat}</div>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg p-6 shadow-lg">
						{/* Action buttons */}
						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-500">
								MetalMint Gold (USXW) price chart
							</div>
						</div>

						{/* Price and chart */}
						<div className="mt-4">
							<div className="flex items-baseline">
								<div className="text-3xl font-bold text-gray-700">
									${currentPrice.toFixed(2)}
								</div>
								<div
									className={cn(
										"ml-2 text-sm font-medium",
										priceChange >= 0 ? "text-green-500" : "text-red-500",
									)}
								>
									{priceChange >= 0 ? "+" : ""}
									{priceChange}% (24h)
								</div>
							</div>

							{/* Time period selectors */}
							<div className="flex space-x-2 mt-4 mb-2 ">
								{["1hr", "24hrs", "1week", "1month", "1year"].map((period) => (
									<Button
										key={period}
										variant="ghost"
										size="sm"
										className={cn(
											"text-xs h-7 px-3",
											selectedTimePeriod === period
												? "bg-amber-50 text-amber-700 font-medium"
												: "text-gray-500",
										)}
										onClick={() => handleTimePeriodChange(period)}
									>
										{period}
									</Button>
								))}
							</div>

							<div className="h-[220px] lg:h-[300px] w-full mt-2">
								<ChartContainer
									config={{
										price: {
											label: "Price",
											color: "hsl(38 92% 35%)",
										},
									}}
									className="w-full max-h-[300px] lg:min-w-[450px] "
								>
									<AreaChart
										accessibilityLayer
										data={chartData}
										margin={{
											left: 2,
											right: 2,
										}}
									>
										<CartesianGrid vertical={true} strokeDasharray="3 3" />
										<XAxis
											dataKey="time"
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tick={{ fontSize: 10 }}
										/>
										<YAxis
											tickLine={false}
											axisLine={false}
											tickMargin={8}
											tickFormatter={(value) => `${value}`}
											tick={{ fontSize: 10 }}
											domain={[70, 130]}
										/>
										<ChartTooltip
											content={<ChartTooltipContent indicator="line" />}
											cursor={false}
										/>
										<defs>
											<linearGradient
												id="colorPrice"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="0%"
													stopColor="var(--color-price)"
													stopOpacity={0.8}
												/>
												<stop
													offset="90%"
													stopColor="var(--color-price)"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<Area
											dataKey="price"
											type="linear"
											fill="url(#colorPrice)"
											fillOpacity={1}
											stroke="var(--color-price)"
											strokeWidth={2}
										/>
									</AreaChart>
								</ChartContainer>
							</div>
						</div>
					</div>
				</div>

				{/* Order book and volume */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">
					<OrderBook />
					<TradingVolume />
				</div>
			</div>

			{/* Right section - Buy/Sell interface now uses the new component */}
			<div className="fixed bottom-4 right-4 z-50 xl:hidden">
				<Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
					<DrawerTrigger asChild>
						<Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
							<Menu className="h-6 w-6" />
							<span className="sr-only">Open trading panel</span>
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<VisuallyHidden>
							<DrawerTitle>Trading Panel</DrawerTitle>
						</VisuallyHidden>
						<div className="mx-auto w-full max-w-md">
							<TradingPanel
								currentPrice={currentPrice}
								onBuy={handleBuy}
								onSell={handleSell}
								onSend={handleSend}
								onReceive={handleReceive}
								onRequest={handleRequest}
							/>
							;
						</div>
					</DrawerContent>
				</Drawer.Root>
			</div>

			{/* Trading panel directly visible on xl devices */}
			<div className="hidden xl:flex lg:fixed md:right-4 shadow-lg rounded-2xl">
				<TradingPanel
					currentPrice={currentPrice}
					onBuy={handleBuy}
					onSell={handleSell}
					onSend={handleSend}
					onReceive={handleReceive}
					onRequest={handleRequest}
				/>
			</div>
		</div>
	);
}
