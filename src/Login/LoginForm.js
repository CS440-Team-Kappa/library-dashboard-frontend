import React from 'react';
import './LoginPage.css';

function LoginForm() {
    return (
        <div className="login-default">
            <div className="login-container-body">
                <div className="login-containment">
                    <h1>Login</h1>
                    <div className="login-input">
                        <div className="user-input">
                            <input type="text" placeholder="Username" required />
                        </div>
                    </div>
                    <div className="login-input">
                        <div className="user-input">
                            <input type="password" placeholder="Password" required />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                    <div className="create-account-link">
                        <p>Create an account here: <a href="#">Signup</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
