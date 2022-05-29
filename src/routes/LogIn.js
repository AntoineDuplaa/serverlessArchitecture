import { useRef, useState } from "react";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../style/App.css'
import {login} from "../firebase";

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();

    //emailRef.current.value, passwordRef.current.value

    return (
        <div className="auth-inner" style={{marginTop: '0%'}}>
            <h3>Log in</h3>
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
                <button type="submit" className="btn btn-primary" onClick={() => login(emailRef.current.value, passwordRef.current.value)}>
                    Log in
                </button>
            </div>
            <p>I don't have any account, <a href={"/register"}>Register</a></p>
        </div>
    );
};

export default LogIn;