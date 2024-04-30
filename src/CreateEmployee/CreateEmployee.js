import "./CreateEmployee.css";
import React, { useState, useRef, handleSubmit} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
  const userRef = useRef();
  const [email, setEmail] = useState('');
  const [ssn, setSSN] = useState('');
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')
  let Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams();
    params.append('email', email)
    const response = await axios.get(`http://127.0.0.1:8000/member-login/?${params.toString()}`)
    const params2 = new URLSearchParams();
    params2.append('memberid', response.data.MemberID)
    params2.append('ssn', ssn)
    params2.append('address', address)
    params2.append('lastName', role)
    params2.append('role', role)
    axios.get(`http://127.0.0.1:8000/create-employee/?${params2.toString()}`);
    Navigate('/', { replace: true })
  }

  return (
    <div className="create-container-body">
      <div className="create-containment">
        <h1>Create Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="create-input">
            <div className="label-text">
              <label htmlFor="Email">Email:</label>
            </div>
            <div className="text-input">
              <input type="text" id="SSN" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />
            </div>
          </div>
          <div className="create-input">
            <div className="label-text">
              <label htmlFor="ssn">SSN</label>
            </div>
            <div className="text-input">
              <input type="text" id="ssn" onChange={(e) => setSSN(e.target.value)} value={ssn} required />
            </div>
          </div>
          <div className="create-input">
            <div className="label-text">
              <label htmlFor="address">Address</label>
            </div>
            <div className="text-input">
              <input type="text" id="address" onChange={(e) => setAddress(e.target.value)} value={address} required />
            </div>
          </div>
          <div className="create-input">
            <div className="label-text">
              <label htmlFor="role">Role</label>
            </div>
            <div className="text-input">
              <input type="text" id="role" onChange={(e) => setRole(e.target.value)} value={role} required />
            </div>
          </div>
          <button enabled="true">Create CreateEmployee</button>
        </form>
      </div>
    </div>
  )
}

export default CreateEmployee;