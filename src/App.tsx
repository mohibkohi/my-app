import React from 'react';
import UserTable from './components/UserTables';

const App: React.FC = () => {
  return (
    <div>
      <h1>User List</h1>
      <UserTable />
    </div>
  );
};

export default App;