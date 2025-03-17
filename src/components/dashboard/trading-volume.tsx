"use client";

import { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

type VolumeData = {
	time: string;
	volume: number;
};

export function TradingVolume() {
	const [volumeData, setVolumeData] = useState<VolumeData[]>([]);
	const [totalVolume, setTotalVolume] = useState(0);

	// Generate random volume data
	useEffect(() => {
		const generateVolumeData = () => {
			const hours = ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"];
			const newData: VolumeData[] = [];
			let total = 0;

			for (let i = 0; i < hours.length; i++) {
				const volume = Math.round(10 + Math.random() * 90);
				newData.push({
					time: hours[i],
					volume: volume,
				});
				total += volume;
			}

			setVolumeData(newData);
			setTotalVolume(total);
		};

		generateVolumeData();
		const interval = setInterval(generateVolumeData, 30000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-4">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold">Trading Volume</h3>
				<div className="text-sm font-medium">
					24h:{" "}
					<span className="text-gray-700">
						{totalVolume.toLocaleString()} USXW
					</span>
				</div>
			</div>

			<div className="h-[200px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={volumeData}>
						<CartesianGrid strokeDasharray="3 3" vertical={false} />
						<XAxis
							dataKey="time"
							axisLine={false}
							tickLine={false}
							tickMargin={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tickMargin={10}
							tickFormatter={(value) => `${value}`}
						/>
						<Tooltip
							formatter={(value) => [`${value} XAU`, "Volume"]}
							labelFormatter={(label) => `Time: ${label}`}
						/>
						<Bar dataKey="volume" fill="#B45309" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
