// import { Link } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { motion } from "motion/react";
// import {
//   Brain,
//   Cloud,
//   CreditCard,
//   Shield,
//   Zap,
//   TrendingUp,
//   ArrowRight,
//   CheckCircle2,
// } from "lucide-react";
// import walkingVideo from "../assets/people-walking.mp4";
// import CinematicExplorePanel from "../components/CinematicExplorePanel";
// import SolutionsSection from "../components/solutions/SolutionsSection";

// const solutions = [
//   {
//     id: "core-banking-digital",
//     title: "Core Banking & Digital Module",
//     description:
//       "Core banking solutions powered by FLEXCUBE, Sarraf, and modern payment systems.",
//   },
//   {
//     id: "fraud-risk-intelligence",
//     title: "Fraud Detection & Risk Intelligence",
//     description:
//       "Detect fraud and manage risk with real-time insights using Quantexa.",
//   },
//   {
//     id: "process-workflow-automation",
//     title: "Business Process & Workflow Automation",
//     description:
//       "Automate workflows with Nintex, OpenText, AppWorks, and UiPath.",
//   },
//   {
//     id: "content-data-management",
//     title: "Content & Data Management",
//     description:
//       "Manage and analyze data with OpenText, Postgres EDB, and Tableau.",
//   },
//   {
//     id: "integration-api-management",
//     title: "Integration & API Management",
//     description: "Connect systems seamlessly with APIs and BPC integration.",
//   },
//   {
//     id: "collaboration-ai-assistant",
//     title: "Collaboration & AI Assistant",
//     description:
//       "Boost teamwork with Slack integration and the Nabeeh AI assistant.",
//   },
// ];

// const features = [
//   {
//     icon: Shield,
//     title: "Bank-Grade Security",
//     description: "Protect critical systems with enterprise-grade security.",
//   },
//   {
//     icon: Zap,
//     title: "Fast Performance",
//     description: "Deliver reliable speed for high-volume digital operations.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Scalable Growth",
//     description:
//       "Scale confidently as your business and customer base expands.",
//   },
//   {
//     icon: Brain,
//     title: "AI-Powered Insights",
//     description:
//       "Use intelligent analytics to drive better strategic decisions.",
//   },
//   {
//     icon: Cloud,
//     title: "Cloud-Ready Architecture",
//     description:
//       "Deploy modern services across secure, flexible cloud platforms.",
//   },
//   {
//     icon: CreditCard,
//     title: "Payment Innovation",
//     description: "Launch secure and seamless digital payment experiences.",
//   },
// ];

// const partners = [
//   "Oracle",
//   "UiPath",
//   "Nintex",
//   "OpenText",
//   "Quantexa",
//   "BPC",
//   "Salesforce",
//   "Tableau",
//   "MuleSoft",
//   "Slack",
//   "EDB Postgres",
// ];

// const scrollingPartners = [...partners, ...partners];

// const testimonials = [
//   {
//     quote:
//       "Finovate helped us modernize operations and accelerate our digital roadmap with confidence.",
//     author: "Ahmed Hassan",
//     role: "Chief Digital Officer, Regional Bank",
//     image:
//       "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop",
//   },
//   {
//     quote:
//       "Their team delivered an enterprise-grade solution that was secure, scalable, and easy to adopt.",
//     author: "Mona Khaled",
//     role: "Head of Technology, Fintech Group",
//     image:
//       "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop",
//   },
//   {
//     quote:
//       "From integration to automation, Finovate transformed how our teams collaborate and deliver value.",
//     author: "Omar Nabil",
//     role: "Operations Director, Payments Company",
//     image:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
//   },
// ];

// export default function Home() {
//   const heroSectionRef = useRef<HTMLElement | null>(null);
//   const [isHeroFlipped, setIsHeroFlipped] = useState(false);
//   const [isHeroHidden, setIsHeroHidden] = useState(false);
//   const [isExploreHidden, setIsExploreHidden] = useState(true);
//   const hideTimerRef = useRef<number | null>(null);
//   const exploreTimerRef = useRef<number | null>(null);

//   useEffect(() => {
//     const updateFlipState = () => {
//       const rect = heroSectionRef.current?.getBoundingClientRect();
//       if (!rect) return;

//       const isSectionVisible = rect.bottom > 0 && rect.top < window.innerHeight;
//       if (!isSectionVisible) {
//         setIsHeroFlipped(false);
//         return;
//       }

//       // Use hysteresis so the state does not bounce near one threshold.
//       setIsHeroFlipped((prev) => {
//         if (prev) {
//           return rect.top < 20;
//         }
//         return rect.top <= -6;
//       });
//     };

//     updateFlipState();
//     window.addEventListener("scroll", updateFlipState, { passive: true });
//     window.addEventListener("resize", updateFlipState);

