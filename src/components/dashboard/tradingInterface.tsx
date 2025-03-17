"use client";

import { useState, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Coins, Send, Download, FileText, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

import { OrderBook } from "./orderBook";
import { TradingVolume } from "./trading-volume";
import { GoldSymbolsList } from "./Gold_symbol_list";

// Generate chart data based on time period
const generateChartData = (period: string) => {
	let dataPoints: { time: string; price: number }[] = [];
	const basePrice = 750;

	switch (period) {
		case "1hr":
			// Generate data for every 5 minutes in the last hour
			for (let i = 0; i < 12; i++) {
				const minutes = i * 5;
				const time = `${Math.floor(minutes / 60)}:${(minutes % 60)
					.toString()
					.padStart(2, "0")}`;
				const randomFactor =
					Math.random() < 0.05 ? 1000 / basePrice : 0.8 + Math.random() * 0.4;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 850 && Math.random() >= 0.05) {
					price = 850;
				}
				if (price < 700) {
					price = 700;
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
					Math.random() < 0.05 ? 1000 / basePrice : 0.8 + Math.random() * 0.4;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 850 && Math.random() >= 0.05) {
					price = 850;
				}
				if (price < 700) {
					price = 700;
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
					Math.random() < 0.05 ? 1000 / basePrice : 0.8 + Math.random() * 0.4;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 850 && Math.random() >= 0.05) {
					price = 850;
				}
				if (price < 700) {
					price = 700;
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
					Math.random() < 0.05 ? 1000 / basePrice : 0.8 + Math.random() * 0.4;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 900 && Math.random() >= 0.05) {
					price = 900;
				}
				if (price < 600) {
					price = 600;
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
					Math.random() < 0.05 ? 1000 / basePrice : 0.8 + Math.random() * 0.4;
				let price = Math.round(basePrice * randomFactor * 100) / 100;
				if (price > 850 && Math.random() >= 0.05) {
					price = 850;
				}
				if (price < 700) {
					price = 700;
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
	const [currentPrice, setCurrentPrice] = useState(867.75);
	const [priceChange, setPriceChange] = useState(0.32);
	const [payAmount, setPayAmount] = useState("0");
	const [receiveAmount, setReceiveAmount] = useState("0");
	const [selectedPercentage, setSelectedPercentage] = useState<string | null>(
		null,
	);

	// Update chart data when time period changes
	useEffect(() => {
		setChartData(generateChartData(selectedTimePeriod));
	}, [selectedTimePeriod]);

	// Simulate real-time price updates
	useEffect(() => {
		const interval = setInterval(() => {
			const newPrice = currentPrice * (0.999 + Math.random() * 0.002);
			setCurrentPrice(Math.round(newPrice * 100) / 100);

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
					price: Math.round(newPrice * 100) / 100,
				});

				setChartData(newData);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [chartData, currentPrice, selectedTimePeriod]);

	// Calculate receive amount based on pay amount
	useEffect(() => {
		if (payAmount && !isNaN(Number(payAmount))) {
			const calculatedAmount = Number(payAmount) / currentPrice;
			setReceiveAmount(calculatedAmount.toFixed(6));
		} else {
			setReceiveAmount("0");
		}
	}, [payAmount, currentPrice]);

	// Handle percentage selection
	const handlePercentageClick = (percentage: string) => {
		setSelectedPercentage(percentage);
		// Assuming a balance of $10,000 for demonstration
		const balance = 10000;
		const amount = (Number.parseInt(percentage) / 100) * balance;
		setPayAmount(amount.toString());
	};

	// Handle time period selection
	const handleTimePeriodChange = (period: string) => {
		setSelectedTimePeriod(period);
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			{/* Left section - Asset info and chart */}
			<div className="lg:col-span-2 space-y-6">
				{/* Gold symbols list 
				<GoldSymbolsList />*/}

				{/* Gold asset info */}
				<div className="bg-white rounded-lg   p-6">
					<div className="flex items-start">
						<div className="flex items-center space-x-4">
							<div className="h-12 w-12 rounded-full bg-amber-700 flex items-center justify-center">
								<Coins className="h-6 w-6 text-white" />
							</div>
							<div>
								<h2 className="text-lg font-semibold">MetalMint Gold</h2>
								<p className="text-sm text-gray-500">USXW</p>
							</div>
						</div>

						<div className="ml-auto">
							<div className="flex flex-col items-end">
								<div className="text-sm text-gray-500">Available balance</div>
								<div className="text-2xl font-semibold">
									67.4670<span className="text-lg">00</span> USXW
								</div>
								<div className="text-xs text-gray-500">US$0</div>
							</div>
						</div>
					</div>

					{/* Action buttons */}
					<div className="mt-6 flex items-center justify-between">
						<div className="text-sm text-gray-500">
							MetalMint Gold (USXW) price chart
						</div>
						<div>
							<Button variant="outline" size="sm" className="rounded-md">
								USXW OPTIONS <span className="ml-1">▼</span>
							</Button>
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
						<div className="flex space-x-2 mt-4 mb-2">
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

						<div className="h-[220px] lg:h-[300px] mt-2">
							<ChartContainer
								config={{
									price: {
										label: "Price",
										color: "hsl(38 92% 35%)",
									},
								}}
								className="w-full max-h-[300px] lg:min-w-[450px]"
							>
								<AreaChart
									accessibilityLayer
									data={chartData}
									margin={{
										left: 12,
										right: 12,
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
									/>
									<ChartTooltip
										content={<ChartTooltipContent indicator="line" />}
										cursor={false}
									/>
									<defs>
										<linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--color-price)"
												stopOpacity={0.8}
											/>
											<stop
												offset="95%"
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

				{/* Order book and volume */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<OrderBook />
					<TradingVolume />
				</div>
			</div>

			{/* Right section - Buy/Sell interface */}
			<div className="lg:col-span-1">
				<div className="bg-white rounded-lg border border-gray-200">
					{/* Buy/Sell tabs */}
					<Tabs defaultValue="buy">
						<div className="flex border-b border-gray-200">
							<TabsList className="w-full bg-transparent border-b-0">
								<TabsTrigger
									value="buy"
									className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
								>
									Buy
								</TabsTrigger>
								<TabsTrigger
									value="sell"
									className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
								>
									Sell
								</TabsTrigger>
							</TabsList>
						</div>

						{/* Buy tab content */}
						<TabsContent value="buy" className="p-6 space-y-6">
							<h2 className="text-xl font-bold">Buy Gold</h2>

							{/* Percentage buttons */}
							<div className="flex space-x-2">
								{["25%", "50%", "Max"].map((percentage) => (
									<Button
										key={percentage}
										variant="outline"
										size="sm"
										className={cn(
											"flex-1",
											selectedPercentage === percentage && "bg-gray-100",
										)}
										onClick={() =>
											handlePercentageClick(percentage.replace("%", ""))
										}
									>
										{percentage}
									</Button>
								))}
							</div>

							{/* Pay amount */}
							<div className="space-y-2">
								<div className="flex justify-between">
									<label className="text-sm font-medium">Pay</label>
									<div className="flex items-center">
										<Button variant="ghost" size="sm" className="h-6 px-2">
											<span className="flex items-center">
												<img
													src="/placeholder.svg?height=20&width=20"
													alt="USD flag"
													className="h-5 w-5 mr-1"
												/>
												USD
												<span className="ml-1">▼</span>
											</span>
										</Button>
									</div>
								</div>
								<div className="relative">
									<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
										$
									</span>
									<Input
										value={payAmount}
										onChange={(e) => setPayAmount(e.target.value)}
										className="pl-8"
									/>
								</div>
								<div className="text-xs text-gray-500 text-right">
									Balance: $10,000
								</div>
							</div>

							{/* Exchange icon */}
							<div className="flex justify-center">
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<ArrowUpDown className="h-4 w-4" />
								</Button>
							</div>

							{/* Receive amount */}
							<div className="space-y-2">
								<div className="flex justify-between">
									<label className="text-sm font-medium">Receive</label>
									<div className="flex items-center">
										<Button variant="ghost" size="sm" className="h-6 px-2">
											<span className="flex items-center">
												<div className="h-5 w-5 rounded-full bg-amber-700 flex items-center justify-center mr-1">
													<span className="text-white text-xs">X</span>
												</div>
												XAU
												<span className="ml-1">▼</span>
											</span>
										</Button>
									</div>
								</div>
								<Input value={receiveAmount} readOnly className="bg-gray-50" />
								<div className="text-xs text-gray-500 text-right">
									Balance: 0
								</div>
							</div>

							{/* Fee information */}
							<div className="text-sm text-gray-500 flex justify-between">
								<span>Fees incl. 0 XAU</span>
								<span>1 XAU = ${currentPrice.toFixed(2)}</span>
							</div>

							{/* Buy button */}
							<Button className="w-full" size="lg">
								Buy Gold
							</Button>
						</TabsContent>

						{/* Sell tab content */}
						<TabsContent value="sell" className="p-6">
							<div className="flex flex-col items-center justify-center py-8">
								<Coins className="h-12 w-12 text-gray-300 mb-4" />
								<h3 className="text-lg font-medium mb-2">No Gold to Sell</h3>
								<p className="text-sm text-gray-500 text-center mb-4">
									You need to buy some gold before you can sell it.
								</p>
								<Button variant="outline">Buy Gold Now</Button>
							</div>
						</TabsContent>
					</Tabs>

					{/* Action buttons */}
					<div className="border-t border-gray-200 p-4">
						<div className="grid grid-cols-3 gap-2">
							<div className="flex flex-col items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
								<div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
									<Send className="h-4 w-4" />
								</div>
								<span className="text-xs font-medium">Send</span>
								<span className="text-xs text-gray-500">
									Send funds from your account
								</span>
							</div>
							<div className="flex flex-col items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
								<div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
									<Download className="h-4 w-4" />
								</div>
								<span className="text-xs font-medium">Receive</span>
								<span className="text-xs text-gray-500">
									Receive funds into your account
								</span>
							</div>
							<div className="flex flex-col items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
								<div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center mb-1">
									<FileText className="h-4 w-4" />
								</div>
								<span className="text-xs font-medium">Request</span>
								<span className="text-xs text-gray-500">
									Request funds for your account
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
