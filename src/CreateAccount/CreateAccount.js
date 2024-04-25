import "./CreateAccount.css";
import React, { useState, useRef } from 'react';
import axios from 'axios';




function CreateAccount() {
  const userRef = useRef();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    axios.post(`http://127.0.0.1:8000/members/`, {paramEmail: email, paramPassword: pwd, paramFirstName: firstName, paramLastName: lastName, paramPhone: phoneNumber})
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }

  return (
    <div className="create-container-body">
      <div className="create-containment">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="create-input">
            <label htmlFor="Email">Email:
              <input type="text" id="Email" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>
          </div>
          <div className="create-input">
            <label htmlFor="password">Password
              <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            </label>
          </div>
          <div className="create-input">
          <label htmlFor="firstname">First Name
              <input type="text" id="firstname" onChange={(e) => setFirstName(e.target.value)} value={firstName} required />
            </label>
          </div>
          <div className="create-input">
          <label htmlFor="lastname">Last Name
              <input type="text" id="lastname" onChange={(e) => setLastName(e.target.value)} value={lastName} required />
            </label>
          </div>
          <div className="create-input">
          <label htmlFor="phonenumber">Phone Number
              <input type="text" id="phonenumber" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required />
            </label>
          </div>
          <button enabled="true">Register</button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount;