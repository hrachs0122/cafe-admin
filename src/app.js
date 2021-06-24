import React from 'react';
import './app.css';
import UserList from './components/userList/userList';

function App() {
  return (
    <div className="app">
      <h1 className="title">User List</h1>
      <UserList />
    </div>
  );
}

export default App;
