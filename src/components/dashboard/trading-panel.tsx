"use client";

import { BuySellComponent } from "./buy-sell-component";

interface TradingPanelProps {
	currentPrice: number;
	onBuy?: (amount: string) => void;
	onSell?: (amount: string) => void;
	onSend?: () => void;
	onReceive?: () => void;
	onRequest?: () => void;
}

export function TradingPanel({
	currentPrice,
	onBuy,
	onSell,
}: TradingPanelProps) {
	return (
		<div>
			<BuySellComponent
				currentPrice={currentPrice}
				onBuy={onBuy}
				onSell={onSell}
			/>
		</div>
	);
}
