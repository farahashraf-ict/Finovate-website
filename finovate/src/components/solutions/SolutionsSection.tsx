// import { useEffect, useMemo, useState } from "react";
// import { motion } from "motion/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import SolutionCard, { type SolutionItem } from "./SolutionCard";

// type SolutionsSectionProps = {
//   solutions: SolutionItem[];
// };

// export default function SolutionsSection({ solutions }: SolutionsSectionProps) {
//   const initialSlide = useMemo(() => {
//     if (!solutions.length) return 0;
//     return Math.min(1, solutions.length - 1);
//   }, [solutions.length]);

//   const [activeIndex, setActiveIndex] = useState(initialSlide);

//   useEffect(() => {
//     setActiveIndex(initialSlide);
//   }, [initialSlide]);

//   return (
//     <section className="overflow-hidden bg-[#0087CD] py-24">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-16 text-center"
//         >
//           <h2 className="mb-4 text-4xl text-white">Our Solutions</h2>
//           <p className="mx-auto max-w-2xl text-xl text-white/80">
//             AI-powered solutions for smarter, faster digital transformation.
//           </p>
//         </motion.div>

//         <Swiper
//           initialSlide={initialSlide}
//           centeredSlides
//           centeredSlidesBounds
//           grabCursor
//           slideToClickedSlide
//           speed={700}
//           slidesPerView={1.08}
//           spaceBetween={18}
//           onSlideChange={(swiper) => {
//             setActiveIndex(swiper.realIndex);
//           }}
//           breakpoints={{
//             640: {
//               slidesPerView: 1.45,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 2.15,
//               spaceBetween: 24,
//             },
//             1024: {
//               slidesPerView: 3,
//               spaceBetween: 24,
//             },
//           }}
//           className="!overflow-visible"
//         >
//           {solutions.map((solution, index) => (
//             <SwiperSlide key={solution.id} className="!h-auto pb-10 pt-2">
//               <SolutionCard
//                 solution={solution}
//                 isActive={index === activeIndex}
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// }




import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import SolutionCard, { type SolutionItem } from "./SolutionCard";

type SolutionsSectionProps = {
  solutions: SolutionItem[];
};

export default function SolutionsSection({ solutions }: SolutionsSectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We always start at index 0 — users can swipe/click to any card
  const initialSlide = 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [solutions.length]);

  // Helper: jump to a slide
  const goTo = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <section className="overflow-hidden bg-[#0087CD] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 lg:mb-16 text-center"
        >
          <h2 className="mb-3 text-3xl sm:text-4xl text-white">Our Solutions</h2>
          <p className="mx-auto max-w-2xl text-base sm:text-xl text-white/80">
            AI-powered solutions for smarter, faster digital transformation.
          </p>
        </motion.div>

        {/*
          KEY FIX FOR FIRST/LAST CARDS:
          We add left/right padding equal to half the "hidden" slide width so
          Swiper can physically center the first and last slides. We also set
          `centeredSlides={false}` and manually keep track of the active index,
          which avoids the swiper bug where edge slides can't be centered.

          The cleanest cross-device solution:
          - On mobile  (1 slide visible): add horizontal padding so the single card is inset
          - On tablet  (2 slides): same idea
          - On desktop (3 slides): edge cards fully reachable via padding offsets
        */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          initialSlide={initialSlide}
          centeredSlides={true}
          centeredSlidesBounds={false}   // ← must be FALSE for edge slides to be reachable when centered
          grabCursor
          slideToClickedSlide
          speed={650}
          // slidesOffsetBefore / After give the extra runway so first & last
          // can scroll all the way to center without being blocked by the edge.
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          slidesPerView={1.15}
          spaceBetween={16}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            480: {
              slidesPerView: 1.35,
              spaceBetween: 18,
            },
            640: {
              slidesPerView: 1.6,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.2,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          // `!overflow-visible` lets the adjacent cards peek out on the sides
          className="!overflow-visible"
        >
          {solutions.map((solution, index) => (
            <SwiperSlide
              key={solution.id}
              className="!h-auto pb-10 pt-2"
              onClick={() => goTo(index)}
            >
              <SolutionCard
                solution={solution}
                isActive={index === activeIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dot navigation — gives users an explicit way to jump to first / last */}
        <div className="mt-2 flex justify-center gap-2">
          {solutions.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => goTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 h-2.5 bg-white"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}