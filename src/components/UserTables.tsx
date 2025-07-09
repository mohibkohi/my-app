import React, { useEffect, useState } from 'react';
import { fetchUsers, addUser, deleteUser, updateUser } from '../services/api';
import { User } from '../types/User';
import '../CSS/UserTables.css'; // Adjust the path as necessary

const PAGE_SIZE = 10;

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState<number | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(() => setError('Failed to fetch users.'))
      .finally(() => setLoading(false));
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginatedUsers = users.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to first page if users change and current page is out of range
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [users, totalPages, currentPage]);

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

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch {
      setError('Failed to delete user.');
    }
  };

  const startEdit = (user: User) => {
    setEditId(user.id);
    setEditFirstName(user.firstName);
    setEditLastName(user.lastName);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditFirstName('');
    setEditLastName('');
  };

  const handleUpdateUser = async () => {
    if (!editFirstName.trim() || !editLastName.trim()) {
      setError('First Name and Last Name are required.');
      return;
    }
    setUpdating(true);
    try {
      await updateUser(editId!, { firstName: editFirstName, lastName: editLastName });
      setUsers(prev =>
        prev.map(u => (u.id === editId ? { ...u, firstName: editFirstName, lastName: editLastName } : u))
      );
      cancelEdit();
      setError('');
    } catch {
      setError('Failed to update user.');
    }
    setUpdating(false);
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
      <div className="user-table-form-table-wrapper">
        <div className="user-table-form">
          <input
            className="user-table-input-firstname"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            className="user-table-input-lastname"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <button
            onClick={handleAddUser}
            className="user-table-add-button"
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
              <th className="user-table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td className="user-table-td">{user.id}</td>
                {editId === user.id ? (
                  <>
                    <td className="user-table-td">
                      <input
                        className="user-table-input"
                        value={editFirstName}
                        onChange={e => setEditFirstName(e.target.value)}
                        disabled={updating}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td className="user-table-td">
                      <input
                        className="user-table-input"
                        value={editLastName}
                        onChange={e => setEditLastName(e.target.value)}
                        disabled={updating}
                        style={{ width: '100%' }}
                      />
                    </td>
                    <td className="user-table-td user-table-actions">
                      <button className="user-table-button" onClick={handleUpdateUser} disabled={updating}>
                        {updating ? 'Saving...' : 'Save'}
                      </button>
                      <button className="user-table-button" onClick={cancelEdit} disabled={updating}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="user-table-td">
                      <div
                        style={{
                          overflow: 'hidden',
                          textOverflow: user.firstName.length > 18 ? 'ellipsis' : 'clip',
                          whiteSpace: 'nowrap',
                          maxWidth: '180px',  // match your cell width
                        }}
                      >
                        {user.firstName}
                      </div>
                      {user.firstName.length > 18 && (
                        <div className="tooltip-text">{user.firstName}</div>
                      )}
                    </td>
                    <td className="user-table-td">
                    <div
                      style={{
                        overflow: 'hidden',
                        textOverflow: user.lastName.length > 18 ? 'ellipsis' : 'clip',
                        whiteSpace: 'nowrap',
                        maxWidth: '180px',
                      }}
                    >
                      {user.lastName}
                    </div>
                    {user.lastName.length > 18 && (
                      <div className="tooltip-text">{user.lastName}</div>
                    )}
                  </td>
                    <td className="user-table-td user-table-actions">
                      <button className="user-table-button" onClick={() => startEdit(user)}>
                        Edit
                      </button>
                      <button
                        className="user-table-delete"
                        title="Delete student"
                        onClick={() => handleDeleteUser(user.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#d32f2f',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          marginLeft: 8,
                          lineHeight: 1,
                        }}
                      >
                        &minus;
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, gap: 8 }}>
          <button
            className="user-table-button"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ alignSelf: 'center' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="user-table-button"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;