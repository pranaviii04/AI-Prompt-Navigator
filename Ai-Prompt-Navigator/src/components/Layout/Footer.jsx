import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-white py-12">
    <div className="max-w-6xl mx-auto px-4 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <img
              src="/images/Logo2.png"
              alt="Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-s-xl rounded-t-sm"
            />
            <span>PromptCraft</span>
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Transform your ideas into powerful AI prompts.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h4>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <div className="hover:text-blue-500 cursor-pointer">Features</div>
            <div className="hover:text-blue-500 cursor-pointer">Pricing</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h4>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <div className="hover:text-blue-500 cursor-pointer">About</div>
            <div className="hover:text-blue-500 cursor-pointer">Blog</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Support</h4>
          <div className="space-y-2 text-gray-600 dark:text-gray-400">
            <div className="hover:text-blue-500 cursor-pointer">Help Center</div>
            <div className="hover:text-blue-500 cursor-pointer">Contact</div>
            <div className="hover:text-blue-500 cursor-pointer">Privacy</div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
        © 2025 PromptCraft AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
