import React, { useState } from "react";
import countryList from "react-select-country-list";

export default function SubscriptionForm() {
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const [billing, setBilling] = useState({
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cardType, setCardType] = useState("");
  const countries = countryList().getData();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateExpiry = (expiry) => {
    const regex = /^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/;
    if (!regex.test(expiry)) return false;

    const [month, year] = expiry.split("/").map((s) => parseInt(s.trim()));
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    if (name === "expiry") {
      let cleaned = value.replace(/[^0-9]/g, "");
      if (cleaned.length >= 3) {
        cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
      }
      setCardInfo((prev) => ({ ...prev, [name]: cleaned }));
    }
    setCardInfo((prev) => ({ ...prev, [name]: value }));
    if (cleaned === "" || !validateExpiry(cleaned)) {
      setExpiryError("Please enter a valid expiry date (MM/YY) in the future.");
    } else {
      setExpiryError("");
    }
    if (name === "number") {
      const cleaned = value.replace(/\s+/g, "");
      if (/^4/.test(cleaned)) setCardType("Visa");
      else if (/^5[1-5]/.test(cleaned)) setCardType("MasterCard");
      else if (/^3[47]/.test(cleaned)) setCardType("AmEx");
      else if (/^6/.test(cleaned)) setCardType("Discover");
      else setCardType("");
    }
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emailError || expiryError) {
      alert("Please fix the errors before submitting.");
      return;
    }

    if (
      !cardInfo.number ||
      !cardInfo.expiry ||
      !cardInfo.cvc ||
      !cardInfo.name ||
      !billing.country ||
      !billing.address1 ||
      !billing.city ||
      !billing.state ||
      !billing.zip
    ) {
      alert("Please fill all required fields.");
      return;
    }

    alert("Payment submitted successfully!");
  };

  const annualSubtotal = 1500;
  const gst = 0.18;
  const annualTax = annualSubtotal * gst;
  const annualTotal = annualSubtotal + annualTax;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg">
      <div>
        <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
        <div className="text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Annual Plan</span>
            <span>₹{annualSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{annualTax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>Total due today</span>
            <span>₹{annualTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              if (value === "" || !validateEmail(value)) {
                setEmailError("Please enter a valid email address.");
              } else {
                setEmailError("");
              }
            }}
            className="w-full border p-2 rounded"
          />

          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Card Information</label>
          <input
            type="text"
            name="number"
            placeholder="1234 1234 1234 1234"
            value={cardInfo.number}
            onChange={handleCardChange}
            className="w-full border p-2 rounded mt-1"
          />
          {cardType && (
            <p className="text-xs text-gray-600 mt-1">Detected: {cardType}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            name="expiry"
            placeholder="MM / YY"
            value={cardInfo.expiry}
            onChange={handleCardChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={cardInfo.cvc}
            onChange={handleCardChange}
            className="w-full border p-2 rounded"
          />
        </div>
        {expiryError && (
          <p className="text-red-600 text-sm mt-1">{expiryError}</p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Cardholder name"
          value={cardInfo.name}
          onChange={handleCardChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="block text-sm font-medium">Billing Address</label>
          <select
            name="country"
            value={billing.country}
            onChange={handleBillingChange}
            className="w-full border p-2 rounded mb-2"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={billing.address1}
            onChange={handleBillingChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2 (optional)"
            value={billing.address2}
            onChange={handleBillingChange}
            className="w-full border p-2 rounded mb-2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billing.city}
              onChange={handleBillingChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="zip"
              placeholder="Postal Code"
              value={billing.zip}
              onChange={handleBillingChange}
              className="border p-2 rounded"
            />
          </div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={billing.state}
            onChange={handleBillingChange}
            className="w-full border p-2 rounded mt-2"
          />
        </div>

        <label className="flex items-center space-x-2">
          <input type="checkbox" className="accent-blue-500" />
          <span className="text-sm">
            Save my information for faster checkout
          </span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
}
