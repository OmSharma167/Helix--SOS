import React from "react";
import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-slate-900 border-t border-slate-800 text-center text-slate-500">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Healthcare Solutions</h2>
            <p className="text-sm text-gray-400">
              Empowering better health through innovative solutions.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-blue-400" />
                <a
                  href="mailto:contact@healthcaresolutions.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  contact@healthcaresolutions.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-blue-400" />
                <a
                  href="tel:+918090349760"
                  className="hover:text-blue-400 transition-colors"
                >
                  +91 80903 49760
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="bg-blue-400 p-2 rounded-full hover:bg-blue-300 transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="bg-blue-600 p-2 rounded-full hover:bg-blue-500 transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>Privacy Policy | Terms of Service | Cookie Policy</p>
          <p className="mt-2">
            &copy; {currentYear} HelixSOS — Redefining Emergency Response.
          </p>
        </div>
      </div>
    </footer>
  );
}
