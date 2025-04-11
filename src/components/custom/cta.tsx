import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CTASection() {
	return (
		<div className="w-full py-16 md:py-24 flex justify-center items-center px-4">
			<div className="w-full max-w-8xl bg-gradient-to-br from-gold to-gold/40 rounded-3xl overflow-hidden relative">
				<div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
				<div className="container mx-auto px-4 md:px-6 text-center relative z-10 mt-10 md:mt-16 lg:mt-24 mb-8">
					<div className="max-w-4xl mx-auto">
						<h2 className="w-full text-3xl md:text-5xl lg:text-6xl font-bold mb-12 leading-tight text-white">
							Golden opportunities for a brighter tomorrow
						</h2>

						<Link
							href="/register"
							className="group inline-flex items-center justify-center rounded-full border border-white bg-transparent hover:bg-white/10 transition-colors px-8 py-4 text-base font-medium text-white"
						>
							Join Us Today
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</div>
				</div>

				{/* Image below the content */}
				<div className="flex justify-center w-full">
					<div className="relative w-full max-w-4xl aspect-[5/2]">
						<Image
							src="/image/mint.png"
							alt="Gold and bullion"
							layout="fill"
							objectFit="cover"
							objectPosition="center top"
							quality={100}
							className="rounded-b-3xl"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
