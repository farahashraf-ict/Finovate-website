import { motion } from "motion/react";
import { MapPin, Briefcase, Clock, ArrowRight, Heart, Zap, Users, Trophy } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs",
  },
  {
    icon: Zap,
    title: "Growth & Learning",
    description: "Continuous learning opportunities and career development",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with talented teams in a supportive environment",
  },
  {
    icon: Trophy,
    title: "Competitive Benefits",
    description: "Attractive compensation and performance bonuses",
  },
];

const jobs = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote / New York",
    type: "Full-time",
    description: "Build scalable fintech solutions using modern technologies. Work on cutting-edge AI and cloud infrastructure.",
  },
  {
    title: "Product Manager - AI Solutions",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    description: "Lead the development of our AI-powered financial products. Define strategy and drive execution.",
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Manage cloud infrastructure and CI/CD pipelines. Ensure reliability and scalability.",
  },
  {
    title: "UX/UI Designer",
    department: "Design",
    location: "London",
    type: "Full-time",
    description: "Create beautiful, intuitive interfaces for financial applications. Shape user experience.",
  },
  {
    title: "Data Scientist",
    department: "Data & Analytics",
    location: "Remote / Singapore",
    type: "Full-time",
    description: "Develop machine learning models for financial analytics. Drive data-driven insights.",
  },
  {
    title: "Solutions Architect",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Design and implement enterprise solutions for clients. Bridge technical and business needs.",
  },
];

export default function Careers() {
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-[#0066cc] to-[#00a3cc] bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-xl text-gray-600">
              Help us transform the future of financial services
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Why Finovate?</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                At Finovate, we're not just building software—we're shaping the future of finance. Join a team of passionate innovators working on cutting-edge technology that impacts millions.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe in fostering a culture of creativity, collaboration, and continuous learning. Our team members are empowered to take ownership, experiment with new ideas, and make a real impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1758518731722-320023fb8e66?w=1200"
                alt="Team"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600">
              We invest in our team's success and well-being
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#0066cc] to-[#00a3cc] flex items-center justify-center">
                  <benefit.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity
            </p>
          </motion.div>

          <div className="space-y-6">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl group-hover:text-[#0066cc] transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-3 py-1 bg-blue-100 text-[#0066cc] rounded-full text-sm">
                        {job.department}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{job.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        Posted 2 days ago
                      </div>
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-md hover:shadow-lg group-hover:gap-3 whitespace-nowrap">
                    Apply Now
                    <ArrowRight size={20} />
                  </button>
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
            <h2 className="text-4xl mb-6">Don't See a Perfect Match?</h2>
            <p className="text-xl mb-8 text-blue-100">
              We're always looking for exceptional talent. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0066cc] rounded-full hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get in Touch
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
