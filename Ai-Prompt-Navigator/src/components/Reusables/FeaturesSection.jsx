import React from "react";

const features = [
  {
    title: "Signup / Login",
    description: "Create an account and sign in using email or Google authentication.",
    endpoint: "/api/signup | /api/signin | /api/auth/google",
    icon: "🔐",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Interactive Prompt Builder",
    description: "Engage with a dynamic interface to create rich, optimized prompts.",
    endpoint: "/api/idea",
    icon: "⚡",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Answer Generation",
    description: "Receive tailored responses based on generated prompts.",
    endpoint: "/api/answer",
    icon: "🎯",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Credit System",
    description: "Manage your credits (100 free to start, 10 per prompt).",
    endpoint: "/api/users/{gmail_id}/verify_credits",
    icon: "💎",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Prompt History",
    description: "Access and manage previously generated prompts.",
    endpoint: "/api/history/{gmail_id}",
    icon: "📚",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "User Session Info",
    description: "Get current user details or logout.",
    endpoint: "/api/me | /api/logout",
    icon: "👤",
    gradient: "from-teal-500 to-cyan-500",
  },
];

const EnhancedFeatureCard = ({ title, description, endpoint, icon, gradient }) => (
  <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 border border-gray-100 transform hover:scale-105 transition-all duration-300 overflow-hidden">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

    <div
      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl text-white text-2xl mb-6 shadow-lg`}
    >
      {icon}
    </div>

    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
      {title}
    </h3>
    <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

    <div className="inline-block">
      <code className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 rounded-lg text-purple-700 font-medium">
        {endpoint}
      </code>
    </div>

    <div
      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
    ></div>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 lg:px-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Powerful Core Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, manage, and optimize your AI prompts in one beautiful interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <EnhancedFeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
