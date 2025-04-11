"use client";

import {
	CreditCard,
	Shield,
	TrendingUp,
	Coins,
	DollarSign,
	Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Herobento() {
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					variants={fadeIn}
					className="text-center mb-16"
				>
					<h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
						Protect your spending & savings with precious metals
					</h2>
					<p className="text-slate-600 max-w-2xl mx-auto">
						Secure your financial future with physical gold and silver that
						works like modern money.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
					{/* Feature 1: Spend gold & silver - Large card */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
						variants={fadeIn}
						className="col-span-1 md:col-span-6 lg:col-span-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow group"
					>
						<div className="flex flex-col h-full">
							<div className="mb-6">
								<div className="w-14 h-14 bg-amber-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
									<CreditCard className="w-7 h-7 text-amber-700" />
								</div>
								<h3 className="text-2xl font-bold text-slate-900 mb-3">
									Spend gold & silver
								</h3>
								<p className="text-slate-700 mb-6 max-w-xl">
									Use gold and silver as money, anywhere MasterCard is accepted.
									Your precious metals are instantly converted at the current
									market rate.
								</p>
							</div>
							<div className="mt-auto flex items-center space-x-4">
								<div className="flex -space-x-2">
									<div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center">
										<Coins className="w-5 h-5 text-amber-700" />
									</div>
									<div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
										<CreditCard className="w-5 h-5 text-slate-700" />
									</div>
								</div>
								<span className="text-sm text-slate-600">
									Accepted worldwide
								</span>
							</div>
						</div>
					</motion.div>

					{/* Feature 2: Manage your wealth */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
						variants={fadeIn}
						className="col-span-1 md:col-span-3 lg:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="w-12 h-12 bg-blue-200 rounded-2xl flex items-center justify-center mb-6">
							<TrendingUp className="w-6 h-6 text-blue-700" />
						</div>
						<h3 className="text-xl font-bold text-slate-900 mb-3">
							Manage your wealth
						</h3>
						<p className="text-slate-700">
							Keep your hard-earned savings safe with physical precious metals
							that hedge against inflation.
						</p>
					</motion.div>

					{/* Feature 3: Secure storage */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.3 }}
						variants={fadeIn}
						className="col-span-1 md:col-span-3 lg:col-span-4 bg-gradient-to-br from-slate-50 to-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="w-12 h-12 bg-slate-300 rounded-2xl flex items-center justify-center mb-6">
							<Shield className="w-6 h-6 text-slate-700" />
						</div>
						<h3 className="text-xl font-bold text-slate-900 mb-3">
							Secure storage
						</h3>
						<p className="text-slate-700">
							Your gold and silver are safely stored in our world-class vaults
							with full insurance.
						</p>
					</motion.div>

					{/* Feature 4: Real-time tracking */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.4 }}
						variants={fadeIn}
						className="col-span-1 md:col-span-3 lg:col-span-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="w-12 h-12 bg-emerald-200 rounded-2xl flex items-center justify-center mb-6">
							<DollarSign className="w-6 h-6 text-emerald-700" />
						</div>
						<h3 className="text-xl font-bold text-slate-900 mb-3">
							Real-time tracking
						</h3>
						<p className="text-slate-700">
							Monitor your precious metals portfolio with real-time market
							prices and performance metrics.
						</p>
					</motion.div>

					{/* Feature 5: Insured protection */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.5 }}
						variants={fadeIn}
						className="col-span-1 md:col-span-3 lg:col-span-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="w-12 h-12 bg-purple-200 rounded-2xl flex items-center justify-center mb-6">
							<Lock className="w-6 h-6 text-purple-700" />
						</div>
						<h3 className="text-xl font-bold text-slate-900 mb-3">
							Insured protection
						</h3>
						<p className="text-slate-700">
							Every ounce of your precious metals is fully insured against
							theft, damage, or loss, giving you complete peace of mind.
						</p>
					</motion.div>
				</div>

				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.6 }}
					variants={fadeIn}
					className="mt-12 text-center"
				>
					<button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
						Get started today
					</button>
				</motion.div>
			</div>
		</section>
	);
}
