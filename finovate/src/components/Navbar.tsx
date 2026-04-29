import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SolutionsMenu } from "./SolutionsMenu";
import logo from "../assets/finovate-logo.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      setIsNavbarVisible(
        currentScrollY < lastScrollYRef.current || currentScrollY < 10,
      );
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Solutions", path: "/solutions" },
    { name: "Ask Nabeh", path: "/ask-nabeh" },
    { name: "Partners", path: "/partners" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`text-white fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 shadow-lg"
          : "bg-gradient-to-br from-slate-900 to-slate-800"
      } ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Finovate" className="h-10 w-auto" />
          </Link>

          <div className="hidden lg:flex items-center space-x-3">
            {navLinks.map((link) =>
              link.name === "Solutions" ? (
                <SolutionsMenu key={link.path} />
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm transition-colors duration-200 px-4 py-2 rounded-full ${
                    location.pathname === link.path
                      ? "bg-gray-500/30 text-white"
                      : "text-white hover:bg-gray-500/20"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-[#0066cc] text-white rounded-full hover:bg-[#0052a3] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#0066cc]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-base transition-colors duration-200 ${
                    location.pathname === link.path
                      ? "text-[#0066cc]"
                      : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-6 py-2.5 bg-[#0066cc] text-white rounded-full text-center"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
