"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function DashboardPreview() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Sample data for the chart
	const chartData = [
		{ value: 32.5, label: "$32.5k" },
		{ value: 51.4, label: "$51.4k" },
		{ value: 31.9, label: "$31.9k" },
		{ value: 42.7, label: "$42.7k" },
		{ value: 53.6, label: "$53.6k" },
		{ value: 28.9, label: "$28.9k" },
		{ value: 48.6, label: "$48.6k" },
		{ value: 59.0, label: "$59.0k" },
	];

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const resizeCanvas = () => {
			const container = canvas.parentElement;
			if (!container) return;

			// Set canvas dimensions based on container size
			canvas.width = container.clientWidth;
			canvas.height = container.clientHeight;

			drawChart();
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		function drawChart() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const padding = 20;
			const chartWidth = canvas.width - padding * 2;
			const chartHeight = canvas.height - padding * 2;
			const barWidth = (chartWidth / chartData.length) * 0.7;
			const barSpacing = (chartWidth / chartData.length) * 0.3;

			// Find max value for scaling
			const maxValue = Math.max(...chartData.map((d) => d.value));

			// Draw bars
			chartData.forEach((data, index) => {
				const barHeight = (data.value / maxValue) * chartHeight;
				const x = padding + index * (barWidth + barSpacing);
				const y = canvas.height - padding - barHeight;

				// Draw bar with gradient
				const gradient = ctx.createLinearGradient(
					x,
					y,
					x,
					canvas.height - padding,
				);
				gradient.addColorStop(0, "rgba(209, 213, 219, 0.8)");
				gradient.addColorStop(1, "rgba(209, 213, 219, 0.3)");

				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.roundRect(x, y, barWidth, barHeight, 4);
				ctx.fill();
			});
		}

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, [chartData]);

	return (
		<div className="w-full max-w-5xl mx-auto bg-white rounded-t-xl shadow-lg overflow-hidden relative">
			<div className="flex flex-col md:flex-row">
				{/* Bitcoin value */}
				<div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-gray-100">
					<div className="flex items-center">
						<div className="bg-gray-100 rounded-full p-2 mr-3">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M9.5 2v20M14.5 2v20M4.5 9h15M4.5 15h15"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div>
							<div className="text-sm text-gray-500 font-medium">Bitcoin</div>
							<div className="flex items-center">
								<span className="text-2xl font-bold mr-2">0.0895</span>
								<span className="text-sm text-gray-500">BTC</span>
							</div>
						</div>
					</div>

					<div className="mt-4 grid grid-cols-3 gap-2 text-xs">
						<div className="bg-gray-50 p-2 rounded">
							<div className="text-gray-500">10%</div>
							<div className="flex items-center text-green-600">
								<ArrowUp className="h-3 w-3 mr-1" />
								<span>3%</span>
							</div>
						</div>
						<div className="bg-gray-50 p-2 rounded">
							<div className="text-gray-500">30%</div>
							<div className="flex items-center text-red-600">
								<ArrowDown className="h-3 w-3 mr-1" />
								<span>2%</span>
							</div>
						</div>
						<div className="bg-gray-50 p-2 rounded">
							<div className="text-gray-500">60%</div>
							<div className="flex items-center text-green-600">
								<ArrowUp className="h-3 w-3 mr-1" />
								<span>5%</span>
							</div>
						</div>
					</div>
				</div>

				{/* Binance balance */}
				<div className="flex-1 p-6">
					<div className="flex items-center justify-between">
						<div>
							<div className="text-sm text-gray-500 font-medium">Binance</div>
							<div className="text-xs text-gray-400">
								This month you made +28.6% profit
							</div>
						</div>
						<div className="text-right">
							<div className="text-xs text-gray-500">YOY +49%</div>
							<div className="text-2xl font-bold">$4,350</div>
							<div className="text-xs text-gray-500">Balance</div>
						</div>
					</div>

					<div className="mt-4 h-24 w-full">
						<canvas ref={canvasRef} className="w-full h-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
