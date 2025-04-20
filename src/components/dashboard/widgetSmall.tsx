"use client";

import { useEffect, useRef, useState } from "react";

interface TradingViewWidgetProps {
	symbol: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbol }) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isClient, setIsClient] = useState(false);

	// Mark client-side only
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient || !containerRef.current) return;

		try {
			// Clear previous script/widget nodes
			while (containerRef.current.firstChild) {
				containerRef.current.removeChild(containerRef.current.firstChild);
			}

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

			containerRef.current.appendChild(script);
		} catch (error) {
			console.error("TradingView widget load error:", error);
		}

		// Cleanup
		return () => {
			if (containerRef.current) {
				while (containerRef.current.firstChild) {
					containerRef.current.removeChild(containerRef.current.firstChild);
				}
			}
		};
	}, [symbol, isClient]);

	// Render nothing until client is confirmed
	if (!isClient) return null;

	return (
		<div className="tradingview-widget-container font-geologica">
			<div
				ref={containerRef}
				className="tradingview-widget-container__widget"
			/>
		</div>
	);
};

// ✅ Use per-symbol widgets
export const TradingViewWidget1 = () => (
	<TradingViewWidget symbol="KRAKEN:TOKENUSD" />
);
export const Litecoin = () => <TradingViewWidget symbol="COINBASE:LTCUSD" />;
export const Ethereum = () => <TradingViewWidget symbol="COINBASE:ETHUSD" />;
export const Bitcoin = () => <TradingViewWidget symbol="CRYPTO:BTCUSD" />;
export const Gold = () => <TradingViewWidget symbol="FX_IDC:XAUUSD" />;
export const Silver = () => <TradingViewWidget symbol="FX_IDC:XAGUSD" />;
export const KinesisGold = () => <TradingViewWidget symbol="BITMART:KAUUSDT" />;
