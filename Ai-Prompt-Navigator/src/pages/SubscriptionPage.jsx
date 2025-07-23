// src/pages/SubscriptionPlans.jsx
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    credits: "10 credits",
    features: [
      "Access to prompt generation",
      "Interactive questioning (limited)",
      "Basic prompt history",
    ],
    limitations: ["No credit top-up", "No AI model customization"],
    buttonLabel: "Get Started",
    tier: "free",
  },
  {
    name: "Silver",
    price: "₹499",
    credits: "100 credits",
    features: [
      "Full access to dynamic question generation",
      "Enhanced prompt quality (tone, format, audience)",
      "Access to full prompt history",
      "Priority support",
    ],
    limitations: ["No unlimited credits"],
    buttonLabel: "Upgrade to Silver",
    tier: "Silver",
  },
  {
    name: "Gold",
    price: "₹3999",
    credits: "1000 credits",
    features: [
      "Unlimited prompt generation",
      "Full history access & export",
      "Advanced prompt refinement tools",
      "Premium support",
    ],
    limitations: ["No unlimited credits"],
    buttonLabel: "Upgrade to Gold",
    tier: "Gold",
  },
  {
    name: "Diamond",
    price: "₹9999",
    credits: "5000 credits",
    features: [
      "Unlimited prompt generation",
      "Full history access & export",
      "Advanced prompt refinement tools",
      "Premium support",
    ],
    limitations: [],
    buttonLabel: "Upgrade to Diamond",
    tier: "Diamond",
  },
];

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (tier) => {
    // Placeholder for Stripe/Payment integration
    // navigate(`/checkout?plan=${tier}`);
    alert(`Redirecting to payment gateway for: ${tier} plan`);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Choose Your Plan
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <div>
              <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-2">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.price}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {plan.credits}
              </p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-green-600 dark:text-green-400">
                    <Check className="w-5 h-5 mr-2" />
                    {feature}
                  </li>
                ))}
                {plan.limitations.map((limitation, index) => (
                  <li key={index} className="flex items-center text-red-500">
                    <X className="w-5 h-5 mr-2" />
                    {limitation}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => handleSubscribe(plan.tier)}
              className="mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all"
            >
              {plan.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
