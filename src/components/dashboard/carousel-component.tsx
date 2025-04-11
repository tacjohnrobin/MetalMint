"use client";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

import {
	Gold,
	TradingViewWidget1,
	Litecoin,
	Ethereum,
	KinesisGold,
	Silver,
	Bitcoin,
} from "./widgetSmall";

// Import your components

export default function CryptoCarousel() {
	return (
		<div className="mb-4">
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-4">
					{/* Each item will take up different widths based on screen size */}
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5 shadow-lg rounded-lg ">
						<Gold />
					</CarouselItem>
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
						<TradingViewWidget1 />
					</CarouselItem>
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
						<Litecoin />
					</CarouselItem>
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
						<Ethereum />
					</CarouselItem>
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
						<Bitcoin />
					</CarouselItem>
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
						<KinesisGold />
					</CarouselItem>
					<CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
						<Silver />
					</CarouselItem>
				</CarouselContent>
				<CarouselPrevious className="left-2" />
				<CarouselNext className="right-2" />
			</Carousel>
		</div>
	);
}
