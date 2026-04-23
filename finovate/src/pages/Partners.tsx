import { motion } from "motion/react";
import handShake from "../assets/our-partners.jpg";

const partners = [
  {
    name: "Oracle",
    logo: new URL("../assets/partnersLogo/oracle-picture.png", import.meta.url)
      .href,
  },
  {
    name: "UiPath",
    logo: new URL("../assets/partnersLogo/uipath-picture.jpg", import.meta.url)
      .href,
  },
  {
    name: "Nintex",
    logo: new URL("../assets/partnersLogo/nintex-picture.jpg", import.meta.url)
      .href,
  },
  {
    name: "OpenText",
    logo: new URL(
      "../assets/partnersLogo/opentext-picture.jpg",
      import.meta.url,
    ).href,
  },
  {
    name: "Quantexa",
    logo: new URL(
      "../assets/partnersLogo/quantexa-picture.jpg",
      import.meta.url,
    ).href,
  },
  {
    name: "BPC",
    logo: new URL("../assets/partnersLogo/bpc-picture.svg", import.meta.url)
      .href,
  },
  {
    name: "Salesforce",
    logo: new URL(
      "../assets/partnersLogo/salesforce-picture.png",
      import.meta.url,
    ).href,
  },
  {
    name: "Tableau",
    logo: new URL("../assets/partnersLogo/tableau-picture.jpg", import.meta.url)
      .href,
  },
  {
    name: "MuleSoft",
    logo: new URL(
      "../assets/partnersLogo/mulesoft-picture.jpg",
      import.meta.url,
    ).href,
  },
  {
    name: "Slack",
    logo: new URL("../assets/partnersLogo/slack-picture.png", import.meta.url)
      .href,
  },
  {
    name: "EDB Postgres",
    logo: new URL("../assets/partnersLogo/edb-picture.png", import.meta.url)
      .href,
  },
];

const benefits = [
  {
    title: "Global Reach",
    description: "Access to worldwide networks and resources",
  },
  {
    title: "Trusted Security",
    description: "Industry-leading security standards and compliance",
  },
  {
    title: "Faster Innovation",
    description: "Accelerated development and deployment",
  },
  {
    title: "Expert Support",
    description: "Combined expertise from industry leaders",
  },
];

const scrollingPartners = [...partners, ...partners];

export default function Partners() {
  return (
    <div className="pt-20">
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={handShake}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/80" />
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDY2Y2MiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            <p className="text-sm text-white/60 mb-3 tracking-wide uppercase">
              Strategic Partnerships
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Our Partners
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Collaborating with industry leaders to deliver exceptional fintech
              solutions that accelerate innovation, security, and growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-[#141D31] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <style>{`
            @keyframes partner-scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }

            .partner-scroll {
              animation: partner-scroll 28s linear infinite;
            }

            .partner-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl mb-4">Partnership Benefits</h2>
            <p className="text-xl text-white/75">
              Why our partnerships matter to you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-white/5 p-6 text-center"
              >
                <h3 className="text-xl mb-3">{benefit.title}</h3>
                <p className="text-white/75">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl mb-3">Our Core Partners</h3>
            <p className="text-white/75">
              A focused group of platforms we trust and integrate deeply
            </p>
          </motion.div>

          <div className="relative overflow-hidden rounded-3xl bg-white/10 p-6 shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#141D31] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#141D31] to-transparent" />
            <div className="partner-scroll flex w-max items-center gap-6">
              {scrollingPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="group relative flex min-w-[200px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0066cc] hover:shadow-xl"
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/5 via-transparent to-[#00a3cc]/10" />
                  </div>
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="relative h-12 w-auto max-w-[180px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">Become a Partner</h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Join our ecosystem of innovative companies working together to
                transform the financial services industry.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you're a technology provider, system integrator, or
                industry specialist, we'd love to explore partnership
                opportunities.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Partner With Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?w=1200"
                alt="Partnership"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
