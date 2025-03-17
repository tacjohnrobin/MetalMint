"use client";

import * as React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Generate realistic price data with volatility
const generatePriceData = (period: string) => {
	const basePrice = 1896.89;
	const volatility = 0.02; // 2% volatility
	const dataPoints: { time: string; price: number }[] = [];

	const generatePrice = (prevPrice: number) => {
		const change = (Math.random() - 0.5) * volatility;
		return prevPrice * (1 + change);
	};

	switch (period) {
		case "1h":
			// Generate 12 data points, 5 minutes each
			for (let i = 0; i < 12; i++) {
				const minutes = i * 5;
				const hour = Math.floor(minutes / 60);
				const minute = minutes % 60;
				const time = `${hour.toString().padStart(2, "0")}:${minute
					.toString()
					.padStart(2, "0")}`;
				const price =
					i === 0 ? basePrice : generatePrice(dataPoints[i - 1].price);
				dataPoints.push({ time, price: Number(price.toFixed(2)) });
			}
			break;

		case "24h":
			// Generate 24 hourly data points
			for (let i = 0; i < 24; i++) {
				const time = `${i.toString().padStart(2, "0")}:00`;
				const price =
					i === 0 ? basePrice : generatePrice(dataPoints[i - 1].price);
				dataPoints.push({ time, price: Number(price.toFixed(2)) });
			}
			break;

		case "1w":
			// Generate daily data points for a week
			const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			for (let i = 0; i < 7; i++) {
				const price =
					i === 0 ? basePrice : generatePrice(dataPoints[i - 1].price);
				dataPoints.push({ time: days[i], price: Number(price.toFixed(2)) });
			}
			break;

		case "1m":
			// Generate weekly data points for a month
			for (let i = 1; i <= 4; i++) {
				const price =
					i === 1 ? basePrice : generatePrice(dataPoints[i - 2].price);
				dataPoints.push({ time: `Week ${i}`, price: Number(price.toFixed(2)) });
			}
			break;

		case "1y":
			// Generate monthly data points for a year
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
				const price =
					i === 0 ? basePrice : generatePrice(dataPoints[i - 1].price);
				dataPoints.push({ time: months[i], price: Number(price.toFixed(2)) });
			}
			break;
	}

	return dataPoints;
};

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg p-2 text-sm">
				<p className="font-medium">${payload[0].value.toFixed(2)}</p>
				<p className="text-gray-500 text-xs">{payload[0].payload.time}</p>
			</div>
		);
	}
	return null;
};

export function PriceChart() {
	const [period, setPeriod] = React.useState("24h");
	const [data, setData] = React.useState(generatePriceData("24h"));
	const [currentPrice, setCurrentPrice] = React.useState(1896.89);
	const [priceChange, setPriceChange] = React.useState(-0.02);

	// Update data when period changes
	React.useEffect(() => {
		setData(generatePriceData(period));
	}, [period]);

	// Calculate price change
	React.useEffect(() => {
		if (data.length >= 2) {
			const startPrice = data[0].price;
			const endPrice = data[data.length - 1].price;
			const change = ((endPrice - startPrice) / startPrice) * 100;
			setPriceChange(Number(change.toFixed(2)));
			setCurrentPrice(endPrice);
		}
	}, [data]);

	const periods = [
		{ value: "1h", label: "1h" },
		{ value: "24h", label: "24h" },
		{ value: "1w", label: "1w" },
		{ value: "1m", label: "1m" },
		{ value: "1y", label: "1y" },
	];

	return (
		<Card className="p-6">
			{/* Price and change */}
			<div className="mb-6">
				<div className="text-2xl font-bold">${currentPrice.toFixed(2)}</div>
				<div
					className={cn(
						"text-sm",
						priceChange >= 0 ? "text-green-500" : "text-red-500",
					)}
				>
					{priceChange >= 0 ? "+" : ""}
					{priceChange}% (24h)
				</div>
			</div>

			{/* Time period selectors */}
			<div className="flex gap-1 mb-4">
				{periods.map((p) => (
					<Button
						key={p.value}
						variant="ghost"
						size="sm"
						className={cn(
							"h-7 px-3 text-xs font-medium",
							period === p.value
								? "bg-gray-100 text-gray-900"
								: "text-gray-500 hover:text-gray-900",
						)}
						onClick={() => setPeriod(p.value)}
					>
						{p.label}
					</Button>
				))}
			</div>

			{/* Chart */}
			<div className="h-[300px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart
						data={data}
						margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
					>
						<defs>
							<linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
								<stop offset="95%" stopColor="#64748b" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							stroke="#e2e8f0"
						/>
						<XAxis
							dataKey="time"
							axisLine={false}
							tickLine={false}
							tick={{ fontSize: 12, fill: "#64748b" }}
							tickMargin={8}
						/>
						<YAxis hide={true} domain={["auto", "auto"]} />
						<Tooltip
							content={<CustomTooltip />}
							cursor={{
								stroke: "#64748b",
								strokeWidth: 1,
								strokeDasharray: "4 4",
							}}
						/>
						<Area
							type="monotone"
							dataKey="price"
							stroke="#64748b"
							strokeWidth={2}
							fill="url(#colorPrice)"
							isAnimationActive={false}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</Card>
	);
}
