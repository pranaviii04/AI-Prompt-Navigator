import React, { useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    oldPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!user.name.trim()) newErrors.name = 'Name is required.';
    if (!emailRegex.test(user.email)) newErrors.email = 'Enter a valid email.';

    if (user.password) {
      if (!passwordRegex.test(user.password)) {
        newErrors.password =
          'Password must include uppercase, lowercase, number, and special character.';
      }
      if (!user.oldPassword.trim()) {
        newErrors.oldPassword = 'Old password is required to set a new one.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on typing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setShowSuccess(true);
    setUser({
      name: '',
      email: '',
      password: '',
      oldPassword: '',
    });

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-4 bg-white shadow rounded relative max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Profile</h2>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          🎉 Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className={`border p-2 w-full rounded focus:outline-none ${
              errors.name ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-400'
            }`}
            placeholder="Enter Your Name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className={`border p-2 w-full rounded focus:outline-none ${
              errors.email ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-400'
            }`}
            placeholder="Enter Email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Old Password Field (Always visible now) */}
        <div>
          <input
            type="password"
            name="oldPassword"
            value={user.oldPassword}
            onChange={handleChange}
            className={`border p-2 w-full rounded focus:outline-none ${
              errors.oldPassword ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-400'
            }`}
            placeholder="Enter Old Password"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
          )}
        </div>

        {/* New Password Field */}
        <div>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={`border p-2 w-full rounded focus:outline-none ${
              errors.password ? 'border-red-500' : 'focus:ring-2 focus:ring-blue-400'
            }`}
            placeholder="New Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a
            href="#"
            className="text-blue-500 text-sm hover:underline"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirect to Forgot Password page...');
            }}
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}