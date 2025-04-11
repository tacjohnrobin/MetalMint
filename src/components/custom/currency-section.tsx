import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function DigitalCurrenciesSection() {
	return (
		<section className="w-full py-12 x-4 md:px-6 lg:px-8">
			<div className="container mx-auto max-w-7xl">
				<div className="md:hidden mb-12">
					<h2 className="text-3xl text-center md:text-4xl  font-bold mb-4">
						Digital currencies fully backed by physical gold
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Gold Card [#8b7547] */}
					<div className="rounded-lg overflow-hidden bg-gold text-white">
						<div className="p-8 pb-0">
							<h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
								MetalMint Gold (USXW)
							</h3>
							<p className="text-center mb-6 text-sm">
								1 MetalMint Gold (USXW) = 1 gram of physical gold bullion.
							</p>
							<div className="flex justify-center mb-6">
								<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/50 text-sm hover:bg-white/10 transition-colors">
									Learn more <ArrowRight size={16} />
								</button>
							</div>
						</div>
						<div className="relative h-64 lg:h-[350px] overflow-hidden">
							<div className="absolute bottom-[-40%] left-1/2 transform -translate-x-1/2 w-[90%]">
								<Image
									src="/image/coins (1).png"
									width={400}
									height={400}
									alt="Gold bullion bars"
									className="w-full md:h-auto h-[350px] "
									priority
								/>
							</div>
						</div>
					</div>

					<div className="rounded-lg overflow-hidden   ">
						<div className="hidden md:flex mt-12">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
								Digital currencies fully backed by physical gold
							</h2>
						</div>
						<p className="md:text-lg">
							MetalMint Gold (USXW) is a token backed 1:1 by 1 gram of physical
							gold bullion. It combines the stability of gold with the
							flexibility of blockchain, enabling secure, transparent, and
							fractional ownership of real-world gold assets.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
