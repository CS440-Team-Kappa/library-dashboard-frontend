import React from 'react';
import './App.css';
import Actions from './Actions/Actions';
import BookView from './BookView/BookView';
import UserInfo from './UserInfo/UserInfo';
import Home from './Home/Home';
import CheckedOut from './CheckedOut/CheckedOut';
import CartActions from './CartActions/CartActions';
import Cart from './Cart/Cart';

function App() {
  return (
    <div className="App">
      <Home />
      <Actions />
      <UserInfo />
      <CheckedOut />
      <BookView />
      <CartActions />
      <Cart />
    </div>
  );
}

export default App;
