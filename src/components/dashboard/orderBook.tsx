"use client";

import { useState, useEffect } from "react";

type OrderType = {
	price: number;
	amount: number;
	total: number;
	cumulative?: number; // Add cumulative field
};

export function OrderBook() {
	const [buyOrders, setBuyOrders] = useState<OrderType[]>([]);
	const [sellOrders, setSellOrders] = useState<OrderType[]>([]);
	const [lastPrice, setLastPrice] = useState(1952.75);

	// Generate random orders
	useEffect(() => {
		const generateOrders = () => {
			const basePrice = 1952.75;
			const newBuyOrders: OrderType[] = [];
			const newSellOrders: OrderType[] = [];

			// Generate buy orders (below current price)
			for (let i = 0; i < 15; i++) {
				// Increased number of orders for scrolling
				const price = basePrice - i * 0.5 - Math.random() * 0.2;
				const amount = 0.01 + Math.random() * 0.5;
				newBuyOrders.push({
					price: Math.round(price * 100) / 100,
					amount: Math.round(amount * 1000) / 1000,
					total: Math.round(price * amount * 100) / 100,
				});
			}

			// Generate sell orders (above current price)
			for (let i = 0; i < 15; i++) {
				// Increased number of orders for scrolling
				const price = basePrice + i * 0.5 + Math.random() * 0.2;
				const amount = 0.01 + Math.random() * 0.5;
				newSellOrders.push({
					price: Math.round(price * 100) / 100,
					amount: Math.round(amount * 1000) / 1000,
					total: Math.round(price * amount * 100) / 100,
				});
			}

			// Calculate cumulative amounts
			let buySum = 0;
			newBuyOrders.forEach((order) => {
				buySum += order.amount;
				order.cumulative = Math.round(buySum * 1000) / 1000;
			});

			let sellSum = 0;
			newSellOrders.forEach((order) => {
				sellSum += order.amount;
				order.cumulative = Math.round(sellSum * 1000) / 1000;
			});

			setBuyOrders(newBuyOrders);
			setSellOrders(newSellOrders);

			// Update last price
			const newPrice = basePrice * (0.999 + Math.random() * 0.002);
			setLastPrice(Math.round(newPrice * 100) / 100);
		};

		generateOrders();
		const interval = setInterval(generateOrders, 5000);

		return () => clearInterval(interval);
	}, []);

	// Calculate spread
	const bestAsk = sellOrders.length > 0 ? sellOrders[0].price : 0;
	const bestBid = buyOrders.length > 0 ? buyOrders[0].price : 0;
	const spread = bestAsk - bestBid;
	const spreadPercentage = bestBid ? (spread / bestBid) * 100 : 0;

	return (
		<div className="bg-white rounded-lg p-4 max-h-[300px] mb-4 shadow-lg">
			<h3 className="text-lg font-semibold mb-4">Order Book</h3>

			{/* Column headers */}
			<div className="grid grid-cols-4 text-xs font-medium text-gray-500 mb-2 ">
				<div>Price (USD)</div>
				<div className="text-right">Amount</div>
				<div className="text-right mr-6">Total</div>
				<div className="text-right">Cum. (USXW)</div>
			</div>

			{/* Sell orders (red) - with scrollbar */}
			<div className="h-16 overflow-y-auto mb-2 pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
				<div className="space-y-1">
					{sellOrders.map((order, index) => (
						<div
							key={`sell-${index}`}
							className={`grid grid-cols-4 text-xs relative  ${
								index === 0 ? "font-semibold" : ""
							}`}
						>
							<div className="text-red-500">${order.price.toFixed(2)}</div>
							<div className="text-right">{order.amount.toFixed(3)}</div>
							<div className="text-right">${order.total.toFixed(2)}</div>
							<div className="text-right mr-4">
								{order.cumulative?.toFixed(3)}
							</div>
							<div
								className="absolute right-0 top-0 bottom-0 bg-red-50"
								style={{
									width: `${Math.min(order.amount * 100, 100)}%`,
									zIndex: -1,
								}}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Spread information */}
			<div className="py-2 text-center font-bold text-sm border-y border-gray-200 mb-2">
				<div>${lastPrice.toFixed(2)}</div>
				<div className="text-xs text-gray-500 mt-1">
					Spread: ${spread.toFixed(2)} ({spreadPercentage.toFixed(2)}%)
				</div>
			</div>

			{/* Buy orders (green) - with scrollbar */}
			<div className="h-16 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
				<div className="space-y-1">
					{buyOrders.map((order, index) => (
						<div
							key={`buy-${index}`}
							className={`grid grid-cols-4 text-xs relative ${
								index === 0 ? "font-semibold" : ""
							}`}
						>
							<div className="text-green-500">${order.price.toFixed(2)}</div>
							<div className="text-right">{order.amount.toFixed(3)}</div>
							<div className="text-right">${order.total.toFixed(2)}</div>
							<div className="text-right mr-4">
								{order.cumulative?.toFixed(3)}
							</div>
							<div
								className="absolute right-0 top-0 bottom-0 bg-green-50"
								style={{
									width: `${Math.min(order.amount * 100, 100)}%`,
									zIndex: -1,
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
