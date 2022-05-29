import { useRef, useState } from "react";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../style/App.css'

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    return (
        <div className="auth-inner" style={{marginTop: '0%'}}>
            <h3>Sign In</h3>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    ref={emailRef}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    ref={passwordRef}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={console.log("test")}>
                    Log In
                </button>
            </div>
            <p>I already have an account? <a href={"/logIn"}>Log In</a></p>
        </div>
    );
};

export default LogIn;