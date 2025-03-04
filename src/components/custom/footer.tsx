import Link from "next/link";
import Image from "next/image";
import {
	ChevronDown,
	Twitter,
	Facebook,
	Instagram,
	Youtube,
	Send,
} from "lucide-react";

export default function Footer() {
	return (
		<footer className="w-full bg-[#FFFCF9] border-gray-100 pt-12 pb-6 md:pb-12 lg:pb-24">
			{/* Main footer links section */}
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Company Column */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Company</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									FAQ's
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Press & Media Kit
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Our Investors
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Partner with us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Careers
								</Link>
							</li>
						</ul>
					</div>

					{/* Products Column */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Products</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Gold Tokens
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Forex Trading
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Institutional Trading
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Secure Vault
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal Column */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Risk Disclosure
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-gray-700 hover:text-green-600 transition-colors"
								>
									Compliance & Regulations
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Us Column */}
					<div>
						<h3 className="font-semibold text-gray-900 mb-4">Contact us</h3>
						<p className="text-gray-700 mb-4">support@metalmint.com</p>
						<div className="flex space-x-4 mb-6">
							<Link
								href="#"
								aria-label="Twitter"
								className="text-gray-500 hover:text-green-600 transition-colors"
							>
								<Twitter size={18} />
							</Link>
							<Link
								href="#"
								aria-label="Facebook"
								className="text-gray-500 hover:text-green-600 transition-colors"
							>
								<Facebook size={18} />
							</Link>
							<Link
								href="#"
								aria-label="Instagram"
								className="text-gray-500 hover:text-green-600 transition-colors"
							>
								<Instagram size={18} />
							</Link>
							<Link
								href="#"
								aria-label="Youtube"
								className="text-gray-500 hover:text-green-600 transition-colors"
							>
								<Youtube size={18} />
							</Link>
							<Link
								href="#"
								aria-label="Telegram"
								className="text-gray-500 hover:text-green-600 transition-colors"
							>
								<Send size={18} />
							</Link>
						</div>
					</div>
				</div>

				<hr className="my-8 border-gray-100" />

				{/* Logo and Addresses */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					{/* Logo */}
					<div>
						<Link href="/" className="inline-block">
							<div className="flex col gap-2 items-center">
								<Image
									src="/icons/favi.svg"
									alt="Bamboo Logo"
									width={38}
									height={38}
									className="ml-1"
								/>
								<span className="text-3xl font-bold ">MetalMint</span>
							</div>
						</Link>
					</div>

					{/* Lagos Address */}
					<div>
						<h4 className="font-semibold text-gray-900 mb-2">Address 1</h4>
						<p className="text-gray-700 text-sm">
							123 Street, Road Avenue
							<br />
							city, Country.
						</p>
					</div>

					{/* San Francisco Address */}
					<div>
						<h4 className="font-semibold text-gray-900 mb-2">Address 2</h4>
						<p className="text-gray-700 text-sm">
							123 Street, Road Avenue
							<br />
							city, Country.
						</p>
					</div>
				</div>

				{/* Disclaimer */}
				<div className="mt-8 text-sm text-gray-500 leading-relaxed">
					<p>
						Metal Mint is a licensed trading platform providing access to
						gold-backed digital tokens and forex markets. Investments in
						precious metals and forex carry inherent risks, and market
						conditions may affect returns. Metal Mint does not offer investment
						advice; investors are encouraged to seek independent financial
						counsel. Trading services are facilitated through regulated
						financial partners. Past performance does not guarantee future
						results.
					</p>
					<br />

					<p>© Copyright 2025 - MetalMint. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
