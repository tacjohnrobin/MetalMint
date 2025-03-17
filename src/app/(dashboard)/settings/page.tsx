import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, AlertCircle, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AccountPage() {
	return (
		<div className="container mx-auto max-w-5xl rounded-2xl bg-white p-6">
			<div className="mb-8">
				<div className="flex items-start justify-between">
					<div className="flex items-start gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-300 text-gray-800">
							QC
						</div>
						<div className="space-y-4">
							<h1 className="text-xl font-bold text-gray-900">
								Qubo Creatives
							</h1>
							<p className="text-sm text-gray-500">
								Created 15 February 2024, 18:13 PM
							</p>
							<div className="mt-1 flex items-center gap-3">
								<div className="flex items-center gap-1 rounded-full bg-amber-50 p-2 text-xs text-amber-800">
									<AlertCircle className="h-3 w-3" />
									<span>Unverified</span>
								</div>
								<div className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
									Personal
								</div>
							</div>
						</div>
					</div>
					<Link
						href="/accounts"
						className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800"
					>
						<ArrowLeft className="h-4 w-4" />
						Return to Accounts
					</Link>
				</div>
			</div>

			<Tabs defaultValue="profile" className="w-full">
				<TabsList className="mb-6 w-full border-b bg-transparent p-0">
					<div className="flex overflow-x-auto">
						<TabsTrigger
							value="profile"
							className="border-b-2 font-medium border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:text-emerald-700 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:bg-gray-70 data-[state=active]:border-b-4"
						>
							Profile
						</TabsTrigger>
						<TabsTrigger
							value="bank-details"
							className="border-b-2 font-medium border-transparent px-4 py-2 text-sm font-medium text-gray-500 hover:text-emerald-700 data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 data-[state=active]:bg-gray-70 data-[state=active]:border-b-4"
						>
							Bank Details
						</TabsTrigger>
					</div>
				</TabsList>

				<TabsContent value="profile" className="mt-0 ">
					<div className="space-y-6">
						<div>
							<h2 className="mb-6 text-xl font-bold text-gray-900">
								Profile information
							</h2>
							<div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
								<div>
									<label
										htmlFor="first-name"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										First name
									</label>
									<input
										id="first-name"
										defaultValue="Qubo"
										className="w-full rounded-md border font-medium border-gray-200 bg-gray-50 px-3 py-2 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
										disabled
									/>
								</div>
								<div>
									<label
										htmlFor="last-name"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										Last name
									</label>
									<input
										id="last-name"
										defaultValue="Creatives"
										className="w-full rounded-md font-medium border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="border-t border-gray-200 pt-6">
							<h2 className="mb-6 text-xl font-bold text-gray-900">
								Account information
							</h2>
							<div className="space-y-6 max-w-2xl">
								<div>
									<label
										htmlFor="email"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										Email Address
									</label>
									<input
										id="email"
										type="email"
										defaultValue="quboafrica@gmail.com"
										className="w-full font-medium rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 "
										disabled
									/>
								</div>
								<div>
									<label
										htmlFor="identification"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										MetalMint identification number (MIN)
									</label>
									<input
										id="identification"
										defaultValue="KM00071079"
										className="w-full rounded-md border text-semibold border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
										disabled
									/>
								</div>
							</div>
						</div>

						<div className="border-t border-gray-200 pt-6">
							<div className="mb-6 flex items-center justify-between">
								<h2 className="text-xl font-bold text-gray-900">
									Contact information
								</h2>
								<button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
									<Pencil className="h-3.5 w-3.5" />
									Edit
								</button>
							</div>
							<div>
								<div className="mb-1 flex">
									<div className="w-[120px] text-sm font-normal text-gray-500">
										Country code
									</div>
									<div className="text-sm font-normal text-gray-500">
										Mobile Number
									</div>
								</div>
								<div className="flex max-w-2xl">
									<div className="flex w-[120px] items-center gap-2 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-3 py-2">
										<Image
											src="/placeholder.svg?height=20&width=30"
											alt="Kenya flag"
											width={20}
											height={15}
											className="h-3.5 w-5 rounded-sm object-cover"
										/>
										<span className="text-gray-900">+254</span>
									</div>
									<input
										id="phone"
										defaultValue="758348514"
										className="flex-1 rounded-r-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="bank-details" className="mt-0">
					<div className="space-y-6">
						<div>
							<h2 className="mb-6 text-xl font-bold text-gray-900">
								Bank Account Details
							</h2>
							<div className="grid gap-6 sm:grid-cols-2">
								<div>
									<label
										htmlFor="account-name"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										Account Holder Name
									</label>
									<input
										id="account-name"
										defaultValue="Qubo Creatives Ltd"
										className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="account-number"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										Account Number
									</label>
									<input
										id="account-number"
										defaultValue="1234567890"
										className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="bank-name"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										Bank Name
									</label>
									<input
										id="bank-name"
										defaultValue="Standard Chartered"
										className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									/>
								</div>
								<div>
									<label
										htmlFor="branch-code"
										className="mb-1 block text-sm font-normal text-gray-500"
									>
										Branch Code
									</label>
									<input
										id="branch-code"
										defaultValue="SCB-001"
										className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
									/>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>

				{/*<TabsContent value="redemption" className="mt-0">
					<div className="flex h-40 items-center justify-center rounded-md border border-dashed">
						<p className="text-gray-500">Redemption content will appear here</p>
					</div>
				</TabsContent>

				<TabsContent value="mint-account" className="mt-0">
					<div className="flex h-40 items-center justify-center rounded-md border border-dashed">
						<p className="text-gray-500">
							Mint account content will appear here
						</p>
					</div>
				</TabsContent>

				<TabsContent value="api-keys" className="mt-0">
					<div className="flex h-40 items-center justify-center rounded-md border border-dashed">
						<p className="text-gray-500">API Keys content will appear here</p>
					</div>
				</TabsContent>

				<TabsContent value="contracking" className="mt-0">
					<div className="flex h-40 items-center justify-center rounded-md border border-dashed">
						<p className="text-gray-500">
							ConTracking API Keys content will appear here
						</p>
					</div>
				</TabsContent>

				<TabsContent value="api-docs" className="mt-0">
					<div className="flex h-40 items-center justify-center rounded-md border border-dashed">
						<p className="text-gray-500">API Documentation will appear here</p>
					</div>
				</TabsContent>

				<TabsContent value="fees" className="mt-0">
					<div className="flex h-40 items-center justify-center rounded-md border border-dashed">
						<p className="text-gray-500">Fees information will appear here</p>
					</div>
				</TabsContent>*/}
			</Tabs>
		</div>
	);
}
