import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
	return (
		<div className="w-full flex h-16 items-center justify-center bg-background/20 mb-12 md:mb-12 px-6 lg:px-12 pt-4 md:pt-6 lg:pt-8">
			<Link href="/" className="flex items-center space-x-2">
				<Image
					src="/icons/favi.svg"
					alt="MetalMint Logo"
					width={32}
					height={32}
					className="w-6 h-6"
				/>
				<span className=" text-2xl font-semibold text-gold">MetalMint</span>
			</Link>
		</div>
	);
}
