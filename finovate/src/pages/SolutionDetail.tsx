// import { Link, useNavigate, useParams } from "react-router-dom";
// import { motion } from "motion/react";
// import solutionDetails from "../data/WebsiteData";
// import oracleLogo from "../assets/partnersLogo/oracle-picture.png";
// import quantexaLogo from "../assets/partnersLogo/quantexa-picture.jpg";
// import uipathLogo from "../assets/partnersLogo/uipath-picture.jpg";
// import slackLogo from "../assets/partnersLogo/slack-picture.png";
// import salesForceLogo from "../assets/partnersLogo/salesforce-picture.png";
// import bpcLogo from "../assets/partnersLogo/bpc-picture.svg";


// export default function SolutionDetail() {
//   const { solutionId } = useParams<{ solutionId?: string }>();
//   const navigate = useNavigate();

//   const solution = solutionId ? solutionDetails[solutionId] : null;

//   if (!solution) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Solution not found
//           </h2>
//           <p className="text-gray-500 mb-6">
//             The solution you're looking for doesn't exist.
//           </p>
//           <button
//             onClick={() => navigate(-1)}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const primarySubSolution = solution.subSolutions[0];
//   const benefits = solution.subSolutions
//     .flatMap((sub) => sub.benefits)
//     .map((benefit) => `${benefit.title} - ${benefit.description}`)
//     .slice(0, 6);

//   const process = primarySubSolution?.process ?? [];
//   const overviewParagraphs = [
//     solution.description,
//     primarySubSolution?.description,
//   ].filter((paragraph): paragraph is string => Boolean(paragraph));

//   const processHeading = primarySubSolution
//     ? `Our Process${solution.subSolutions.length > 1 ? ` (${primarySubSolution.name})` : ""}`
//     : "Our Process";

//   const galleryImages = [oracleLogo, quantexaLogo, uipathLogo, bpcLogo, salesForceLogo, slackLogo ].slice(
//     0,
//     6,
//   );

//   return (
//     <div className="pt-20">
//       <section className="relative py-24 bg-white border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-3xl"
//           >
//             <Link
//               to="/solutions"
//               className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
//             >
//               {"<- Back to Solutions"}
//             </Link>

//             <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mt-6">
//               Solution
//             </p>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#192435] mt-4">
//               {solution.title}
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-600 mt-5 leading-relaxed">
//               {solution.subtitle}
//             </p>

//             <div className="mt-8">
//               <Link
//                 to="/contact"
//                 className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
//               >
//                 Talk to an expert
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-start">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-3xl sm:text-4xl text-[#192435] mb-5">
//                 Solution overview
//               </h2>
//               {overviewParagraphs.map((paragraph) => (
//                 <p
//                   key={paragraph}
//                   className="text-gray-600 mb-6 leading-relaxed"
//                 >
//                   {paragraph}
//                 </p>
//               ))}
//             </motion.div>

//             <div className="flex gap-4">
//               {galleryImages.map((image, index) => (
//                 <div
//                   key={`${image}-${index}`}
//                   className="flex-1 overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-[flex,transform] duration-300 hover:flex-[1.6] hover:-translate-y-1"
//                 >
//                   <img
//                     src={image}
//                     alt="Partner logo"
//                     className="h-56 w-full object-contain bg-white p-6"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {solution.subSolutions.length > 0 && (
//         <section className="py-20 bg-slate-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-end justify-between gap-6 mb-10">
//               <div>
//                 <h2 className="text-3xl sm:text-4xl text-[#192435] mb-3">
//                   Included solutions
//                 </h2>
//                 <p className="text-gray-600">
//                   Explore the products that power this solution.
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
//               {solution.subSolutions.map((sub) => (
//                 <div
//                   key={sub.id}
//                   className="min-w-[260px] sm:min-w-[320px] bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow snap-start"
//                 >
//                   <h3 className="text-lg font-semibold text-[#192435] mb-2">
//                     {sub.name}
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-4">{sub.tagline}</p>
//                   <p className="text-sm text-gray-600 leading-relaxed">
//                     {sub.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-start">
//             <div>
//               <h2 className="text-3xl sm:text-4xl text-[#192435] mb-6">
//                 Benefits
//               </h2>
//               <div className="grid gap-4">
//                 {benefits.map((benefit) => (
//                   <div
//                     key={benefit}
//                     className="flex items-start gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
//                   >
//                     <p className="text-gray-600 leading-relaxed">
//                       {benefit}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-3xl sm:text-4xl text-[#192435] mb-6">
//                 {processHeading}
//               </h2>
//               <div className="space-y-6">
//                 {process.map((step) => (
//                   <div key={step.step} className="flex gap-4">
//                     <div className="w-12 h-12 rounded-2xl bg-[#f1f5f9] flex items-center justify-center text-[#192435] font-semibold">
//                       {step.step}
//                     </div>
//                     <div>
//                       <h3 className="text-lg mb-2">{step.title}</h3>
//                       <p className="text-gray-600 leading-relaxed">
//                         {step.description}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-[#0f172a] text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-3xl sm:text-4xl mb-6">
//                 Ready to get started?
//               </h2>
//               <p className="text-lg text-slate-200">
//                 Our experts can guide your team through every step of the journey.
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Link
//                 to="/contact"
//                 className="px-6 py-3 rounded-full bg-white text-[#0f172a] font-medium hover:bg-white/90 transition-colors text-center"
//               >
//                 Book a consultation
//               </Link>
//               <Link
//                 to="/solutions"
//                 className="px-6 py-3 rounded-full border border-white/40 text-white font-medium hover:border-white transition-colors text-center"
//               >
//                 View other solutions
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import solutionDetails from "../data/WebsiteData";
import oracleLogo from "../assets/partnersLogo/oracle-picture.png";
import quantexaLogo from "../assets/partnersLogo/quantexa-picture.jpg";
import uipathLogo from "../assets/partnersLogo/uipath-picture.jpg";
import nintexLogo from "../assets/partnersLogo/nintex-picture.jpg";
 
