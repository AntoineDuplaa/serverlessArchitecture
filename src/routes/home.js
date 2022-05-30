import React from 'react';
import {logout} from "../firebase";

const Home = () => {
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