//     return () => {
//       window.removeEventListener("scroll", updateFlipState);
//       window.removeEventListener("resize", updateFlipState);
//     };
//   }, []);

//   useEffect(() => {
//     if (hideTimerRef.current) {
//       window.clearTimeout(hideTimerRef.current);
//       hideTimerRef.current = null;
//     }

//     if (isHeroFlipped) {
//       hideTimerRef.current = window.setTimeout(() => {
//         setIsHeroHidden(true);
//       }, 1000);
//     } else {
//       setIsHeroHidden(false);
//     }

//     return () => {
//       if (hideTimerRef.current) {
//         window.clearTimeout(hideTimerRef.current);
//         hideTimerRef.current = null;
//       }
//     };
//   }, [isHeroFlipped]);

//   useEffect(() => {
//     if (exploreTimerRef.current) {
//       window.clearTimeout(exploreTimerRef.current);
//       exploreTimerRef.current = null;
//     }

//     if (isHeroFlipped) {
//       setIsExploreHidden(false);
//     } else {
//       exploreTimerRef.current = window.setTimeout(() => {
//         setIsExploreHidden(true);
//       }, 600);
//     }

//     return () => {
//       if (exploreTimerRef.current) {
//         window.clearTimeout(exploreTimerRef.current);
//         exploreTimerRef.current = null;
//       }
//     };
//   }, [isHeroFlipped]);

//   return (
//     <div className="pt-20">
//       <section
//         ref={heroSectionRef}
//         className=" pt-20 relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
//       >
//         <div className="relative min-h-[90vh] [perspective:1400px]">
//           <div
//             className={`relative min-h-[90vh] transition-transform duration-[1000ms] [transform-style:preserve-3d] will-change-transform ${
//               isHeroFlipped
//                 ? "[transform:rotateX(-90deg)]"
//                 : "[transform:rotateX(0deg)]"
//             }`}
//           >
//             <div
//               className={`absolute inset-0 [backface-visibility:hidden] transition-opacity duration-[400ms] ${
//                 isHeroFlipped ? "opacity-0" : "opacity-100"
//               } ${isHeroHidden ? "hidden" : "block"}`}
//             >
//               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />

//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
//                 <div className="grid lg:grid-cols-2 gap-12 items-center">
//                   <motion.div
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.8 }}
//                   >
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2 }}
//                       className="inline-block px-4 py-2 bg-blue-100 text-[#0066cc] rounded-full text-sm mb-6"
//                     >
//                       Welcome to the Future of Finance
//                     </motion.div>

//                     <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent">
//                       Transform Your Financial Services
//                     </h1>

//                     <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//                       Innovative fintech solutions that empower businesses to
//                       scale, optimize, and thrive in the digital economy.
//                     </p>

//                     <div className="flex flex-col sm:flex-row gap-4">
//                       <Link
//                         to="/contact"
//                         className="group px-8 py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
//                       >
//                         Get Started
//                         <ArrowRight
//                           size={20}
//                           className="group-hover:translate-x-1 transition-transform"
//                         />
//                       </Link>
//                     </div>
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.8, delay: 0.3 }}
//                     className="relative"
//                   >
//                     {
//                       <div className="relative rounded-3xl overflow-hidden shadow-2xl">
//                         <img
//                           src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200"
//                           alt="Modern Office"
//                           className="w-full h-auto"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#0066cc]/20 to-transparent" />
//                       </div>
//                     }

//                     {
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6 }}
//                         className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
//                             <CheckCircle2
//                               className="text-green-600"
//                               size={24}
//                             />
//                           </div>
//                           <div>
//                             <div className="text-2xl">500+</div>
//                             <div className="text-sm text-gray-600">
//                               Happy Clients
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     }
//                   </motion.div>
//                 </div>
//               </div>
//             </div>

//             <div
//               className={`absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateX(90deg)] transition-opacity duration-[600ms] ${
//                 isHeroFlipped ? "opacity-100" : "opacity-0"
//               } ${isExploreHidden ? "hidden" : "block"}`}
//             >
//               <CinematicExplorePanel play={isHeroFlipped} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <SolutionsSection solutions={solutions} />

//       <section className="relative py-24 bg-white overflow-hidden">
//         {/* Background Video */}
//         <video
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute top-0 left-0 w-full h-full object-cover z-0"
//         >
//           <source src={walkingVideo} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//         {/* Overlay for readability */}
//         <div className="absolute top-0 left-0 w-full h-full bg-white/30 z-10"></div>
//         {/* Content */}
//         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <style>{`
//             @keyframes home-partner-scroll {
//               0% {
//                 transform: translateX(0);
//               }
//               100% {
//                 transform: translateX(-50%);
//               }
//             }

