import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="max-w-6xl mx-auto px-4 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">
            <img
            src="/images/Logo2.png"
            alt="Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-s-xl rounded-t-sm "
          />
             PromptCraft</h3>
          <p className="text-gray-400">Transform your ideas into powerful AI prompts.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <div className="space-y-2 text-gray-400">
            <div>Features</div>
            <div>Pricing</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <div className="space-y-2 text-gray-400">
            <div>About</div>
            <div>Blog</div>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Support</h4>
          <div className="space-y-2 text-gray-400">
            <div>Help Center</div>
            <div>Contact</div>
            <div>Privacy</div>
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



