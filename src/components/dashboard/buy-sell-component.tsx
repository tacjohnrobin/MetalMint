"use client";

import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BuySellComponentProps {
	currentPrice: number;
	onBuy?: (amount: string) => void;
	onSell?: (amount: string) => void;
}

const INVESTMENT_PACKAGES = [
	{ value: "500", label: "$500" },
	{ value: "1500", label: "$1,500" },
	{ value: "5000", label: "$5,000" },
	{ value: "7500", label: "$7,500" },
	{ value: "10000", label: "$10,000" },
	{ value: "25000", label: "$25,000" },
];

const WITHDRAWAL_PACKAGES = [
	{ value: "1000", label: "$1,000" },
	{ value: "3000", label: "$3,000" },
	{ value: "5000", label: "$5,000" },
	{ value: "10000", label: "$10,000" },
	{ value: "15000", label: "$15,000" },
];

const STRIPE_BALANCE = 8650; // User's Stripe balance
const GOLD_BALANCE = 25000; // User's Gold balance

export function BuySellComponent({
	currentPrice = 867.75,
	onBuy,
	onSell,
}: BuySellComponentProps) {
	// Buy tab states
	const [payAmount, setPayAmount] = useState<string>("");
	const [receiveAmount, setReceiveAmount] = useState("0");
	const [maturityDate, setMaturityDate] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPercentage, setSelectedPercentage] = useState<string | null>(
		null,
	);

	// Withdraw tab states
	const [sellAmount, setSellAmount] = useState<string>("");
	const [receiveUsdAmount, setReceiveUsdAmount] = useState("0");
	const [withdrawError, setWithdrawError] = useState<string | null>(null);
	const [showWithdrawSuccessAlert, setShowWithdrawSuccessAlert] =
		useState(false);
	const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
	const [processingDate, setProcessingDate] = useState("");

	// Calculate receive amount based on pay amount (300% return)
	useEffect(() => {
		if (payAmount && !isNaN(Number(payAmount))) {
			const investmentAmount = Number(payAmount);
			const returnAmount = (investmentAmount * 3).toFixed(2); // 300% return
			setReceiveAmount(returnAmount);

			// Calculate maturity date (1050 days from now)
			const today = new Date();
			const futureDate = new Date(today);
			futureDate.setDate(today.getDate() + 1050);
			setMaturityDate(
				futureDate.toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
				}),
			);

			// Validate against Stripe balance
			if (investmentAmount > STRIPE_BALANCE) {
				setError("Insufficient balance in Stripe account.");
			} else {
				setError(null);
			}
		} else {
			setReceiveAmount("0");
			setMaturityDate("");
		}
	}, [payAmount]);

	// Calculate USD amount based on gold amount to sell
	useEffect(() => {
		if (sellAmount && !isNaN(Number(sellAmount))) {
			const goldAmount = Number(sellAmount);
			// Convert gold to USD (using a 1/3 ratio for simplicity)
			const usdAmount = (goldAmount / 3).toFixed(2);
			setReceiveUsdAmount(usdAmount);

			// Calculate processing date (3 days from now)
			const today = new Date();
			const processDate = new Date(today);
			processDate.setDate(today.getDate() + 3);
			setProcessingDate(
				processDate.toLocaleDateString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
				}),
			);

			// Validate against Gold balance
			if (goldAmount > GOLD_BALANCE) {
				setWithdrawError("Insufficient gold balance in your account.");
			} else {
				setWithdrawError(null);
			}
		} else {
			setReceiveUsdAmount("0");
			setProcessingDate("");
		}
	}, [sellAmount]);

	const handleBuy = () => {
		if (!payAmount) {
			return;
		}

		if (Number(payAmount) > STRIPE_BALANCE) {
			setError("Insufficient balance in Stripe account.");
			return;
		}

		// Set loading state
		setIsLoading(true);

		// Simulate transaction processing
		setTimeout(() => {
			if (onBuy && payAmount) {
				onBuy(payAmount);
			}

			// Transaction complete
			setIsLoading(false);

			// Show success alert
			setShowSuccessAlert(true);

			// Hide alert after 5 seconds
			setTimeout(() => {
				setShowSuccessAlert(false);
			}, 5000);
		}, 2000); // Simulate 2 second transaction processing time
	};

	const handleWithdraw = () => {
		if (!sellAmount) {
			return;
		}

		if (Number(sellAmount) > GOLD_BALANCE) {
			setWithdrawError("Insufficient gold balance in your account.");
			return;
		}

		// Set loading state
		setIsWithdrawLoading(true);

		// Simulate transaction processing
		setTimeout(() => {
			if (onSell && sellAmount) {
				onSell(sellAmount);
			}

			// Transaction complete
			setIsWithdrawLoading(false);

			// Show success alert
			setShowWithdrawSuccessAlert(true);

			// Hide alert after 5 seconds
			setTimeout(() => {
				setShowWithdrawSuccessAlert(false);
			}, 5000);
		}, 2000); // Simulate 2 second transaction processing time
	};

	return (
		<div className="w-full bg-white rounded-lg min-w-[360px] ">
			{showSuccessAlert && (
				<Alert className="mb-4 bg-green-50 border-green-200 p">
					<CheckCircle className="h-4 w-4 text-green-500" />
					<AlertTitle className="text-green-700">
						Purchase Successful!
					</AlertTitle>
				</Alert>
			)}

			{showWithdrawSuccessAlert && (
				<Alert className="mb-4 bg-green-50 border-green-200">
					<CheckCircle className="h-4 w-4 text-green-500" />
					<AlertTitle className="text-green-700">
						Withdrawal Successful!
					</AlertTitle>
					<AlertDescription className="text-green-600">
						Your gold withdrawal of ${sellAmount} has been processed
						successfully. You will receive ${receiveUsdAmount} by{" "}
						{processingDate}.
					</AlertDescription>
				</Alert>
			)}

			<Tabs defaultValue="buy">
				<div className="flex border-b border-gray-200">
					<TabsList className="w-full bg-transparent border-b-0 p-0 h-auto">
						<TabsTrigger
							value="buy"
							className="flex-1 m-3 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none m-3 p-3 rounded-xl"
						>
							Buy
						</TabsTrigger>
						<TabsTrigger
							value="withdraw"
							className="flex-1 rounded-none data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-none m-3 p-3 rounded-xl"
						>
							Withdraw
						</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="buy" className="p-4 space-y-2">
					<h2 className="text-xl font-bold my-2">Buy Gold</h2>

					{/* Pay amount */}
					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">Pay</label>
							<div className="flex items-center">
								<Button variant="ghost" size="sm" className="h-6 px-2">
									<span className="flex items-center">
										<img
											src="/image/us-flag.png?height=40&width=40"
											alt="USD flag"
											className="h-10 w-10 mr-1"
										/>
										USD
									</span>
								</Button>
							</div>
						</div>
						<div className="bg-gray-50 rounded-xl p-3">
							<div className="flex items-center">
								<Select value={payAmount} onValueChange={setPayAmount}>
									<SelectTrigger className="border-0 p-0 h-auto text-lg font-medium bg-transparent focus:ring-0">
										<SelectValue placeholder="Choose a package" />
									</SelectTrigger>
									<SelectContent>
										{INVESTMENT_PACKAGES.map((pkg) => (
											<SelectItem key={pkg.value} value={pkg.value}>
												{pkg.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{error && (
								<div className="text-red-500 text-xs mt-2">{error}</div>
							)}
						</div>
						<div className="text-xs text-gray-500 mt-3">
							Account Balance: ${STRIPE_BALANCE.toLocaleString()}
						</div>
					</div>

					{/* Receive amount */}
					<div className="space-y-2 ">
						<div className="flex justify-between">
							<label className="text-sm font-medium">Receive</label>
							<div className="flex items-center">
								<Button variant="ghost" size="sm" className="h-6 px-2">
									<span className="flex items-center">
										<div className="h-5 w-5 rounded-full bg-amber-700 flex items-center justify-center mr-1">
											<span className="text-white text-xs">X</span>
										</div>
										USXW
									</span>
								</Button>
							</div>
						</div>
						<div className="bg-gray-100 rounded-xl p-3">
							<div className="flex items-center">
								<span className="text-gray-500 mr-1">=</span>
								<span className="text-lg font-medium">${receiveAmount}</span>
							</div>
							{maturityDate && (
								<div className="text-xs text-gray-500 mt-1">
									Maturity date: {maturityDate}
								</div>
							)}
						</div>
					</div>

					{/* Fee and return information */}
					<div className="flex justify-between text-sm py-2">
						<div className="text-gray-500">Fees incl. $0.00</div>
						<div className="text-gray-500">300% return over 1050 days</div>
					</div>

					{/* Buy button */}
					<Button
						className="w-full p-6 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed"
						size="lg"
						onClick={handleBuy}
						disabled={!payAmount || !!error || isLoading}
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Processing...
							</span>
						) : (
							"Buy Gold"
						)}
					</Button>
				</TabsContent>

				<TabsContent value="withdraw" className=" p-4 space-y-2">
					<h2 className="text-xl font-bold my-2">Withdraw Gold</h2>

					{/* Sell amount */}
					<div className="space-y-2">
						<div className="flex justify-between">
							<label className="text-sm font-medium">Sell</label>
							<div className="flex items-center">
								<Button variant="ghost" size="sm" className="h-6 px-2">
									<span className="flex items-center">
										<div className="h-5 w-5 rounded-full bg-amber-700 flex items-center justify-center mr-1">
											<span className="text-white text-xs">X</span>
										</div>
										USXW
									</span>
								</Button>
							</div>
						</div>
						<div className="bg-gray-50 rounded-xl p-3">
							<div className="flex items-center">
								<Select value={sellAmount} onValueChange={setSellAmount}>
									<SelectTrigger className="border-0 p-0 h-auto text-lg font-medium bg-transparent focus:ring-0">
										<SelectValue placeholder="Choose a package" />
									</SelectTrigger>
									<SelectContent>
										{WITHDRAWAL_PACKAGES.map((pkg) => (
											<SelectItem key={pkg.value} value={pkg.value}>
												{pkg.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							{withdrawError && (
								<div className="text-red-500 text-xs mt-2">{withdrawError}</div>
							)}
						</div>
						<div className="text-xs text-gray-500 mt-3">
							Gold Balance: ${GOLD_BALANCE.toLocaleString()}
						</div>
					</div>

					{/* Receive USD amount */}
					<div className="space-y-2 ">
						<div className="flex justify-between">
							<label className="text-sm font-medium">Receive</label>
							<div className="flex items-center">
								<Button variant="ghost" size="sm" className="h-6 px-2">
									<span className="flex items-center">
										<img
											src="/placeholder.svg?height=20&width=20"
											alt="USD flag"
											className="h-5 w-5 mr-1"
										/>
										USD
										<span className="ml-1">▼</span>
									</span>
								</Button>
							</div>
						</div>
						<div className="bg-gray-100 rounded-xl p-3">
							<div className="flex items-center">
								<span className="text-gray-500 mr-1">=</span>
								<span className="text-lg font-medium">${receiveUsdAmount}</span>
							</div>
							{processingDate && (
								<div className="text-xs text-gray-500 mt-1">
									Processing date: {processingDate}
								</div>
							)}
						</div>
					</div>

					{/* Fee and processing information */}
					<div className="flex justify-between text-sm py-2">
						<div className="text-gray-500">Fees incl. $0.00</div>
						<div className="text-gray-500">Processing time: 3 days</div>
					</div>

					{/* Withdraw button */}
					<Button
						className="w-full p-6 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
						size="lg"
						onClick={handleWithdraw}
						disabled={!sellAmount || !!withdrawError || isWithdrawLoading}
					>
						{isWithdrawLoading ? (
							<span className="flex items-center justify-center">
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Processing...
							</span>
						) : (
							"Withdraw Gold"
						)}
					</Button>
				</TabsContent>
			</Tabs>
		</div>
	);
}
