import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CTASection() {
	return (
		<div className="w-full py-16 md:py-24  flex justify-center items-center px-4">
			<div className="w-full max-w-8xl bg-emerald-600 text-white rounded-3xl overflow-hidden relative">
				<div className="container mx-auto px-4 md:px-6 text-center relative z-10  mt-10 md:mt-16 lg:mt-24 mb-8 ">
					<div className="max-w-4xl mx-auto">
						<h2 className="w-full text-3xl md:text-5xl lg:text-6xl font-bold mb-12 leading-tight">
							Golden opportunities for a brighter tomorrow
						</h2>

						<Link
							href="/register"
							className="group inline-flex items-center justify-center rounded-full border border-white bg-transparent hover:bg-black/10 transition-colors px-8 py-4 text-base font-medium text-white"
						>
							Join Us Today
						</Link>
					</div>
				</div>

				{/* Image below the content */}
				<div className="flex justify-center w-full">
					<div className="relative w-full max-w-4xl aspect-[5/2]  ">
						<Image
							src="/image/mint.png"
							alt="Gold and bullion"
							layout="fill"
							objectFit="cover"
							objectPosition="center top"
							quality={100}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