//             .home-partner-scroll {
//               animation: home-partner-scroll 26s linear infinite;
//             }

//             .home-partner-scroll:hover {
//               animation-play-state: paused;
//             }
//           `}</style>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             {/* <h2 className="text-4xl mb-4 text-[#1d293d]"
//             style={{ fontFamily: "Climate Crisis, cursive" }}
//             >
//               Trusted by Industry Leaders
//             </h2> */}
//           </motion.div>

//           <div className="relative overflow-hidden">
//             <div className="home-partner-scroll flex w-max items-center gap-10">
//               {scrollingPartners.map((partner, index) => (
//                 <div
//                   key={`${partner}-${index}`}
//                   className="text-xl sm:text-2xl font-bold text-gray-200 hover:text-[#1d293d] transition-colors whitespace-nowrap"
//                 >
//                   {partner}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl mb-4">What Our Clients Say</h2>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {testimonials.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-white rounded-2xl p-8 shadow-lg"
//               >
//                 <p className="text-gray-700 mb-6 italic">
//                   "{testimonial.quote}"
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={testimonial.image}
//                     alt={testimonial.author}
//                     className="w-12 h-12 rounded-full object-cover"
//                   />
//                   <div>
//                     <div>{testimonial.author}</div>
//                     <div className="text-sm text-gray-600">
//                       {testimonial.role}
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-24 bg-gradient-to-br from-[#0066cc] to-[#00a3cc] text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl mb-6">Ready to Transform Your Business?</h2>
//             <p className="text-xl mb-8 text-blue-100">
//               Join hundreds of companies already using Finovate to power their
//               financial services
//             </p>
//             <Link
//               to="/contact"
//               className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0066cc] rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
//             >
//               Start Your Journey
//               <ArrowRight size={20} />
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }







import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import walkingVideo from "../assets/people-walking.mp4";
import CinematicExplorePanel from "../components/CinematicExplorePanel";
import SolutionsSection from "../components/solutions/SolutionsSection";

const solutions = [
	{
		id: "core-banking-digital",
		title: "Core Banking & Digital Module",
		description:
			"Core banking solutions powered by FLEXCUBE, Sarraf, and modern payment systems."
	},
	{
		id: "fraud-risk-intelligence",
		title: "Fraud Detection & Risk Intelligence",
		description:
			"Detect fraud and manage risk with real-time insights using Quantexa."
	},
	{
		id: "process-workflow-automation",
		title: "Business Process & Workflow Automation",
		description:
			"Automate workflows with Nintex, OpenText, AppWorks, and UiPath."
	},
	{
		id: "content-data-management",
		title: "Content & Data Management",
		description:
			"Manage and analyze data with OpenText, Postgres EDB, and Tableau."
	},
	{
		id: "integration-api-management",
		title: "Integration & API Management",
		description: "Connect systems seamlessly with APIs and BPC integration."
	},
	{
		id: "collaboration-ai-assistant",
		title: "Collaboration & AI Assistant",
		description:
			"Boost teamwork with Slack integration and the Nabeeh AI assistant."
	}
];

const partners = [
	"Oracle",
	"UiPath",
	"Nintex",
	"OpenText",
	"Quantexa",
	"BPC",
	"Salesforce",
	"Tableau",
	"MuleSoft",
	"Slack",
	"EDB Postgres"
];

const scrollingPartners = [...partners, ...partners];

const testimonials = [
	{
		quote:
			"Finovate helped us modernize operations and accelerate our digital roadmap with confidence.",
		author: "Ahmed Hassan",
		role: "Chief Digital Officer, Regional Bank",
		image:
			"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&h=120&fit=crop"
	},
	{
		quote:
			"Their team delivered an enterprise-grade solution that was secure, scalable, and easy to adopt.",
		author: "Mona Khaled",
		role: "Head of Technology, Fintech Group",
		image:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop"
	},
	{
		quote:
			"From integration to automation, Finovate transformed how our teams collaborate and deliver value.",
		author: "Omar Nabil",
		role: "Operations Director, Payments Company",
		image:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop"
	}
];

