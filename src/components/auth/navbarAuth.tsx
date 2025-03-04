import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
	return (
		<div className="w-full flex h-16 items-center justify-between bg-background/20 mb-12 md:mb-0 md:px-6 lg:px-12 pt-4 md:pt-6 lg:pt-8">
			<Link href="/" className="flex items-center space-x-2">
				<Image
					src="/icons/favi.svg"
					alt="MetalMint Logo"
					width={32}
					height={32}
					className="w-6 h-6"
				/>
				<span className=" text-2xl md:text-3xl font-semibold">MetalMint</span>
			</Link>
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					className="p-4 md:p-6 bg-gray-20 text-black "
					asChild
				>
					<Link href="/register ">Sign Up</Link>
				</Button>
			</div>
		</div>
	);
}
