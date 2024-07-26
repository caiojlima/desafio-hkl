import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserProvider from './context/userContext';
import UserForm from './components/UserForm';

function App() {
  return (
    <UserProvider>
      <UserForm />
    </UserProvider>
  );
}

export default App;
