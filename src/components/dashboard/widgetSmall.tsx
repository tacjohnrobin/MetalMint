"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
	symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const script = document.createElement("script");
		script.src =
			"https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
		script.type = "text/javascript";
		script.async = true;
		script.innerHTML = JSON.stringify({
			symbol: symbol,
			width: "100%",
			height: "100%",
			locale: "en",
			dateRange: "12M",
			colorTheme: "light",
			isTransparent: false,
			autosize: true,
			largeChartUrl: "",
		});

		if (containerRef.current) {
			containerRef.current.appendChild(script);
		}

		return () => {
			// Cleanup to prevent duplicate widgets
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
		};
	}, [symbol]);

	return (
		<div className="tradingview-widget-container font-geologica">
			<div
				ref={containerRef}
				className="tradingview-widget-container__widget"
			/>
		</div>
	);
};

// **Now use the same component for different trading pairs**
export const TradingViewWidget1 = () => (
	<TradingViewWidget symbol="KRAKEN:TOKENUSD" />
);
export const Litecoin = () => <TradingViewWidget symbol="COINBASE:LTCUSD" />;
export const Ethereum = () => <TradingViewWidget symbol="COINBASE:ETHUSD" />;
export const Bitcoin = () => <TradingViewWidget symbol="CRYPTO:BTCUSD" />;
export const Gold = () => <TradingViewWidget symbol="FX_IDC:XAUUSD" />;
export const Silver = () => <TradingViewWidget symbol="FX_IDC:XAGUSD" />;
export const KinesisGold = () => <TradingViewWidget symbol="BITMART:KAUUSDT" />;