export default function Home() {
	const heroSectionRef = useRef<HTMLElement | null>(null);
	const [isHeroFlipped, setIsHeroFlipped] = useState(false);
	const [isHeroHidden, setIsHeroHidden] = useState(false);
	const [isExploreHidden, setIsExploreHidden] = useState(true);
	const hideTimerRef = useRef<number | null>(null);
	const exploreTimerRef = useRef<number | null>(null);

	useEffect(() => {
		const updateFlipState = () => {
			const rect = heroSectionRef.current?.getBoundingClientRect();
			if (!rect) return;

			const isSectionVisible = rect.bottom > 0 && rect.top < window.innerHeight;
			if (!isSectionVisible) {
				setIsHeroFlipped(false);
				return;
			}

      setIsHeroFlipped((prev) => {
        if (prev) return rect.top < 20;
        return rect.top <= -6;
      });
    };

		updateFlipState();
		window.addEventListener("scroll", updateFlipState, { passive: true });
		window.addEventListener("resize", updateFlipState);

		return () => {
			window.removeEventListener("scroll", updateFlipState);
			window.removeEventListener("resize", updateFlipState);
		};
	}, []);

  useEffect(() => {
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (isHeroFlipped) {
      hideTimerRef.current = window.setTimeout(() => setIsHeroHidden(true), 1000);
    } else {
      setIsHeroHidden(false);
    }
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [isHeroFlipped]);

  useEffect(() => {
    if (exploreTimerRef.current) {
      window.clearTimeout(exploreTimerRef.current);
      exploreTimerRef.current = null;
    }
    if (isHeroFlipped) {
      setIsExploreHidden(false);
    } else {
      exploreTimerRef.current = window.setTimeout(() => setIsExploreHidden(true), 600);
    }
    return () => {
      if (exploreTimerRef.current) window.clearTimeout(exploreTimerRef.current);
    };
  }, [isHeroFlipped]);

  return (
    <div className="pt-20">

      {/* ── Hero (flip card) ── */}
      <section
        ref={heroSectionRef}
        className="pt-20 relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50"
      >
        <div className="relative min-h-[90vh] [perspective:1400px]">
          <div
            className={`relative min-h-[90vh] transition-transform duration-[1000ms] [transform-style:preserve-3d] will-change-transform ${
              isHeroFlipped ? "[transform:rotateX(-90deg)]" : "[transform:rotateX(0deg)]"
            }`}
          >
            {/* ── Front face ── */}
            <div
              className={`absolute inset-0 [backface-visibility:hidden] transition-opacity duration-[400ms] ${
                isHeroFlipped ? "opacity-0" : "opacity-100"
              } ${isHeroHidden ? "hidden" : "block"}`}
            >
              {/* Dot grid texture */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full">
                {/* Two-column on lg+, stacked on smaller */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] py-10 lg:py-0">

                  {/* Left: text */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="inline-block px-4 py-2 bg-blue-100 text-[#0066cc] rounded-full text-sm mb-5 sm:mb-6"
                    >
                      Welcome to the Future of Finance
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-5 sm:mb-6 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent leading-tight">
                      Transform Your Financial Services
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 mb-7 sm:mb-8 leading-relaxed max-w-xl">
                      Innovative fintech solutions that empower businesses to
                      scale, optimize, and thrive in the digital economy.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contact"
                        className="group px-7 sm:px-8 py-3.5 sm:py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
                      >
                        Get Started
                        <ArrowRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Right: image + stat badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative order-1 lg:order-2"
                  >
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200"
                        alt="Modern Office"
                        className="w-full h-56 sm:h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0066cc]/20 to-transparent" />
                    </div>

                    {/* Stat badge — repositioned on small screens so it doesn't overflow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="absolute -bottom-4 left-2 sm:-bottom-6 sm:-left-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 max-w-[160px] sm:max-w-xs"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="text-green-600" size={20} />
                        </div>
                        <div>
                          <div className="text-xl sm:text-2xl font-bold">500+</div>
                          <div className="text-xs sm:text-sm text-gray-600">Happy Clients</div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── Back face (Cinematic Explore) ── */}
            <div
              className={`absolute inset-0 flex items-center justify-center [backface-visibility:hidden] [transform:rotateX(90deg)] transition-opacity duration-[600ms] ${
                isHeroFlipped ? "opacity-100" : "opacity-0"
              } ${isExploreHidden ? "hidden" : "block"}`}
            >
              <CinematicExplorePanel play={isHeroFlipped} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Solutions ── */}
      <SolutionsSection solutions={solutions} />

      {/* ── Partners scroll ── */}
      <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={walkingVideo} type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-white/30 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <style>{`
            @keyframes home-partner-scroll {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .home-partner-scroll {
              animation: home-partner-scroll 26s linear infinite;
            }
            .home-partner-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>

          <div className="relative overflow-hidden">
            <div className="home-partner-scroll flex w-max items-center gap-8 sm:gap-10">
              {scrollingPartners.map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-200 hover:text-[#1d293d] transition-colors whitespace-nowrap"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl mb-4">What Our Clients Say</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg"
              >
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-[#0066cc] to-[#00a3cc] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-5 sm:mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl mb-7 sm:mb-8 text-blue-100 max-w-xl mx-auto">
              Join hundreds of companies already using Finovate to power their
              financial services
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-white text-[#0066cc] rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base font-medium"
            >
              Start Your Journey
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}