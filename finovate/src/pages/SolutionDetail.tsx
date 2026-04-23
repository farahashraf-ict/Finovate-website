import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Database,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import solutionDetails from "../data/WebsiteData";
 
 
type AccentStyle = {
  softFrom: string;
  softVia: string;
  softTo: string;
  strongFrom: string;
  strongTo: string;
  text: string;
  ctaText: string;
  ctaButtonText: string;
};
 
const accentMap: Record<string, AccentStyle> = {
  blue: {
    softFrom: "from-blue-50",
    softVia: "via-white",
    softTo: "to-cyan-50",
    strongFrom: "from-blue-500",
    strongTo: "to-cyan-500",
    text: "text-blue-600",
    ctaText: "text-blue-100",
    ctaButtonText: "text-blue-600",
  },
  red: {
    softFrom: "from-rose-50",
    softVia: "via-white",
    softTo: "to-red-50",
    strongFrom: "from-red-500",
    strongTo: "to-rose-600",
    text: "text-rose-600",
    ctaText: "text-rose-100",
    ctaButtonText: "text-rose-600",
  },
  purple: {
    softFrom: "from-purple-50",
    softVia: "via-white",
    softTo: "to-pink-50",
    strongFrom: "from-purple-500",
    strongTo: "to-pink-500",
    text: "text-purple-600",
    ctaText: "text-purple-100",
    ctaButtonText: "text-purple-600",
  },
  green: {
    softFrom: "from-emerald-50",
    softVia: "via-white",
    softTo: "to-green-50",
    strongFrom: "from-green-500",
    strongTo: "to-emerald-500",
    text: "text-emerald-600",
    ctaText: "text-emerald-100",
    ctaButtonText: "text-emerald-600",
  },
  indigo: {
    softFrom: "from-indigo-50",
    softVia: "via-white",
    softTo: "to-blue-50",
    strongFrom: "from-indigo-500",
    strongTo: "to-blue-500",
    text: "text-indigo-600",
    ctaText: "text-indigo-100",
    ctaButtonText: "text-indigo-600",
  },
  orange: {
    softFrom: "from-orange-50",
    softVia: "via-white",
    softTo: "to-red-50",
    strongFrom: "from-orange-500",
    strongTo: "to-red-500",
    text: "text-orange-600",
    ctaText: "text-orange-100",
    ctaButtonText: "text-orange-500",
  },
};
 
const featureIconPool = [Brain, BarChart3, Database, Sparkles];
 
export default function SolutionDetail() {
  const { solutionId } = useParams<{ solutionId?: string }>();
  const navigate = useNavigate();
 
  const solution = solutionId ? solutionDetails[solutionId] : null;
 
  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Solution not found
          </h2>
          <p className="text-gray-500 mb-6">
            The solution you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }
 
  const accent = accentMap[solution.accentColor] ?? accentMap.orange;
  const Icon = solution.icon ?? Brain;
  const primarySubSolution = solution.subSolutions[0];
 
  const featureCards = solution.subSolutions.map((sub, index) => ({
    icon: featureIconPool[index % featureIconPool.length],
    title: sub.name,
    description: sub.tagline,
    logo: sub.logo,
  }));
 
  const benefits = solution.subSolutions
    .flatMap((sub) => sub.benefits)
    .map((benefit) => `${benefit.title} - ${benefit.description}`)
    .slice(0, 6);
 
  const process = primarySubSolution?.process ?? [];
  const overviewParagraphs = [
    solution.description,
    primarySubSolution?.description,
  ].filter((paragraph): paragraph is string => Boolean(paragraph));
 
  const processHeading = primarySubSolution
    ? `Our Process${solution.subSolutions.length > 1 ? ` (${primarySubSolution.name})` : ""}`
    : "Our Process";
 
  return (
    <div className="pt-20">
      <section
        className={`relative py-24 bg-gradient-to-br ${accent.softFrom} ${accent.softVia} ${accent.softTo} overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link
              to="/solutions"
              className={`inline-flex items-center gap-2 ${accent.text} mb-8 hover:gap-3 transition-all`}
            >
              <ArrowRight size={20} className="rotate-180" />
              Back to Solutions
            </Link>
 
            <div
              className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${accent.strongFrom} ${accent.strongTo} flex items-center justify-center mb-6`}
            >
              <Icon className="text-white" />
            </div>
 
            <h1
              className={` pb-4 text-5xl lg:text-6xl mb-6 bg-gradient-to-r ${accent.strongFrom} ${accent.strongTo} bg-clip-text text-transparent`}
            >
              {solution.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {solution.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
 
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Solution Overview</h2>
              {overviewParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-gray-600 mb-6 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1759661966728-4a02e3c6ed91?w=1200"
                alt={solution.title}
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
 
      {featureCards.length > 0 && (
        <section
          className={`py-24 bg-gradient-to-br ${accent.softFrom} ${accent.softTo}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl mb-4">Included Solutions</h2>
              <p className="text-xl text-gray-600">
                Specialized offerings designed for your transformation journey
              </p>
            </motion.div>
 
            <div className="grid md:grid-cols-2 gap-8">
              {featureCards.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accent.strongFrom} ${accent.strongTo} flex items-center justify-center mb-6 text-3xl`}
                  >
                    {feature.logo ? (
                      <span className="text-white" aria-hidden="true">
                        {feature.logo}
                      </span>
                    ) : (
                      <feature.icon className="text-white" size={28} />
                    )}
                  </div>
                  <h3 className="text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
 
      {benefits.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1762279389083-abf71f22d338?w=1200"
                  alt="Business benefits"
                  className="rounded-3xl shadow-2xl"
                />
              </motion.div>
 
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <TrendingUp className={`${accent.text} mb-4`} size={48} />
                <h2 className="text-4xl mb-6">Business Benefits</h2>
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        className="text-green-500 flex-shrink-0 mt-1"
                        size={24}
                      />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
 
      {process.length > 0 && (
        <section
          className={`py-24 bg-gradient-to-br ${accent.softFrom} ${accent.softTo}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl mb-4">{processHeading}</h2>
              <p className="text-xl text-gray-600">
                A proven methodology for successful implementation
              </p>
            </motion.div>
 
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${accent.strongFrom} ${accent.strongTo} flex items-center justify-center mb-6 text-white text-2xl`}
                    >
                      {String(item.step)}
                    </div>
                    <h3 className="text-xl mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
 
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-orange-300" size={32} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
 
      <section
        className={`py-24 bg-gradient-to-br ${accent.strongFrom} ${accent.strongTo} text-white`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">
              Ready to explore {solution.title}?
            </h2>
            <p className={`text-xl mb-8 ${accent.ctaText}`}>
              Let us design the right implementation plan for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 px-8 py-4 bg-white ${accent.ctaButtonText} rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                Request a Demo
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/ask-nabeh"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Ask Nabeh AI
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
 
 