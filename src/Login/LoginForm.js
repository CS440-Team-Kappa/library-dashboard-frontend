import React from 'react';
import './LoginPage.css'; 

function LoginForm() {
    return (
        <div className="containment">
            <h1>Login</h1>
            <div className="login-input">
                <input type="text" placeholder="Username" required />
            </div>
            <div className="login-input">
                <input type="password" placeholder="Password" required />
            </div>
            <button type="submit" className="submit-btn">Login</button>
            <div className="create-account-link">
                <p>Create an account here: <a href="#">Signup</a></p>
            </div>
        </div>
    );
}

export default LoginForm;
