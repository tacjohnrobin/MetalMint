interface TokenPriceCardProps {
	name: string;
	symbol: string;
	price: string;
	change: string;
	iconBg: string;
	iconText: string;
}

export function TokenPriceCard({
	name,
	symbol,
	price,
	change,
	iconBg,
	iconText,
}: TokenPriceCardProps) {
	const isPositive = !change.startsWith("-");

	return (
		<div className="rounded-lg bg-white p-4 shadow-sm">
			<div
				className={`flex h-10 w-10 items-center justify-center rounded-full ${iconBg}`}
			>
				<span className="text-lg font-bold text-white">{iconText}</span>
			</div>
			<div className="flex items-start space-x-3">
				<div className="flex-1">
					<div className="flex items-baseline justify-between">
						<h3 className="font-medium text-gray-900">
							{name} <span className="text-gray-500">{symbol}</span>
						</h3>
					</div>

					<div className="mt-1 flex items-baseline">
						<span
							className={`text-sm font-medium ${
								isPositive ? "text-green-600" : "text-red-600"
							}`}
						>
							{change}
						</span>
					</div>

					<div className="mt-1">
						<span className="text-lg font-semibold text-gray-900">{price}</span>
					</div>

					{/* Price Graph */}
					<div className="mt-2 h-8 w-full">
						<svg
							className="h-full w-full"
							viewBox="0 0 100 30"
							preserveAspectRatio="none"
						>
							<path
								d="M0,15 L5,14 L10,17 L15,16 L20,10 L25,12 L30,15 L35,14 L40,12 L45,13 L50,18 L55,16 L60,15 L65,17 L70,20 L75,19 L80,17 L85,18 L90,22 L95,20 L100,15"
								fill="none"
								stroke={isPositive ? "#22c55e" : "#ef4444"}
								strokeWidth="2"
							/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}
