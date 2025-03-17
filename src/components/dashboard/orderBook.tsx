"use client";

import { useState, useEffect } from "react";

type OrderType = {
	price: number;
	amount: number;
	total: number;
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
			for (let i = 0; i < 8; i++) {
				const price = basePrice - i * 0.5 - Math.random() * 0.2;
				const amount = 0.01 + Math.random() * 0.5;
				newBuyOrders.push({
					price: Math.round(price * 100) / 100,
					amount: Math.round(amount * 1000) / 1000,
					total: Math.round(price * amount * 100) / 100,
				});
			}

			// Generate sell orders (above current price)
			for (let i = 0; i < 8; i++) {
				const price = basePrice + i * 0.5 + Math.random() * 0.2;
				const amount = 0.01 + Math.random() * 0.5;
				newSellOrders.push({
					price: Math.round(price * 100) / 100,
					amount: Math.round(amount * 1000) / 1000,
					total: Math.round(price * amount * 100) / 100,
				});
			}

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

	return (
		<div className="bg-white rounded-lg border border-gray-200 p-4">
			<h3 className="text-lg font-semibold mb-4">Order Book</h3>

			<div className="grid grid-cols-3 text-xs font-medium text-gray-500 mb-2">
				<div>Price (USD)</div>
				<div className="text-right">Amount (XAU)</div>
				<div className="text-right">Total (USD)</div>
			</div>

			{/* Sell orders (red) */}
			<div className="space-y-1 mb-4">
				{sellOrders.map((order, index) => (
					<div
						key={`sell-${index}`}
						className="grid grid-cols-3 text-xs relative"
					>
						<div className="text-red-500 font-medium">
							${order.price.toFixed(2)}
						</div>
						<div className="text-right">{order.amount.toFixed(3)}</div>
						<div className="text-right">${order.total.toFixed(2)}</div>
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

			{/* Last price */}
			<div className="py-2 text-center font-bold text-sm border-y border-gray-200 mb-4">
				${lastPrice.toFixed(2)}
			</div>

			{/* Buy orders (green) */}
			<div className="space-y-1">
				{buyOrders.map((order, index) => (
					<div
						key={`buy-${index}`}
						className="grid grid-cols-3 text-xs relative"
					>
						<div className="text-green-500 font-medium">
							${order.price.toFixed(2)}
						</div>
						<div className="text-right">{order.amount.toFixed(3)}</div>
						<div className="text-right">${order.total.toFixed(2)}</div>
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
	);
}
