import React, { useState } from 'react';
import countryList from 'react-select-country-list';
import countryData from 'country-telephone-data';

export default function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    role: 'Member'
  });
  const [editMemberData, setEditMemberData] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [toast, setToast] = useState('');
  const [showModal, setShowModal] = useState(false);

  const countries = countryList().getData();
  const countryCodes = countryData.allCountries;

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{7,15}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const addMember = () => {
    if (!newMember.firstName.trim() || !newMember.lastName.trim()) return;

    const isEmailValid = validateEmail(newMember.email);
    const isPhoneValid = validatePhone(newMember.phone);

    setEmailError(isEmailValid ? '' : 'Invalid email address.');
    setPhoneError(isPhoneValid ? '' : 'Phone must be 7-15 digits.');

    if (!isEmailValid || !isPhoneValid) return;

    const duplicate = team.some(
      (member) =>
        member.email.toLowerCase() === newMember.email.toLowerCase() ||
        (member.phone === newMember.phone && member.countryCode === newMember.countryCode)
    );

    if (duplicate) {
      setToast('Member with this email or phone already exists!');
      setTimeout(() => setToast(''), 3000);
      return;
    }

    setTeam([...team, newMember]);
    setToast('Member added successfully!');
    setNewMember({ firstName: '', lastName: '', email: '', phone: '', countryCode: '+91', role: 'Member' });
    setTimeout(() => setToast(''), 3000);
  };

  const updateMember = () => {
    if (!editMemberData.firstName.trim() || !editMemberData.lastName.trim()) return;

    const isEmailValid = validateEmail(editMemberData.email);
    const isPhoneValid = validatePhone(editMemberData.phone);

    setEmailError(isEmailValid ? '' : 'Invalid email address.');
    setPhoneError(isPhoneValid ? '' : 'Phone must be 7-15 digits.');

    if (!isEmailValid || !isPhoneValid) return;

    const duplicate = team.some((member, idx) =>
      idx !== editingIndex &&
      (member.email.toLowerCase() === editMemberData.email.toLowerCase() ||
        (member.phone === editMemberData.phone && member.countryCode === editMemberData.countryCode))
    );

    if (duplicate) {
      setToast('Another member with this email or phone already exists!');
      setTimeout(() => setToast(''), 3000);
      return;
    }

    const updatedTeam = [...team];
    updatedTeam[editingIndex] = editMemberData;
    setTeam(updatedTeam);
    setEditingIndex(null);
    setEditMemberData(null);
    setShowModal(false);
    setToast('Member updated successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const editMember = (index) => {
    setEditMemberData({ ...team[index] });
    setEditingIndex(index);
    setShowModal(true);
  };

  const removeMember = (index) => {
    setTeam(team.filter((_, i) => i !== index));
    setToast('Member removed successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="relative p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-6">
      {toast && <div className="absolute top-0 left-0 w-full bg-green-100 text-green-800 px-4 py-2 rounded-t shadow-md text-sm text-center z-10">{toast}</div>}

      <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-10">Team Management</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={newMember.firstName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={newMember.lastName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newMember.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="countryCode"
          value={newMember.countryCode}
          onChange={handleChange}
          className="border p-2 w-1/3"
        >
          {countryCodes.map((country, idx) => (
            <option key={idx} value={`+${country.dialCode}`}>
              {country.name} (+{country.dialCode})
            </option>
          ))}
        </select>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newMember.phone}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <select
          name="role"
          value={newMember.role}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option>Member</option>
          <option>Admin</option>
        </select>
      </div>
      {(emailError || phoneError) && <p className="text-red-600 text-sm mb-4">{emailError || phoneError}</p>}

      <button
        onClick={addMember}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Member
      </button>

      <ul className="divide-y divide-gray-200 mt-6">
        {team.map((member, index) => (
          <li key={index} className="py-3 flex flex-col md:flex-row md:items-center justify-between">
            <div className="space-y-1 md:space-y-0 md:space-x-4 md:flex md:items-center">
              <span className="font-medium text-gray-800">
                {member.firstName} {member.lastName}
              </span>
              <span className="text-sm text-gray-600">{member.email}</span>
              <span className="text-sm text-gray-600">{member.countryCode} {member.phone}</span>
              <span className="text-sm text-gray-600">{member.role}</span>
            </div>
            <div className="mt-2 md:mt-0 space-x-2">
              <button
                onClick={() => editMember(index)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => removeMember(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
            <button onClick={() => { setShowModal(false); setEditingIndex(null); setEditMemberData(null); }} className="absolute top-2 right-2 text-gray-500">✖</button>
            <h3 className="text-xl font-semibold mb-4">Edit Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={editMemberData?.firstName || ''}
                onChange={(e) => setEditMemberData(prev => ({ ...prev, firstName: e.target.value }))}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={editMemberData?.lastName || ''}
                onChange={(e) => setEditMemberData(prev => ({ ...prev, lastName: e.target.value }))}
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={editMemberData?.email || ''}
                onChange={(e) => setEditMemberData(prev => ({ ...prev, email: e.target.value }))}
                className="border p-2 rounded col-span-2"
              />
              {emailError && <p className="text-red-600 text-sm col-span-2">{emailError}</p>}
              <div className="flex gap-2 col-span-2">
                <select
                  name="countryCode"
                  value={editMemberData?.countryCode || '+91'}
                  onChange={(e) => setEditMemberData(prev => ({ ...prev, countryCode: e.target.value }))}
                  className="border p-2 rounded w-1/3"
                >
                  {countryCodes.map((country, idx) => (
                    <option key={idx} value={`+${country.dialCode}`}>
                      {country.name} (+{country.dialCode})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={editMemberData?.phone || ''}
                  onChange={(e) => setEditMemberData(prev => ({ ...prev, phone: e.target.value }))}
                  className="border p-2 rounded w-2/3"
                />
              </div>
              {phoneError && <p className="text-red-600 text-sm col-span-2">{phoneError}</p>}
              <select
                name="role"
                value={editMemberData?.role || 'Member'}
                onChange={(e) => setEditMemberData(prev => ({ ...prev, role: e.target.value }))}
                className="border p-2 rounded col-span-2"
              >
                <option>Member</option>
                <option>Admin</option>
              </select>
              <button
                onClick={updateMember}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 col-span-2"
              >
                Update Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
