import { useRef } from "react";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../style/App.css'
import {register} from "../firebase";

const Register = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();

    return (
        <div className="auth-inner" style={{marginTop: '0%'}}>
            <h3>Register</h3>
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
                <label>First Name</label>
                <input
                    className="form-control"
                    placeholder="Enter first name"
                    ref={firstNameRef}
                />
            </div>
            <div className="mb-3">
                <label>Last Name</label>
                <input
                    className="form-control"
                    placeholder="Enter last name"
                    ref={lastNameRef}
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
                <button type="submit" className="btn btn-primary" onClick={() => register(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value)}>
                    Register
                </button>
            </div>
            <p>I already have an account? <a href={"/login"}>Log In</a></p>
        </div>
    );
};

export default Register;
