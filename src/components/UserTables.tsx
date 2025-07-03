import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser } from '../services/api';
import { User } from '../types/User';
import '../CSS/UserTables.css'; // Adjust the path as necessary

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(() => setError('Failed to fetch users.'))
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('First Name and Last Name are required.');
      return false;
    }
    if (!/^[A-Za-z\s'-]+$/.test(firstName)) {
      setError('First Name can only contain letters, spaces, apostrophes, and hyphens.');
      return false;
    }
    if (!/^[A-Za-z\s'-]+$/.test(lastName)) {
      setError('Last Name can only contain letters, spaces, apostrophes, and hyphens.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddUser = async () => {
    if (!validate()) return;
    setPosting(true);
    try {
      const newUser = await addUser({ firstName, lastName });
      setUsers(prev => [...prev, newUser]);
      setFirstName('');
      setLastName('');
      setError('');
    } catch {
      setError('Failed to add user.');
    }
    setPosting(false);
  };

  if (loading) return <div className="user-table-container">Loading...</div>;

  return (
    <div className="user-table-container">
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ color: "#4fc3f7" }}>Student Management Dashboard</h2>
        <p style={{ lineHeight: 1.7 }}>
          <strong>This project demonstrates a modern, full-stack cloud application</strong> built with <strong>React</strong> for the frontend and <strong>.NET 8 (ASP.NET Core Web API)</strong> for the backend. The API is securely hosted on <strong>Microsoft Azure</strong> and leverages <strong>Azure SQL Database</strong> for persistent storage of student information.
          <br /><br />
          The frontend is also deployed on <strong>Azure Static Web Apps</strong>, providing a fast and scalable user experience. All source code is managed on <strong>GitHub</strong>, and <strong>CI/CD pipelines</strong> are configured to automatically build and deploy both the frontend and backend on every push, ensuring rapid and reliable updates.
          <br /><br />
          <strong>Key Technologies:</strong> React, TypeScript, .NET 8, ASP.NET Core, Azure Static Web Apps, Azure App Service, Azure SQL Database, GitHub, CI/CD (GitHub Actions)
        </p>
      </section>
      <h2 className="user-table-title">Student List</h2>
      {error && <div className="user-table-error">{error}</div>}
      <div className="user-table-form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          className="user-table-input"
          onChange={e => setFirstName(e.target.value)}
          maxLength={32}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          className="user-table-input"
          onChange={e => setLastName(e.target.value)}
          maxLength={32}
        />
        <button
          onClick={handleAddUser}
          className="user-table-button"
          disabled={posting || !firstName.trim() || !lastName.trim()}
        >
          {posting ? 'Adding...' : 'Add Student'}
        </button>
      </div>
      <table className="user-table-table">
        <thead>
          <tr>
            <th className="user-table-th">Id</th>
            <th className="user-table-th">First Name</th>
            <th className="user-table-th">Last Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td className="user-table-td">{u.id}</td>
              <td className="user-table-td">{u.firstName}</td>
              <td className="user-table-td">{u.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
//now-ui-dashboard-react

export default UserTable;