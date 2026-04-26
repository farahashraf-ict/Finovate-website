import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SolutionCard, { type SolutionItem } from "./SolutionCard";

type SolutionsSectionProps = {
	solutions: SolutionItem[];
};

export default function SolutionsSection({ solutions }: SolutionsSectionProps) {
	const initialSlide = useMemo(() => {
		if (!solutions.length) return 0;
		return Math.min(1, solutions.length - 1);
	}, [solutions.length]);

	const [activeIndex, setActiveIndex] = useState(() => initialSlide);

	return (
		<section className="overflow-hidden bg-[#0087CD] py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-16 text-center">
					<h2 className="mb-4 text-4xl text-white">Our Solutions</h2>
					<p className="mx-auto max-w-2xl text-xl text-white/80">
						AI-powered solutions for smarter, faster digital transformation.
					</p>
				</motion.div>

				<Swiper
					initialSlide={initialSlide}
					centeredSlides
					centeredSlidesBounds
					grabCursor
					slideToClickedSlide
					speed={700}
					slidesPerView={1.08}
					spaceBetween={18}
					onSlideChange={(swiper) => {
						setActiveIndex(swiper.realIndex);
					}}
					breakpoints={{
						640: {
							slidesPerView: 1.45,
							spaceBetween: 20
						},
						768: {
							slidesPerView: 2.15,
							spaceBetween: 24
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 24
						}
					}}
					className="!overflow-visible">
					{solutions.map((solution, index) => (
						<SwiperSlide key={solution.id} className="!h-auto pb-10 pt-2">
							<SolutionCard
								solution={solution}
								isActive={index === activeIndex}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
}
