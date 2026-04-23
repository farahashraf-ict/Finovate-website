import { Link } from "react-router-dom";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../assets/finovate-logo.webp";

export default function Footer() {
  const footerLinks = {
    Solutions: [
      { name: "Core Banking", path: "/solutions/core-banking-digital" },
      { name: "Fraud detection", path: "/solutions/fraud-risk-intelligence" },
      { name: "Process automation", path: "/solutions/process-workflow-automation" },
      { name: "Enterprise content", path: "/solutions/content-data-management" },
      { name: "Integration & API management", path: "/solutions/integration-api-management" },
      { name: "Digital Collaboration & AI Assistant", path: "/solutions/digital-collaboration-ai" }

    ],
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Partners", path: "/partners" },
      { name: "Blog", path: "/blog" },
    ],
    Support: [
      { name: "Contact", path: "/contact" },
      { name: "Ask Nabeh", path: "/ask-nabeh" },
      { name: "Documentation", path: "#" },
      { name: "Privacy Policy", path: "#" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Finovate" className="h-10 w-auto" />
            </div>
            <p className="text-gray-300 mb-6 max-w-sm">
              Transforming financial services with innovative technology
              solutions. Empowering businesses to thrive in the digital economy.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://eg.linkedin.com/company/finov8-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0066cc] flex items-center justify-center transition-colors duration-200"
              >
                <FaLinkedinIn size={20} />
              </a>
              <a
                href="https://www.facebook.com/Finov8/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0066cc] flex items-center justify-center transition-colors duration-200"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#0066cc] flex items-center justify-center transition-colors duration-200"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Finovate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
