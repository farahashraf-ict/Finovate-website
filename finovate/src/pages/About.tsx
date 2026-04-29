import { motion } from "motion/react";
import { Target, Eye, Users, Award } from "lucide-react";
import office from "../assets/group-people-working-team.jpg";

const timeline = [
  {
    year: "2018",
    title: "Founded",
    description:
      "Finovate was established with a vision to revolutionize fintech",
  },
  {
    year: "2020",
    title: "Expansion",
    description: "Expanded operations to serve 50+ enterprise clients",
  },
  {
    year: "2022",
    title: "Innovation",
    description: "Launched AI-powered solutions platform",
  },
  {
    year: "2024",
    title: "Global",
    description: "Reached 500+ clients across 40 countries",
  },
  {
    year: "2026",
    title: "Leading",
    description: "Industry leader in fintech transformation",
  },
];

const team = [
  {
    name: "David Martinez",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1758518731457-5ef826b75b3b?w=400",
  },
  {
    name: "Sarah Johnson",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1758518729371-5ee28c4ddf60?w=400",
  },
  {
    name: "Michael Chen",
    role: "VP of Engineering",
    image: "https://images.unsplash.com/photo-1758518729912-bf3a84c400e0?w=400",
  },
  {
    name: "Emma Williams",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1758518726869-01aff69a56e3?w=400",
  },
];

export default function About() {
  return (
    <div className="pt-20">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={office}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/80" />
        </div>

        {/* Text Content */}
        <div className="relative z-20 text-center max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r text-white/80 bg-clip-text text-transparent">
              About Finovate
            </h1>

            <p className="text-xl text-white/80">
              We're on a mission to transform financial services through
              innovative technology solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent">
              About Finovate
            </h1>
            <p className="text-xl text-gray-600">
              We're on a mission to transform financial services through innovative technology solutions
            </p>
          </motion.div>
        </div>
      </section> */}

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1758691737543-09a1b2b715fa?w=1200"
                alt="Our Team"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2025, Finovate specializes in core banking,
                  AI-driven automation, fraud detection, risk management, and
                  compliance. We use technologies like ML, NLP, and RPA to help
                  financial institutions, businesses, and government entities
                  improve efficiency and optimize operations.
                </p>
                <p>
                  We also provide custom AI integrations, implementation, and
                  outsourcing services, enabling organizations to successfully
                  navigate their digital transformation journey.
                </p>
                <p>
                  Our goal is to become a leading AI services provider in the
                  financial sector and a trusted partner for delivering and
                  implementing advanced enterprise technologies.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#0066cc] to-[#00a3cc] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-lg"
            >
              {/* <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#00a3cc] flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div> */}
              <h3 className="text-3xl mb-4 text-black font-extrabold">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Finovate accelerates digital transformation across financial
                institutions through intelligent, AI-powered solutions. <br/>By
                leveraging global technologies from leading international
                vendors, we help banks enhance performance, drive innovation,
                and achieve measurable business impact in the digital era.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-10 shadow-lg"
            >
              {/* <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div> */}
              <h3 className="text-3xl mb-4 text-black font-extrabold">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                We aim to be the first-choice partner for banking and AI
                solutions in Egypt and Africa by empowering businesses with
                AI-driven technologies that transform operations and enable
                smarter decision-making.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              Milestones that shaped our company
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#0066cc] to-[#00a3cc] hidden lg:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:gap-16`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg inline-block">
                      <div className="text-3xl text-[#0066cc] mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0066cc] to-[#00a3cc] flex items-center justify-center shadow-lg z-10">
                    <Award className="text-white" size={28} />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Users className="mx-auto mb-4 text-[#0066cc]" size={48} />
            <h2 className="text-4xl mb-4">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600">
              Experienced leaders driving innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
