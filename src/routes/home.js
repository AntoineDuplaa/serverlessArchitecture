import React from 'react';
import auth, {login, logout} from "../firebase";

const Home = () => {
    console.log(auth);

    return (
        <div>
            <p>hello</p>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary" onClick={() => logout()}>
                    Log out
                </button>
            </div>
        </div>
    );
};

export default Home;