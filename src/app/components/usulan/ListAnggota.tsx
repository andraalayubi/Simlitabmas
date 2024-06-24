import React from 'react';

const DaftarAnggota: React.FC = () => {
  // Dummy data for demonstration
  const members = [
    { id: 1, name: 'John Doe', role: 'Member' },
    { id: 2, name: 'Jane Smith', role: 'Leader' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Daftar Anggota</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">No</th>
            <th className="px-4 py-2 border">Nama</th>
            <th className="px-4 py-2 border">Role</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-4 py-2 border">{member.id}</td>
              <td className="px-4 py-2 border">{member.name}</td>
              <td className="px-4 py-2 border">{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DaftarAnggota;
