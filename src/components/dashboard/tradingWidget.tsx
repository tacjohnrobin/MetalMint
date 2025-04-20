"use client";

import React, { useEffect, useRef, memo, useState } from "react";

function TradingViewWidget() {
	const widgetContainerRef = useRef<HTMLDivElement>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient || !widgetContainerRef.current) return;

		try {
			const container = widgetContainerRef.current;

			// Clear previous content
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}

			// Add inner HTML safely
			const widgetDiv = document.createElement("div");
			widgetDiv.className = "tradingview-widget-container__widget";
			widgetDiv.style.height = "100%";
			widgetDiv.style.width = "100%";

			const copyrightDiv = document.createElement("div");
			copyrightDiv.className = "tradingview-widget-copyright";
			copyrightDiv.innerHTML = `
				<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">

				</a>
			`;

			const script = document.createElement("script");
			script.src =
				"https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
			script.type = "text/javascript";
			script.async = true;
			script.innerHTML = JSON.stringify({
				autosize: true,
				symbol: "NASDAQ:AAPL",
				interval: "D",
				timezone: "Etc/UTC",
				theme: "light",
				style: "1",
				locale: "en",
				backgroundColor: "rgba(255, 255, 255, 1)",
				gridColor: "rgba(203, 203, 203, 0.06)",
				allow_symbol_change: true,
				support_host: "https://www.tradingview.com",
			});

			// Append elements
			container.appendChild(widgetDiv);
			container.appendChild(copyrightDiv);
			container.appendChild(script);
		} catch (error) {
			console.error("TradingView widget load error:", error);
		}

		// Optional: cleanup
		return () => {
			if (widgetContainerRef.current) {
				while (widgetContainerRef.current.firstChild) {
					widgetContainerRef.current.removeChild(
						widgetContainerRef.current.firstChild,
					);
				}
			}
		};
	}, [isClient]);

	if (!isClient) return null;

	return (
		<div
			className="tradingview-widget-container"
			ref={widgetContainerRef}
			style={{ height: "100%", width: "100%" }}
		></div>
	);
}

export default memo(TradingViewWidget);
