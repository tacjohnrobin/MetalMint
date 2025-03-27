"use client";

import { useState, useEffect } from "react";
import {
	Search,
	ArrowUpDown,
	Calendar,
	X,
	Copy,
	Check,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { DateRange } from "react-day-picker";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

// Define transaction type
export interface Transaction {
	id: string;
	type: string;
	amount: number;
	date: Date;
	status: string;
	description: string;
}

interface TransactionTableProps {
	transactions: Transaction[];
	className?: string;
}

// Items per page for pagination
const ITEMS_PER_PAGE = 10;

export function TransactionTable({
	transactions,
	className = "",
}: TransactionTableProps) {
	// Transaction history states
	const [filteredTransactions, setFilteredTransactions] =
		useState(transactions);
	const [searchQuery, setSearchQuery] = useState("");
	const [typeFilter, setTypeFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof Transaction;
		direction: "ascending" | "descending";
	} | null>({ key: "date", direction: "descending" });

	// Pagination states
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [paginatedTransactions, setPaginatedTransactions] = useState<
		Transaction[]
	>([]);

	// Copy transaction state
	const [copiedTransactionId, setCopiedTransactionId] = useState<string | null>(
		null,
	);

	// Loading states
	const [isLoading, setIsLoading] = useState(true);
	const [isPageChanging, setIsPageChanging] = useState(false);

	// Update filtered transactions when source transactions change
	useEffect(() => {
		// Simulate initial loading
		setIsLoading(true);
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	// Filter and sort transactions
	useEffect(() => {
		let result = [...transactions];

		// Apply type filter
		if (typeFilter !== "all") {
			result = result.filter((transaction) => transaction.type === typeFilter);
		}

		// Apply status filter
		if (statusFilter !== "all") {
			result = result.filter(
				(transaction) => transaction.status === statusFilter,
			);
		}

		// Apply date range filter
		if (dateRange?.from) {
			result = result.filter((transaction) => {
				const txDate = new Date(transaction.date);
				if (dateRange.from && dateRange.to) {
					return txDate >= dateRange.from && txDate <= dateRange.to;
				} else if (dateRange.from) {
					return txDate >= dateRange.from;
				}
				return true;
			});
		}

		// Apply search query
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(transaction) =>
					transaction.amount.toString().includes(query) ||
					transaction.description.toLowerCase().includes(query) ||
					transaction.id.toLowerCase().includes(query),
			);
		}

		// Apply sorting
		if (sortConfig) {
			result.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
			});
		}

		setFilteredTransactions(result);

		// Calculate total pages for pagination
		setTotalPages(Math.ceil(result.length / ITEMS_PER_PAGE));

		// Reset to first page when filters change
		setCurrentPage(1);
	}, [
		transactions,
		searchQuery,
		typeFilter,
		statusFilter,
		dateRange,
		sortConfig,
	]);

	// Handle pagination
	useEffect(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
		const endIndex = startIndex + ITEMS_PER_PAGE;
		setPaginatedTransactions(filteredTransactions.slice(startIndex, endIndex));
	}, [filteredTransactions, currentPage]);

	const handleSort = (key: keyof Transaction) => {
		let direction: "ascending" | "descending" = "ascending";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		) {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const clearFilters = () => {
		setSearchQuery("");
		setTypeFilter("all");
		setStatusFilter("all");
		setDateRange(undefined);
	};

	const getStatusBadge = (status: string) => {
		switch (status) {
			case "Completed":
				return (
					<Badge className="bg-green-100 text-green-500 hover:bg-green-200 rounded-3xl border border-green-400">
						Completed
					</Badge>
				);
			case "Pending":
				return (
					<Badge className="bg-yellow-100 text-yellow-500 hover:bg-yellow-200 border border-yellow-400 rounded-3xl">
						Pending
					</Badge>
				);
			case "Failed":
				return (
					<Badge className="bg-red-100 text-red-500 hover:bg-red-200 border border-red-400 rounded-3xl">
						Failed
					</Badge>
				);
			default:
				return <Badge>{status}</Badge>;
		}
	};

	const handleCopyTransaction = (id: string) => {
		// Find the transaction
		const transaction = transactions.find((t) => t.id === id);
		if (transaction) {
			// Create a text representation of the transaction
			const transactionText = `Transaction ID: ${transaction.id}
Type: ${transaction.type}
Amount: $${transaction.amount}
Date: ${format(transaction.date, "PPpp")}
Status: ${transaction.status}
Description: ${transaction.description}`;

			// Copy to clipboard
			navigator.clipboard.writeText(transactionText).then(() => {
				// Set copied state for visual feedback
				setCopiedTransactionId(id);

				// Reset after 2 seconds
				setTimeout(() => {
					setCopiedTransactionId(null);
				}, 2000);
			});
		}
	};

	// Skeleton loader for transaction table
	const TransactionTableSkeleton = () => {
		return (
			<>
				<Table className="bg-white border border-gray-200">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">
								<div className="flex items-center gap-1">
									<Skeleton className="h-4 w-10" />
									<Skeleton className="h-3 w-3 rounded-full" />
								</div>
							</TableHead>
							<TableHead>
								<div className="flex items-center gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-3 w-3 rounded-full" />
								</div>
							</TableHead>
							<TableHead className="min-w-[180px]">
								<div className="flex items-center gap-1">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-3 w-3 rounded-full" />
								</div>
							</TableHead>
							<TableHead>
								<div className="flex items-center gap-1">
									<Skeleton className="h-4 w-14" />
									<Skeleton className="h-3 w-3 rounded-full" />
								</div>
							</TableHead>
							<TableHead>
								<Skeleton className="h-4 w-20" />
							</TableHead>
							<TableHead className="w-[60px]">
								<Skeleton className="h-4 w-14" />
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 10 }).map((_, index) => (
							<TableRow key={index}>
								<TableCell>
									<Skeleton className="h-6 w-16" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-20" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-5 w-36" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-6 w-20" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-32" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-8 w-8 rounded-full" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{/* Skeleton for pagination */}
				<div className="flex items-center justify-between mt-4">
					<Skeleton className="h-4 w-48" />
					<div className="flex items-center space-x-2">
						<Skeleton className="h-8 w-8" />
						<div className="flex items-center gap-1">
							{Array.from({ length: 5 }).map((_, i) => (
								<Skeleton key={i} className="h-8 w-8" />
							))}
						</div>
						<Skeleton className="h-8 w-8" />
					</div>
				</div>
			</>
		);
	};

	// Skeleton loader for filters
	const FiltersSkeleton = () => {
		return (
			<Card className="mb-4">
				<CardContent className="p-4">
					<div className="grid gap-4 md:grid-cols-4">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</CardContent>
			</Card>
		);
	};

	return (
		<div className={`space-y-4 ${className}`}>
			<h2 className="text-xl font-bold my-2">Transaction History</h2>

			{/* Filters and search */}
			{isLoading ? (
				<FiltersSkeleton />
			) : (
				<Card className="mb-4">
					<CardContent className="p-4">
						<div className="grid gap-4 md:grid-cols-4">
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search transactions..."
									className="pl-8"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>

							<Select value={typeFilter} onValueChange={setTypeFilter}>
								<SelectTrigger>
									<SelectValue placeholder="Filter by type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Types</SelectItem>
									<SelectItem value="Buy">Buy</SelectItem>
									<SelectItem value="Withdraw">Withdraw</SelectItem>
								</SelectContent>
							</Select>

							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger>
									<SelectValue placeholder="Filter by status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Statuses</SelectItem>
									<SelectItem value="Completed">Completed</SelectItem>
									<SelectItem value="Pending">Pending</SelectItem>
									<SelectItem value="Failed">Failed</SelectItem>
								</SelectContent>
							</Select>

							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className={`w-full justify-start text-left font-normal ${
											!dateRange ? "text-muted-foreground" : ""
										}`}
									>
										<Calendar className="mr-2 h-4 w-4" />
										{dateRange?.from ? (
											dateRange.to ? (
												<>
													{format(dateRange.from, "LLL dd, y")} -{" "}
													{format(dateRange.to, "LLL dd, y")}
												</>
											) : (
												format(dateRange.from, "LLL dd, y")
											)
										) : (
											<span>Date range</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<CalendarComponent
										initialFocus
										mode="range"
										defaultMonth={dateRange?.from}
										selected={dateRange}
										onSelect={setDateRange}
										numberOfMonths={2}
									/>
								</PopoverContent>
							</Popover>
						</div>

						{/* Active filters */}
						{(typeFilter !== "all" ||
							statusFilter !== "all" ||
							dateRange ||
							searchQuery) && (
							<div className="flex flex-wrap gap-2 mt-4">
								<div className="text-sm text-muted-foreground mr-2">
									Active filters:
								</div>

								{typeFilter !== "all" && (
									<Badge variant="outline" className="flex items-center gap-1">
										Type: {typeFilter}
										<Button
											variant="ghost"
											size="sm"
											className="h-4 w-4 p-0 hover:bg-transparent"
											onClick={() => setTypeFilter("all")}
										>
											<X className="h-3 w-3" />
											<span className="sr-only">Remove filter</span>
										</Button>
									</Badge>
								)}

								{statusFilter !== "all" && (
									<Badge variant="outline" className="flex items-center gap-1">
										Status: {statusFilter}
										<Button
											variant="ghost"
											size="sm"
											className="h-4 w-4 p-0 hover:bg-transparent"
											onClick={() => setStatusFilter("all")}
										>
											<X className="h-3 w-3" />
											<span className="sr-only">Remove filter</span>
										</Button>
									</Badge>
								)}

								{dateRange && (
									<Badge variant="outline" className="flex items-center gap-1">
										Date:{" "}
										{dateRange.from ? format(dateRange.from, "MMM d") : ""}
										{dateRange.to ? ` - ${format(dateRange.to, "MMM d")}` : ""}
										<Button
											variant="ghost"
											size="sm"
											className="h-4 w-4 p-0 hover:bg-transparent"
											onClick={() => setDateRange(undefined)}
										>
											<X className="h-3 w-3" />
											<span className="sr-only">Remove filter</span>
										</Button>
									</Badge>
								)}

								{searchQuery && (
									<Badge variant="outline" className="flex items-center gap-1">
										Search: {searchQuery}
										<Button
											variant="ghost"
											size="sm"
											className="h-4 w-4 p-0 hover:bg-transparent"
											onClick={() => setSearchQuery("")}
										>
											<X className="h-3 w-3" />
											<span className="sr-only">Remove filter</span>
										</Button>
									</Badge>
								)}

								<Button
									variant="ghost"
									size="sm"
									className="text-xs h-7"
									onClick={clearFilters}
								>
									Clear all
								</Button>
							</div>
						)}
					</CardContent>
				</Card>
			)}

			{/* Transactions table */}
			<div className="rounded-md border">
				{isLoading ? (
					<TransactionTableSkeleton />
				) : (
					<>
						<Table className="bg-white">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">
										<Button
											variant="ghost"
											onClick={() => handleSort("type")}
											className="flex items-center gap-1 p-0 h-auto font-medium"
										>
											Type
											<ArrowUpDown className="h-3 w-3" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											onClick={() => handleSort("amount")}
											className="flex items-center gap-1 p-0 h-auto font-medium"
										>
											Amount
											<ArrowUpDown className="h-3 w-3" />
										</Button>
									</TableHead>
									<TableHead className="min-w-[180px]">
										<Button
											variant="ghost"
											onClick={() => handleSort("date")}
											className="flex items-center gap-1 p-0 h-auto font-medium"
										>
											Date & Time
											<ArrowUpDown className="h-3 w-3" />
										</Button>
									</TableHead>
									<TableHead>
										<Button
											variant="ghost"
											onClick={() => handleSort("status")}
											className="flex items-center gap-1 p-0 h-auto font-medium"
										>
											Status
											<ArrowUpDown className="h-3 w-3" />
										</Button>
									</TableHead>
									<TableHead>Description</TableHead>
									<TableHead className="w-[60px]">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{isPageChanging ? (
									// Show skeleton rows when changing pages
									Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
										<TableRow key={`skeleton-${index}`}>
											<TableCell>
												<Skeleton className="h-6 w-16" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-5 w-20" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-5 w-36" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-6 w-20" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-32" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-8 w-8 rounded-full" />
											</TableCell>
										</TableRow>
									))
								) : paginatedTransactions.length === 0 ? (
									<TableRow>
										<TableCell
											colSpan={6}
											className="text-center py-8 text-muted-foreground"
										>
											No transactions found matching your filters
										</TableCell>
									</TableRow>
								) : (
									paginatedTransactions.map((transaction) => (
										<TableRow key={transaction.id}>
											<TableCell>
												<Badge
													variant="outline"
													className={
														transaction.type === "Buy"
															? "bg-blue-50 text-blue-500 hover:bg-blue-40 p-1"
															: "bg-purple-50 text-purple-500 hover:bg-purple-40 p-1"
													}
												>
													{transaction.type}
												</Badge>
											</TableCell>
											<TableCell className="font-medium">
												${transaction.amount.toLocaleString()}
											</TableCell>
											<TableCell>{format(transaction.date, "PPpp")}</TableCell>
											<TableCell>
												{getStatusBadge(transaction.status)}
											</TableCell>
											<TableCell className="text-muted-foreground">
												{transaction.description}
											</TableCell>
											<TableCell>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleCopyTransaction(transaction.id)
																}
															>
																{copiedTransactionId === transaction.id ? (
																	<Check className="h-4 w-4 text-green-500" />
																) : (
																	<Copy className="h-4 w-4" />
																)}
															</Button>
														</TooltipTrigger>
														<TooltipContent>
															<p>
																{copiedTransactionId === transaction.id
																	? "Copied!"
																	: "Copy transaction details"}
															</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex items-center justify-between  px-6 py-4 border-t bg-white">
								<div className="text-sm text-muted-foreground">
									Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
									{Math.min(
										currentPage * ITEMS_PER_PAGE,
										filteredTransactions.length,
									)}{" "}
									of {filteredTransactions.length} transactions
								</div>
								<div className="flex items-center space-x-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											if (currentPage > 1) {
												setIsPageChanging(true);
												setTimeout(() => {
													setCurrentPage((prev) => Math.max(prev - 1, 1));
													setIsPageChanging(false);
												}, 800);
											}
										}}
										disabled={currentPage === 1 || isPageChanging}
									>
										<ChevronLeft className="h-4 w-4" />
										<span className="sr-only">Previous page</span>
									</Button>
									<div className="flex items-center gap-1">
										{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
											// Show pages around current page
											let pageToShow;
											if (totalPages <= 5) {
												pageToShow = i + 1;
											} else if (currentPage <= 3) {
												pageToShow = i + 1;
											} else if (currentPage >= totalPages - 2) {
												pageToShow = totalPages - 4 + i;
											} else {
												pageToShow = currentPage - 2 + i;
											}

											return (
												<Button
													key={pageToShow}
													variant={
														currentPage === pageToShow ? "default" : "outline"
													}
													size="sm"
													className="w-8 h-8"
													onClick={() => {
														if (currentPage !== pageToShow) {
															setIsPageChanging(true);
															setTimeout(() => {
																setCurrentPage(pageToShow);
																setIsPageChanging(false);
															}, 800);
														}
													}}
													disabled={isPageChanging}
												>
													{pageToShow}
												</Button>
											);
										})}
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => {
											if (currentPage < totalPages) {
												setIsPageChanging(true);
												setTimeout(() => {
													setCurrentPage((prev) =>
														Math.min(prev + 1, totalPages),
													);
													setIsPageChanging(false);
												}, 800);
											}
										}}
										disabled={currentPage === totalPages || isPageChanging}
									>
										<ChevronRight className="h-4 w-4" />
										<span className="sr-only">Next page</span>
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{/* Transaction summary */}
			{isLoading ? (
				<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
					{Array.from({ length: 3 }).map((_, i) => (
						<Card key={i}>
							<CardContent className="p-4">
								<Skeleton className="h-4 w-40 mb-2" />
								<Skeleton className="h-8 w-12" />
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="text-sm font-medium text-muted-foreground">
								Total Buy Transactions
							</div>
							<div className="text-2xl font-bold mt-1">
								{transactions.filter((t) => t.type === "Buy").length}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-sm font-medium text-muted-foreground">
								Total Withdraw Transactions
							</div>
							<div className="text-2xl font-bold mt-1">
								{transactions.filter((t) => t.type === "Withdraw").length}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-sm font-medium text-muted-foreground">
								Pending Transactions
							</div>
							<div className="text-2xl font-bold mt-1">
								{transactions.filter((t) => t.status === "Pending").length}
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
}
