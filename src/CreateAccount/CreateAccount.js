import "./CreateAccount.css";
import React, { useState, useRef, handleSubmit } from 'react';




function CreateAccount() {
  const userRef = useRef();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Now need to take values and give to backend using axios
  }

  return (
    <div className="create-container-body">
      <div className="create-containment">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="create-input">
            <label htmlFor="Email">Email:
              <input type="text" id="Email" ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
            </label>
          </div>
          <div className="create-input">
            <label htmlFor="password">Password
              <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
            </label>
          </div>
          <div className="create-input">
          <label htmlFor="firstname">First Name
              <input type="text" id="firstname" required />
            </label>
          </div>
          <div className="create-input">
          <label htmlFor="lastname">Last Name
              <input type="text" id="lastname" required />
            </label>
          </div>
          <button enabled="true">Register</button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount;