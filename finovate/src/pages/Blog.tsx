import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const categories = ["All", "AI & Data", "Banking", "Payments", "Technology", "Industry News"];

const blogPosts = [
  {
    title: "The Future of AI in Financial Services",
    excerpt: "Exploring how artificial intelligence is transforming the banking industry and creating new opportunities for innovation.",
    category: "AI & Data",
    date: "April 15, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1762279389083-abf71f22d338?w=800",
  },
  {
    title: "Core Banking Modernization: A Complete Guide",
    excerpt: "Learn the key steps and best practices for successfully modernizing your legacy core banking systems.",
    category: "Banking",
    date: "April 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800",
  },
  {
    title: "Real-Time Payments: The New Standard",
    excerpt: "Why instant payment processing is becoming essential and how to implement it in your organization.",
    category: "Payments",
    date: "April 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1733503747506-773e56e4078f?w=800",
  },
  {
    title: "Cloud Migration for Financial Institutions",
    excerpt: "A comprehensive look at cloud adoption strategies, security considerations, and compliance requirements.",
    category: "Technology",
    date: "April 8, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
  },
  {
    title: "2026 Fintech Trends Report",
    excerpt: "Our annual analysis of emerging trends, technologies, and opportunities in the fintech landscape.",
    category: "Industry News",
    date: "April 5, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1758691737543-09a1b2b715fa?w=800",
  },
  {
    title: "Process Automation ROI Calculator",
    excerpt: "Quantifying the business impact of intelligent automation in financial operations.",
    category: "Technology",
    date: "April 3, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1604328703693-18313fe20f3a?w=800",
  },
];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              Insights & Updates
            </h1>
            <p className="text-xl text-gray-600">
              Stay informed with the latest fintech trends and industry insights
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-[#0066cc] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:border-[#0066cc] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#0066cc] text-white text-sm rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl mb-3 group-hover:text-[#0066cc] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>

                    <div className="flex items-center text-[#0066cc] group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">
                No articles found matching your criteria.
              </p>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="mt-12 text-center">
              <button className="px-8 py-4 bg-white text-[#0066cc] rounded-full border-2 border-[#0066cc] hover:bg-blue-50 transition-all duration-300">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
