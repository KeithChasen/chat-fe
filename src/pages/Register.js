import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";

function Register() {
  const [variables, setVariables] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const submitRegisterForm = e => {
    e.preventDefault();

    console.log(variables)
  };

  return (
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className='text-center'>Register</h1>
          <Form onSubmit={submitRegisterForm}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={variables.email}
                onChange={e => setVariables({...variables, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={variables.password}
                onChange={e => setVariables({...variables, password: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                value={variables.confirmPassword}
                onChange={e => setVariables({...variables, confirmPassword: e.target.value})}
              />
            </Form.Group>
            <Button variant="success" type="submit" className='my-2'>Register</Button>
          </Form>
        </Col>
      </Row>
  );
}

export default Register;
