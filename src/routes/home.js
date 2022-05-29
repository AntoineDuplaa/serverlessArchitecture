import React from 'react';
import {auth, logout} from "../firebase";

const Home = () => {
    console.log(auth);

    return (
        <div>
            <p>hello</p>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={() => logout()}>
                    Log out
                </button>

                <a href='chat' >
                    Chat
                </a>
            </div>
        </div>
    );
};

export default Home;
