import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";
import calling from "../assets/businessman-using-smartphone.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20">
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={calling}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-800/80" />
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCI...')] opacity-30" />

        {/* Content (LEFT ALIGNED) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            {/* Small Gray Title */}
            <p className="text-sm text-white/60 mb-3 tracking-wide uppercase">
              Get in touch
            </p>

            {/* Big Bold Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              We're here to help, 24/7
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-white/80 leading-relaxed">
              Contact us today to schedule a personalized consultation and take
              the first step toward building a smarter financial future.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h2 className="text-3xl mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Have a question or want to discuss how Finovate can help
                transform your business? Reach out to our team.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066cc] to-[#00a3cc] flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1">Email</h3>
                    <a
                      href="mailto:hello@finovate.com"
                      className="text-gray-600 hover:text-[#0066cc] transition-colors"
                    >
                      info@finovate.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1">Phone</h3>
                    <a
                      href="tel:+1-800-FINOVATE"
                      className="text-gray-600 hover:text-[#0066cc] transition-colors"
                    >
                      +20 2 3785 3454 <br /> +20 2 3785 3638
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="mb-1">Head Office</h3>
                    <p className="text-gray-600">
                      Building 144, 2nd District, 5th Zone, Sheikh Zayed City,
                      Giza, Egypt. 111 North Lotus 4 - New Cairo, Cairo, Egypt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="mb-4">Office Hours</h3>
                <div className="text-gray-600 space-y-2">
                  <p>Sunday - Monday: 9:00 AM - 5:00 PM EGY</p>
                  <p>Friday - Saturday: Closed</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12">
                <h2 className="text-3xl mb-8">Send us a Message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-12 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Send className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-2xl mb-3">Thank You!</h3>
                    <p className="text-gray-600">
                      We've received your message and will get back to you
                      shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0066cc] transition-colors bg-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0066cc] transition-colors bg-white"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0066cc] transition-colors bg-white"
                        placeholder="Company Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0066cc] transition-colors bg-white resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-4 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <Send
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
            <div className="aspect-[21/9] bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <MapPin size={48} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/10 to-[#00a3cc]/10" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
