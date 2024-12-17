'use client';
import { useEffect, useState } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [username, setUsername] = useState('');
  const [usersurname, setUsersurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [income, setIncome] = useState('');
  const [outcome, setOutcome] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/userdetail');
      const result = await response.json();
      if (response.ok) {
        setUsers(result.data);
        setFilteredUsers(result.data);
      } else {
        setError(result.error || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_surname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleEditUser = (user) => {
    setEditingUser(user.user_id);
    setUsername(user.user_name);
    setUsersurname(user.user_surname);
    setDateOfBirth(user.date_of_birth);
    setIncome(user.income);
    setOutcome(user.outcome);
  };

  const handleSaveEdit = async () => {
    if (!username || !usersurname || !dateOfBirth || !income || !outcome) {
      setError('Please fill all fields');
      return;
    }
    try {
      const response = await fetch(`/api/userdetail/${editingUser}`, { // เปลี่ยนจาก userId เป็น editingUser
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, usersurname, date_of_birth: dateOfBirth, income, outcome }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('User updated successfully');
        fetchUsers();
        setEditingUser(null);
        setUsername('');
        setUsersurname('');
        setDateOfBirth('');
        setIncome('');
        setOutcome('');
      } else {
        setError(result.error || 'Failed to update user');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error updating user');
    }
  };
  

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    if (confirmation) {
      try {
        const response = await fetch(`/api/userdetail/deleteuser/${userId}`, { method: 'DELETE' });
        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
        } else {
          setError(result.error || 'Failed to delete user');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Error deleting user');
      }
    }
  };

  const handleSortByAge = (ascending = true) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const ageA = a.age;
      const ageB = b.age;
      return ascending ? ageA - ageB : ageB - ageA;
    });
    setFilteredUsers(sortedUsers);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User List</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="flex mb-6 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or surname"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 w-80 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <div className="space-x-2">
          <button
            onClick={() => handleSortByAge(true)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            เรียงน้อย-มาก
          </button>
          <button
            onClick={() => handleSortByAge(false)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200"
          >
            เรียงมาก-น้อย
          </button>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
          <th className="p-4 text-left text-sm text-gray-700">Title</th>
            <th className="p-4 text-left text-sm text-gray-700">Username</th>
            <th className="p-4 text-left text-sm text-gray-700">Surname</th>
            
            <th className="p-4 text-left text-sm text-gray-700">Date of Birth</th>
            <th className="p-4 text-left text-sm text-gray-700">Age</th>
            <th className="p-4 text-left text-sm text-gray-700">Income</th>
            <th className="p-4 text-left text-sm text-gray-700">Outcome</th>
            <th className="p-4 text-left text-sm text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center p-4 text-gray-600">No users found</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.user_id} className="border-b">
                <td className="p-4 text-gray-700">{user.usertype_name}</td>
                <td className="p-4 text-gray-700">{user.user_name}</td>
                <td className="p-4 text-gray-700">{user.user_surname}</td>
                <td className="p-4 text-gray-700">{new Date(user.date_of_birth).toLocaleDateString('en-GB')}</td>
                <td className="p-4 text-gray-700">{user.age}</td>
                <td className="p-4 text-gray-700">{user.income}</td>
                <td className="p-4 text-gray-700">{user.outcome}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.user_id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editingUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
            <h3 className="text-2xl font-bold mb-4">Edit User</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="mb-4">
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Surname</label>
                  <input
                    type="text"
                    value={usersurname}
                    onChange={(e) => setUsersurname(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Income</label>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Outcome</label>
                  <input
                    type="number"
                    value={outcome}
                    onChange={(e) => setOutcome(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
