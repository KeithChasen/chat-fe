import React from 'react';
import { Row, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { useAuthDispatch } from "../context/auth";

function Menu() {
  const dispatch = useAuthDispatch();

  const history = useHistory();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
  };

  return (
    <Row className="bg-white justify-content-around">
      <Link to='/'><Button variant="link">Home</Button></Link>
      <Link to='/login'><Button variant="link">Login</Button></Link>
      <Link to='/register'><Button variant="link">Register</Button></Link>
      <Button variant="link" onClick={logout}>Logout</Button>
    </Row>
  );
}

export default Menu;
