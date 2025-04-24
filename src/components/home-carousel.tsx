"use client";

import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { getCarouselData } from "@/actions/postAction";

type HomeCarouselProps = {
	images: Awaited<ReturnType<typeof getCarouselData>>;
};

const HomeCarousel = ({ images }: HomeCarouselProps) => {
	const [api, setApi] = React.useState<CarouselApi>();
	const [isHovering, setIsHovering] = React.useState(false);
	const [current, setCurrent] = React.useState(0);
	const [count, setCount] = React.useState(images.length);
	React.useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);
	if (count > 0) {
		return (
			<>
				<Carousel
					setApi={setApi}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
					className="w-full h-[400px]"
					opts={{ align: "start", loop: true }}
					plugins={[
						Autoplay({
							delay: 5000,
						}),
						Fade(),
					]}
				>
					<CarouselContent className="ml-0 relative">
						{images.map((image) => (
							<CarouselItem key={image.id} className="p-1">
								<div className="h-[400px] w-full rounded-md object-cover overflow-hidden text-white">
									<Image
										src={image.imageUrl}
										key={image.id}
										alt={image.title}
										width={1000}
										height={1000}
										className="h-full object-cover w-full"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					{count > 1 && (
						<AnimatePresence initial={false}>
							{isHovering ? (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<CarouselPrevious
										className="absolute left-4"
										variant="secondary"
									/>
									<CarouselNext
										className="absolute right-4"
										variant="secondary"
									/>
								</motion.div>
							) : null}
						</AnimatePresence>
					)}

					{count > 1 && (
						<div className="flex justify-center relative bottom-10 py-2">
							{Array.from({ length: count }).map((_, index) => (
								<span
									key={index}
									className={cn(
										"cursor-pointer inline-block w-9 h-1 rounded-full transition-colors duration-300 bg-black/20 mx-2",
										index + 1 === current && "bg-white"
									)}
									onClick={() => api && api.scrollTo(index)}
								/>
							))}
						</div>
					)}
				</Carousel>
			</>
		);
	}
};

export default HomeCarousel;
