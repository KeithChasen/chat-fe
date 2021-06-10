import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import {Link} from "react-router-dom";

import { useAuthDispatch } from "../context/auth";

function Menu({ history }) {
  const dispatch = useAuthDispatch();

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
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
