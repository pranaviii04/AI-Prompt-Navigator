import React, { useState } from 'react';

export default function BillingSubscription() {
  const [plan, setPlan] = useState('Pro');
  const [paymentMethod, setPaymentMethod] = useState('Visa **** 4242');

  return (
    <div className="p-4 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Billing & Subscription</h2>

      <div className="mb-4">
        <p>Current Plan: <strong>{plan}</strong></p>
        <button onClick={() => setPlan(plan === 'Pro' ? 'Basic' : 'Pro')} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          {plan === 'Pro' ? 'Downgrade to Basic' : 'Upgrade to Pro'}
        </button>
      </div>

      <div>
        <p>Payment Method: <strong>{paymentMethod}</strong></p>
        <button className="bg-gray-700 text-white px-4 py-2 mt-2 rounded">
          Manage Payment Method
        </button>
      </div>
    </div>
  );
}
