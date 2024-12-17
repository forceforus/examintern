'use client';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function UserList2() {
  const [users, setUsers] = useState([]);
  const [ageRanges, setAgeRanges] = useState([]);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/userdetail');
      const result = await response.json();
      if (response.ok) {
        setUsers(result.data);
        generateAgeRanges(result.data);
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

  const generateAgeRanges = (users) => {
    const ranges = [
      { label: '0-18', count: 0 },
      { label: '19-35', count: 0 },
      { label: '36-50', count: 0 },
      { label: '51-65', count: 0 },
      { label: '66+', count: 0 },
    ];

    users.forEach(user => {
      const age = user.age;
      if (age <= 18) ranges[0].count++;
      else if (age <= 35) ranges[1].count++;
      else if (age <= 50) ranges[2].count++;
      else if (age <= 65) ranges[3].count++;
      else ranges[4].count++;
    });

    setAgeRanges(ranges);
  };

  const chartData = {
    labels: ageRanges.map(range => range.label),
    datasets: [
      {
        label: 'Number of Users',
        data: ageRanges.map(range => range.count),
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">แสดงจำนวนผู้ใช้ตามช่วงอายุ</h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="mb-8">
        <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: 'Users by Age Range' } } }} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left text-sm text-gray-700">ช่วงอายุ</th>
              <th className="p-4 text-left text-sm text-gray-700">จำนวน</th>
            </tr>
          </thead>
          <tbody>
            {ageRanges.map((range, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 text-gray-700">{range.label}</td>
                <td className="p-4 text-gray-700">{range.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
