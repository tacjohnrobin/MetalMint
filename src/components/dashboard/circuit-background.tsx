"use client";

import { useEffect, useRef } from "react";

export default function CircuitBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// Set canvas dimensions to match window size
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			drawCircuitPattern();
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		// Draw circuit pattern
		function drawCircuitPattern() {
			ctx!.clearRect(0, 0, canvas.width, canvas.height);

			// Set line properties
			ctx.strokeStyle = "#e5e7eb"; // Light gray color
			ctx.lineWidth = 1;

			// Create a more symmetrical grid for circuit board look
			const gridSize = 40;
			const cols = Math.ceil(canvas.width / gridSize);
			const rows = Math.ceil(canvas.height / gridSize);

			// Draw horizontal lines
			for (let i = 0; i < rows; i++) {
				if (i % 3 === 0) {
					// Only draw some lines for a cleaner look
					ctx.beginPath();
					ctx.moveTo(0, i * gridSize);
					ctx.lineTo(canvas.width, i * gridSize);
					ctx.stroke();
				}
			}

			// Draw vertical lines
			for (let i = 0; i < cols; i++) {
				if (i % 4 === 0) {
					// Only draw some lines for a cleaner look
					ctx.beginPath();
					ctx.moveTo(i * gridSize, 0);
					ctx.lineTo(i * gridSize, canvas.height);
					ctx.stroke();
				}
			}

			// Draw connection points and components
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const x = i * gridSize;
					const y = j * gridSize;

					// Only place components at certain intersections
					if ((i % 4 === 0 && j % 3 === 0) || (i % 5 === 0 && j % 2 === 0)) {
						// Draw connection point
						ctx.beginPath();
						ctx.arc(x, y, 2, 0, Math.PI * 2);
						ctx.fillStyle = "#d1d5db";
						ctx.fill();

						// Occasionally draw circuit components
						if (Math.random() < 0.4) {
							drawCircuitComponent(ctx, x, y, gridSize);
						}

						// Draw connecting lines to nearby points
						if (i < cols - 4 && Math.random() < 0.7) {
							// Horizontal connection with right angle
							ctx.beginPath();
							ctx.moveTo(x, y);
							const midX = x + gridSize * 2;
							ctx.lineTo(midX, y);

							if (Math.random() < 0.5) {
								ctx.lineTo(midX, y + gridSize * (Math.random() < 0.5 ? 1 : -1));
							}

							ctx.stroke();
						}

						if (j < rows - 3 && Math.random() < 0.7) {
							// Vertical connection with right angle
							ctx.beginPath();
							ctx.moveTo(x, y);
							const midY = y + gridSize * 2;
							ctx.lineTo(x, midY);

							if (Math.random() < 0.5) {
								ctx.lineTo(x + gridSize * (Math.random() < 0.5 ? 1 : -1), midY);
							}

							ctx.stroke();
						}
					}
				}
			}
		}

		// Draw circuit components
		function drawCircuitComponent(ctx, x, y, gridSize) {
			const componentType = Math.floor(Math.random() * 5);

			switch (componentType) {
				case 0: // Resistor
					ctx.beginPath();
					ctx.moveTo(x - 6, y);
					ctx.lineTo(x - 3, y);
					// Zigzag pattern
					ctx.lineTo(x - 2, y - 3);
					ctx.lineTo(x, y + 3);
					ctx.lineTo(x + 2, y - 3);
					ctx.lineTo(x + 3, y);
					ctx.lineTo(x + 6, y);
					ctx.stroke();
					break;

				case 1: // Capacitor
					ctx.beginPath();
					ctx.moveTo(x - 6, y);
					ctx.lineTo(x - 2, y);
					// Two parallel lines
					ctx.moveTo(x - 2, y - 4);
					ctx.lineTo(x - 2, y + 4);
					ctx.moveTo(x + 2, y - 4);
					ctx.lineTo(x + 2, y + 4);
					ctx.moveTo(x + 2, y);
					ctx.lineTo(x + 6, y);
					ctx.stroke();
					break;

				case 2: // IC chip
					ctx.strokeRect(x - 8, y - 6, 16, 12);
					// Add pins
					for (let i = -4; i <= 4; i += 2) {
						ctx.beginPath();
						ctx.moveTo(x + i, y - 6);
						ctx.lineTo(x + i, y - 8);
						ctx.stroke();

						ctx.beginPath();
						ctx.moveTo(x + i, y + 6);
						ctx.lineTo(x + i, y + 8);
						ctx.stroke();
					}
					break;

				case 3: // Diode
					ctx.beginPath();
					ctx.moveTo(x - 6, y);
					ctx.lineTo(x - 2, y);
					// Triangle
					ctx.moveTo(x - 2, y - 4);
					ctx.lineTo(x - 2, y + 4);
					ctx.lineTo(x + 2, y);
					ctx.closePath();
					ctx.stroke();
					// Line
					ctx.beginPath();
					ctx.moveTo(x + 2, y - 4);
					ctx.lineTo(x + 2, y + 4);
					ctx.moveTo(x + 2, y);
					ctx.lineTo(x + 6, y);
					ctx.stroke();
					break;

				case 4: // Connection node
					ctx.beginPath();
					ctx.arc(x, y, 4, 0, Math.PI * 2);
					ctx.stroke();
					// Add connection points
					ctx.beginPath();
					ctx.moveTo(x - 8, y);
					ctx.lineTo(x - 4, y);
					ctx.moveTo(x + 4, y);
					ctx.lineTo(x + 8, y);
					ctx.moveTo(x, y - 4);
					ctx.lineTo(x, y - 8);
					ctx.moveTo(x, y + 4);
					ctx.lineTo(x, y + 8);
					ctx.stroke();
					break;
			}
		}

		return () => {
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className="w-full h-full"
			style={{ opacity: 0.6 }}
		/>
	);
}
