import React, { useState } from 'react';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: 'Zaara Alladin',
    email: 'zaara@example.com',
    password: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    // Add API integration here
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="New Password"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
