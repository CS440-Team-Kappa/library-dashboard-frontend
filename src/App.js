import React from 'react';
import './App.css';
import Actions from './Actions/Actions';
import BookView from './BookView/BookView';
import UserInfo from './UserInfo/UserInfo';

function App() {
  return (
    <div className="App">
      <UserInfo />
      <Actions />
      <BookView />
    </div>
  );
}

export default App;
