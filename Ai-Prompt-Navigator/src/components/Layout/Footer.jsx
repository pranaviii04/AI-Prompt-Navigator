import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <img
              src="/images/Logo2.png"
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-s-xl rounded-t-sm"
            />
            <span>PromptCraft</span>
          </h3>
          <p className="text-gray-300">
            Transform your ideas into powerful AI prompts.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Product</h4>
          <div className="space-y-2 text-gray-300">
            <div className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Features</div>
            <div className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Pricing</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Company</h4>
          <div className="space-y-2 text-gray-300">
            <div className="hover:text-purple-400 cursor-pointer transition-colors duration-200">About</div>
            <div className="hover:text-purple-400 cursor-pointer transition-colors duration-200">Blog</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-white">Support</h4>
          <div className="space-y-2 text-gray-300">
            <div className="hover:text-green-400 cursor-pointer transition-colors duration-200">Help Center</div>
            <div className="hover:text-green-400 cursor-pointer transition-colors duration-200">Contact</div>
            <div className="hover:text-green-400 cursor-pointer transition-colors duration-200">Privacy</div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        © 2025 PromptCraft AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
