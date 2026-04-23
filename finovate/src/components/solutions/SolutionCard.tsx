import { Link } from "react-router-dom";
import { motion } from "motion/react";

export type SolutionItem = {
  id: string;
  title: string;
  description: string;
};

type SolutionCardProps = {
  solution: SolutionItem;
  isActive: boolean;
};

export default function SolutionCard({
  solution,
  isActive,
}: SolutionCardProps) {
  return (
    <motion.article
      animate={
        isActive
          ? { scale: 1, y: -10, opacity: 1 }
          : { scale: 0.93, y: 8, opacity: 0.78 }
      }
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`h-full rounded-3xl border p-8 transition-shadow duration-300 ${
        isActive
          ? "border-white/70 bg-white text-[#0d2138] shadow-[0_24px_50px_rgba(8,31,53,0.34)]"
          : "border-white/35 bg-white/90 text-[#17324f] shadow-[0_14px_32px_rgba(8,31,53,0.18)]"
      }`}
    >
      <div className="mb-6 inline-flex rounded-full bg-[#0087CD]/12 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[#0087CD]">
        Solution
      </div>

      <h3 className="mb-3 text-xl leading-tight">{solution.title}</h3>
      <p className="mb-8 text-sm leading-7 text-[#3b536c]">
        {solution.description}
      </p>

      <Link
        to={`/solutions/${solution.id}`}
        className="inline-flex items-center text-sm font-semibold text-[#0066cc] transition-opacity duration-300 hover:opacity-80"
      >
        Learn More
      </Link>
    </motion.article>
  );
}
