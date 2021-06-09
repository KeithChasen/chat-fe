import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

const REGISTER = gql`
  mutation register($email: String!, $password: String!, $confirmPassword: String!) {
      register(email: $email, password: $password, confirmPassword: $confirmPassword) {
          email
      }
  }
`;

function Register() {
  const [register, { loading }] = useMutation(REGISTER, {
    update(_, res) {
      console.log(res)
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    }
  });

  const [variables, setVariables] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const submitRegisterForm = e => {
    e.preventDefault();

    register({ variables });
  };

  return (
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className='text-center'>Register</h1>
          <Form onSubmit={submitRegisterForm}>
            <Form.Group>
              <Form.Label className={errors.email && 'text-danger'}>
                {errors.email ?? 'Email'}
              </Form.Label>
              <Form.Control
                type='email'
                value={variables.email}
                className={errors.email && 'is-invalid'}
                onChange={e => setVariables({...variables, email: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.password && 'text-danger'}>
                {errors.password ?? 'Password'}
              </Form.Label>
              <Form.Control
                type='password'
                value={variables.password}
                className={errors.password && 'is-invalid'}
                onChange={e => setVariables({...variables, password: e.target.value})}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={errors.confirmPassword && 'text-danger'}>
                {errors.confirmPassword ?? 'Confirm Password'}
              </Form.Label>
              <Form.Control
                type='password'
                value={variables.confirmPassword}
                className={errors.confirmPassword && 'is-invalid'}
                onChange={e => setVariables({...variables, confirmPassword: e.target.value})}
              />
            </Form.Group>
            <Button variant="success" type="submit" className='my-2' disabled={loading}>
              {loading ? 'loading...' : 'Register' }
            </Button>
          </Form>
        </Col>
      </Row>
  );
}

export default Register;
