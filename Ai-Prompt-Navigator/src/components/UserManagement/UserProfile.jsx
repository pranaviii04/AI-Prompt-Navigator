import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import PasswordModal from "./PasswordModal";
import { useAuth } from "../../contexts/AuthContext";

export default function UserProfile() {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: currentUser?.email || "",
    phone: "",
    password: "********",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);

  useEffect(() => {
    if (updateStatus !== null) {
      const timer = setTimeout(() => setUpdateStatus(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [updateStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Replace with actual API call logic
    console.log("Saving", formData);
    setUpdateStatus("Updated successfully.");
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {updateStatus && (
        <div className="mb-4 text-green-600 font-semibold">{updateStatus}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full p-2 rounded bg-gray-100 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full p-2 rounded bg-gray-100 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!editMode}
            className="w-full p-2 rounded bg-gray-100 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2 relative">
          <label className="block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              readOnly
              className="w-full p-2 rounded bg-gray-100 pr-10 cursor-not-allowed"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-600 underline"
        >
          Change Password
        </button>

        {editMode ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>

      <PasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          setUpdateStatus("Password updated successfully.");
        }}
      />
    </div>
  );
}
