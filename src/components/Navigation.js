import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import {logout, useAuth} from "../firebase";

const Navigation = () => {
  const auth = useAuth();
  return (<div>{auth && <NavigationAuth />}</div>);
};

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <button onClick={() => logout()}>se déconnecter</button>
    </li>
  </ul>
);

export default Navigation;