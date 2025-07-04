import React, { useState } from 'react';

export default function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: 'Member' });

  const addMember = () => {
    if (newMember.name.trim()) {
      setTeam([...team, newMember]);
      setNewMember({ name: '', role: 'Member' });
    }
  };

  const removeMember = (index) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-semibold mb-4">Team Management</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Team Member Name"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className="border p-2 w-full"
        />
        <select
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          className="border p-2"
        >
          <option>Member</option>
          <option>Admin</option>
        </select>
        <button onClick={addMember} className="bg-green-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul>
        {team.map((member, index) => (
          <li key={index} className="flex justify-between border-b py-2">
            <span>{member.name} - {member.role}</span>
            <button onClick={() => removeMember(index)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