export default function SolutionDetail() {
  const { solutionId } = useParams<{ solutionId?: string }>();
  const navigate = useNavigate();
 
  const solution = solutionId ? solutionDetails[solutionId] : null;
  const [typedTitle, setTypedTitle] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [activeTab, setActiveTab] = useState<"solutions" | "benefits" | "process">(
    "solutions",
  );
 
  useEffect(() => {
    if (!solution?.title) {
      return;
    }
 
    const title = solution.title;
    let index = 0;
 
    setTypedTitle("");
    setIsTypingDone(false);
 
    const intervalId = window.setInterval(() => {
      index += 1;
      setTypedTitle(title.slice(0, index));
 
      if (index >= title.length) {
        window.clearInterval(intervalId);
        setIsTypingDone(true);
      }
    }, 55);
 
    return () => window.clearInterval(intervalId);
  }, [solution?.title]);
 
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
            Go Back
          </button>
        </div>
      </div>
    );
  }
 
  const primarySubSolution = solution.subSolutions[0];
  const subSolutionsCount = solution.subSolutions.length;
  const benefits = solution.subSolutions
    .flatMap((sub) => sub.benefits)
    .slice(0, 6);
 
  const process = primarySubSolution?.process ?? [];
  const overviewParagraphs = [
    solution.description,
    primarySubSolution?.description,
  ].filter((paragraph): paragraph is string => Boolean(paragraph));
 
  const processHeading = primarySubSolution
    ? `Our Process${solution.subSolutions.length > 1 ? ` (${primarySubSolution.name})` : ""}`
    : "Our Process";
 
  const getSolutionCardSpan = (index: number) => {
    if (subSolutionsCount === 1) {
      return "lg:col-span-6";
    }
 
    if (subSolutionsCount === 2) {
      return "lg:col-span-3";
    }
 
    const remainder = subSolutionsCount % 3;
 
    if (remainder === 1 && index === subSolutionsCount - 1) {
      return "lg:col-span-6";
    }
 
    if (remainder === 2 && index >= subSolutionsCount - 2) {
      return "lg:col-span-3";
    }
 
    return "lg:col-span-2";
  };
 
  const galleryImages = [oracleLogo, quantexaLogo, uipathLogo, nintexLogo];
 
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden border-b border-[#13253f] bg-gradient-to-br from-[#0d1728] via-[#1B273B] to-[#0b1424] py-24 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#0052A3]/40 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-6 h-72 w-72 rounded-full bg-[#0a3a73]/40 blur-3xl"
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
 
            <p className="mt-6 text-xs uppercase tracking-[0.35em] text-[#7aa2d4]">
              Solution
            </p>
            <h1
              className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              aria-label={solution.title}
            >
              <span className="bg-gradient-to-r from-white via-[#cfe5ff] to-[#86bfff] bg-clip-text text-transparent">
                {typedTitle}
              </span>
              {!isTypingDone && (
                <span
                  aria-hidden="true"
                  className="ml-1 inline-block h-8 w-[2px] align-middle bg-[#7fb4ff] animate-pulse"
                />
              )}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#c4d6ec] sm:text-xl">
              {solution.subtitle}
            </p>
 
            <div className="mt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0066cc] px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#00418a] hover:shadow-xl sm:px-8 sm:py-4 sm:text-base"
              >
                Talk to an expert
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
 
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-5 text-3xl text-[#1B273B] sm:text-4xl">
                Solution overview
              </h2>
              {overviewParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mb-6 text-base leading-relaxed text-[#4b5b71]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
 
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#7a93b2]">
                Trusted partners
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={`${image}-${index}`}
                    className="flex items-center justify-center rounded-2xl border border-[#dbe7f5] bg-gradient-to-br from-white to-[#f1f6fd] p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <img
                      src={image}
                      alt="Partner logo"
                      className="h-16 w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      <section className="bg-[#f4f7fb] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl text-[#1B273B] sm:text-4xl">
                  Explore this solution
                </h2>
                <p className="mt-2 text-sm text-[#6b7f99] sm:text-base">
                  Switch tabs to see solutions, benefits, and the process at a glance.
                </p>
              </div>
              <div
                role="tablist"
                aria-label="Solution sections"
                className="flex flex-wrap items-center gap-2 rounded-full border border-[#dbe7f5] bg-white p-2 shadow-sm"
              >
                {([
                  { id: "solutions", label: "Solutions" },
                  { id: "benefits", label: "Benefits" },
                  { id: "process", label: "Our process" },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-5 sm:text-base ${
                      activeTab === tab.id
                        ? "bg-[#0066cc] text-white shadow-md"
                        : "text-[#1B273B] hover:bg-[#eef4fb]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
 
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              {activeTab === "solutions" && (
                <div id="panel-solutions" role="tabpanel" aria-label="Solutions">
                  {solution.subSolutions.length === 0 ? (
                    <p className="text-sm text-[#6b7f99]">
                      No included solutions are listed yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
                      {solution.subSolutions.map((sub, index) => (
                        <motion.div
                          key={sub.id}
                          whileHover={{ scale: 1.04, y: -6 }}
                          transition={{ type: "spring", stiffness: 220, damping: 18 }}
                          className={`group relative overflow-hidden rounded-2xl border border-[#dbe7f5] bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg ${getSolutionCardSpan(index)}`}
                        >
                          <h3 className="mb-2 text-lg font-semibold text-[#1B273B]">
                            {sub.name}
                          </h3>
                          <p className="mb-4 text-sm text-[#6b7f99]">{sub.tagline}</p>
                          <p className="text-sm leading-relaxed text-[#4b5b71]">
                            {sub.description}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}
 
              {activeTab === "benefits" && (
                <div id="panel-benefits" role="tabpanel" aria-label="Benefits">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={`${benefit.title}-${index}`}
                        whileHover={{ y: -4 }}
                        className="h-full"
                      >
                        <div className="flex h-full flex-col gap-4 rounded-2xl border border-[#dbe7f5] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f0fb] text-sm font-semibold text-[#0052A3]">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <h3 className="text-lg font-semibold text-[#1B273B]">
                              {benefit.title}
                            </h3>
                          </div>
                          <p className="text-sm leading-relaxed text-[#4b5b71]">
                            {benefit.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
 
              {activeTab === "process" && (
                <div id="panel-process" role="tabpanel" aria-label="Our process">
                  <p className="mb-4 text-sm text-[#6b7f99]">
                    {processHeading}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {process.map((step) => (
                      <motion.div
                        key={step.step}
                        whileHover={{ y: -3 }}
                      >
                        <div className="rounded-full border border-[#cfe0f3] bg-[#f1f6fd] px-5 py-3 text-sm font-medium text-[#1B273B] shadow-sm transition-all duration-300 hover:border-[#0052A3]/40 hover:shadow-md sm:text-base">
                          {step.title}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
 
      <section className="bg-[#1B273B] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="text-lg text-[#c4d6ec]">
                Our experts can guide your team through every step of the journey.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="rounded-full bg-white px-6 py-3 text-center font-medium text-[#1B273B] transition-colors hover:bg-white/90"
              >
                Book a consultation
              </Link>
              <Link
                to="/solutions"
                className="rounded-full border border-white/40 px-6 py-3 text-center font-medium text-white transition-colors hover:border-white"
              >
                View other solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 
 