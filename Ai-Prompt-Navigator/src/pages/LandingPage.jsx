import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/LandingLayout/Navbar"; // ✅ Make sure this exists
import FloatingElement from "../components/LandingLayout/FloatingElement"; // ✅ Make sure this exists
import Footer from "../components/Layout/Footer";
import FeaturesSection from "../components/LandingLayout/FeaturesSection";
import { Link } from "react-router-dom"; // ✅ Make sure this exists

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app/dashboard");
    }
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-gray-50 text-gray-800 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-center py-20 px-4 lg:px-16 bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 text-white min-h-screen flex items-center">
        {/* Background gradient blobs stay unchanged */}

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Floating title/description/buttons */}
          <FloatingElement>
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full text-sm mb-6"></div>
          </FloatingElement>

          <FloatingElement delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              AI Prompt Navigator
            </h1>
          </FloatingElement>

          <FloatingElement delay={400}>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into powerful AI prompts with zero effort.
              <br className="hidden lg:block" />
              <span className="text-yellow-300 font-semibold">
                Boost your productivity by 10x
              </span>
            </p>
          </FloatingElement>

          <FloatingElement delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center">
                <Link to="/register">
                <button className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-white to-purple-50 text-purple-700 font-bold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
                <span className="mr-2">🚀</span>
                Get Started for Free
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              </button>
                </Link>
            </div>
          </FloatingElement>

          {/* Hero image */}
          <FloatingElement delay={800}>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
                alt="AI Dashboard Preview"
                className="relative mx-auto w-full rounded-2xl shadow-2xl border border-white border-opacity-20"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-2xl"></div>
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* ✅ Features Section */}
      <FeaturesSection />

      {/* CTA Section — JUST the button stack fix */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 lg:px-16">
          <FloatingElement>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Ready to Transform Your AI Workflow?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of creators, researchers, and professionals who've
              already revolutionized their prompt engineering process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
                  <span className="mr-3">🎯</span>
                  Start Your Free Journey
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </FloatingElement>
        </div>
      </section>

      {/* Footer stays the same */}
      <Footer />
    </div>
  );
};

export default LandingPage;
