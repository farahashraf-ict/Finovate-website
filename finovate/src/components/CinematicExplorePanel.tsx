import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import homeHeroSection from "../assets/home-hero-section.png";

type CinematicExplorePanelProps = {
  play: boolean;
};

const finovateLetters = [
  { char: "F", fromX: "-48vw", fromY: "0vh" },
  { char: "i", fromX: "0vw", fromY: "-38vh" },
  { char: "n", fromX: "48vw", fromY: "0vh" },
  { char: "o", fromX: "0vw", fromY: "38vh" },
  { char: "v", fromX: "-42vw", fromY: "-12vh" },
  { char: "a", fromX: "22vw", fromY: "-40vh" },
  { char: "t", fromX: "42vw", fromY: "16vh" },
  { char: "e", fromX: "-18vw", fromY: "42vh" },
];

export default function CinematicExplorePanel({
  play,
}: CinematicExplorePanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textBlockRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const imageLayerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const lettersRef = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = lettersRef.current.filter(Boolean);
      if (!letters.length || !textBlockRef.current || !imageLayerRef.current) {
        return;
      }

      timelineRef.current?.kill();
      timelineRef.current = null;

      gsap.set(letters, {
        opacity: 0,
        filter: "blur(14px)",
        scale: 1.7,
        x: (_, element: HTMLElement) => element.dataset.fromX || "0vw",
        y: (_, element: HTMLElement) => element.dataset.fromY || "0vh",
        rotateX: -28,
        rotateY: 16,
        transformPerspective: 1200,
      });

      gsap.set(textBlockRef.current, {
        xPercent: 0,
        filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
      });

      gsap.set(wordRef.current, {
        scale: 1,
      });

      gsap.set(imageLayerRef.current, {
        xPercent: 32,
        scaleX: 0.36,
        opacity: 0,
        transformOrigin: "right center",
      });

      if (imageRef.current) {
        gsap.set(imageRef.current, { scale: 1.18 });
      }

      if (!play) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
      timelineRef.current = tl;

      tl.add("syncStart")
        .to(
          letters,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            rotateX: 0,
            rotateY: 0,
            duration: 1.75,
            stagger: 0.16,
            ease: "expo.out",
          },
          "syncStart",
        )
        .to(
          imageLayerRef.current,
          {
            xPercent: 0,
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "syncStart",
        )
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "syncStart",
        )
        .to(
          textBlockRef.current,
          {
            xPercent: -18,
            duration: 1.2,
            ease: "power3.inOut",
          },
          "syncStart+=0.08",
        )
        .to(
          wordRef.current,
          {
            scale: 1.05,
            duration: 0.38,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          },
          "syncStart+=0.65",
        )
        .to(
          textBlockRef.current,
          {
            filter: "drop-shadow(0 16px 34px rgba(25,36,53,0.2))",
            duration: 0.55,
          },
          "-=0.35",
        );
    }, containerRef);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, [play]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbff] via-[#eef4fb] to-[#dce8f4]" />

      <div
        ref={imageLayerRef}
        className="absolute inset-0 will-change-transform pointer-events-none"
      >
        <img
          ref={imageRef}
          src={homeHeroSection}
          alt="Finovate cinematic hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fbff]/95 via-[#f8fbff]/35 to-transparent" />
      </div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center">
        <div ref={textBlockRef} className="max-w-xl will-change-transform">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Let's Explore
          </p>

          <div className="flex justify-start">
            <span
              ref={wordRef}
              className="text-6xl sm:text-7xl lg:text-8xl font-semibold text-[#192435] tracking-[0.08em]"
            >
              {finovateLetters.map((letter, index) => (
                <span
                  key={`${letter.char}-${index}`}
                  ref={(el) => {
                    lettersRef.current[index] = el;
                  }}
                  className="inline-block text-[#0087CD]"
                  data-from-x={letter.fromX}
                  data-from-y={letter.fromY}
                >
                  {letter.char}
                </span>
              ))}
            </span>
          </div>

          <p className="text-lg sm:text-xl text-[#24344a] mb-8 mt-6 max-w-lg">
            Discover solutions, partners, and insights crafted for modern
            finance.
          </p>

          <Link
  to="/solutions"
  className="
  group
  relative inline-flex items-center gap-2 px-8 py-4
  text-white rounded-full overflow-hidden
  bg-gradient-to-r from-[#0066cc] via-[#3aa0ff] to-[#0066cc]
  bg-[length:200%_100%] bg-left
  transition-all duration-500 ease-out
  shadow-[0_0_20px_rgba(0,102,204,0.5)]
  hover:bg-right
  hover:shadow-[0_0_40px_rgba(0,102,204,0.8)]
  hover:-translate-y-1 hover:scale-105
  active:scale-95
"
>
  <span className="relative z-10">Explore Solutions</span>

  {/* Light sweep */}
  <span
    className="
    pointer-events-none absolute top-0 left-[-75%]
    h-full w-[50%]
    bg-gradient-to-r from-transparent via-white/40 to-transparent
    skew-x-[-20deg]
    transition-all duration-700 ease-out
    group-hover:left-[125%]
  "
  />
</Link>
        </div>
      </div>
    </div>
  );
}
