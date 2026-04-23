import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Building2,
  Workflow,
  Brain,
  Cloud,
  CreditCard,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    id: "core-banking-digital",
    title: "Core Banking & Digital Module",
    description:
      "Modern core banking solutions powered by FLEXCUBE, Sarraf, and advanced payment systems to enable secure, scalable, and real-time banking operations.",
    icon: Building2,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "FLEXCUBE integration",
      "Real-time processing",
      "Multi-entity banking",
      "Regulatory compliance",
    ],
  },
  {
    id: "fraud-risk-intelligence",
    title: "Fraud Detection & Risk Intelligence",
    description:
      "AI-powered risk and fraud detection using Quantexa to build a 360° view of customers and detect financial crime early and accurately.",
    icon: Brain,
    gradient: "from-red-500 to-rose-600",
    features: [
      "Quantexa decision intelligence",
      "Graph-based fraud detection",
      "AML & KYC enhancement",
      "Risk scoring models",
    ],
  },
  {
    id: "process-workflow-automation",
    title: "Process Automation & Workflow Optimization",
    description:
      "End-to-end automation using UiPath, Nintex K2, and OpenText to digitize workflows, reduce manual work, and improve efficiency.",
    icon: Workflow,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "UiPath RPA bots",
      "Nintex K2 workflows",
      "Low-code automation",
      "Process optimization",
    ],
  },
  {
    id: "content-data-management",
    title: "Enterprise Content & Data Management",
    description:
      "Unified data and content management using OpenText ECM, InfoArchive, Postgres EDB, and Tableau for analytics and governance.",
    icon: Cloud,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "OpenText ECM",
      "Enterprise data governance",
      "Tableau dashboards",
      "Postgres EDB analytics",
    ],
  },
  {
    id: "integration-api-management",
    title: "Integration & API Management",
    description:
      "Seamless system integration using MuleSoft and BPC integration to connect enterprise systems, data, and applications in real time.",
    icon: CreditCard,
    gradient: "from-indigo-500 to-blue-500",
    features: [
      "MuleSoft API-led connectivity",
      "System integration",
      "Real-time data exchange",
      "BPC integration layer",
    ],
  },
  {
    id: "digital-collaboration-ai",
    title: "Digital Collaboration & AI Assistant",
    description:
      "AI-powered collaboration using Slack and Nabeeh chatbot to enhance communication, automate actions, and improve productivity.",
    icon: Brain,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Slack collaboration",
      "Nabeeh AI assistant",
      "Agentic AI actions",
      "RAG-based knowledge system",
    ],
  },
];

export default function Solutions() {
  return (
    <div className="pt-20 ">
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent">
              Our Solutions
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive fintech solutions designed to accelerate your
              digital transformation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-6`}
                  >
                    <solution.icon className="text-white" size={40} />
                  </div>

                  <h2 className="text-4xl mb-4">{solution.title}</h2>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {solution.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0066cc] mt-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/solutions/${solution.id}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg hover:shadow-xl group"
                  >
                    Learn More
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={`https://images.unsplash.com/photo-${
                        index === 0
                          ? "1556761175-4b46a572b786"
                          : index === 1
                            ? "1559136555-9303baea8ebd"
                            : index === 2
                              ? "1759661966728-4a02e3c6ed91"
                              : index === 3
                                ? "1604328703693-18313fe20f3a"
                                : "1733503747506-773e56e4078f"
                      }?w=1200`}
                      alt={solution.title}
                      className="w-full h-auto"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-10`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#0066cc] to-[#00a3cc] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Let's discuss how our solutions can transform your business
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0066cc] rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
