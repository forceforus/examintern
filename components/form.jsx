'use client';
import { useState } from 'react';

export default function UserForm() {
  const [formData, setFormData] = useState({
    usertypeid: '', // Title selection
    username: '',
    usersurname: '',
    dateofbirth: '',
    income: '',  // เพิ่มช่องกรอกรายได้
    outcome: '', // เพิ่มช่องกรอกรายจ่าย
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Data inserted successfully!');
        setFormData({
          usertypeid: '',
          username: '',
          usersurname: '',
          dateofbirth: '',
          income: '',
          outcome: '',
        });
      } else {
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit data');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">User Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title (Radio Buttons) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="usertypeid"
                value="1"
                checked={formData.usertypeid === '1'}
                onChange={handleChange}
                className="form-radio text-blue-500"
                required
              />
              <span className="ml-2">นาย</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="usertypeid"
                value="2"
                checked={formData.usertypeid === '2'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">นาง</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="usertypeid"
                value="3"
                checked={formData.usertypeid === '3'}
                onChange={handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">นางสาว</span>
            </label>
          </div>
        </div>
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* User Surname */}
        <div>
          <label className="block text-sm font-medium text-gray-700">User Surname</label>
          <input
            type="text"
            name="usersurname"
            value={formData.usersurname}
            onChange={handleChange}
            placeholder="Enter your surname"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Income */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Income</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            placeholder="Enter income"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Outcome */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Outcome</label>
          <input
            type="number"
            name="outcome"
            value={formData.outcome}
            onChange={handleChange}
            placeholder="Enter outcome"
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
