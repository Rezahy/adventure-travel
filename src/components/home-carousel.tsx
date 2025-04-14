"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import ImageAsset from "@/../public/image-asset.jpeg";

const HomeCarousel = () => {
	return (
		<Carousel
			className="w-full h-[400px]"
			plugins={[
				Autoplay({
					delay: 2000,
				}),
				Fade(),
			]}
		>
			<CarouselContent className="ml-0">
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index} className="p-1">
						<div className="h-[400px] w-full rounded-md object-cover overflow-hidden text-white">
							<Image
								src={ImageAsset}
								alt="image"
								width={500}
								height={500}
								className="h-full object-cover w-full"
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{/* <CarouselPrevious />
			<CarouselNext /> */}
		</Carousel>
	);
};

export default HomeCarousel;
