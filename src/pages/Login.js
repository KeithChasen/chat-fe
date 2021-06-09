import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import {Link} from "react-router-dom";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          email token
      }
  }
`;

function Login(props) {
  const [login, { loading }] = useMutation(LOGIN, {
    update(_, res) {
      localStorage.setItem('token', res.data.login.token);
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors)
    }
  });

  const [variables, setVariables] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const submitLoginForm = e => {
    e.preventDefault();

    login({ variables });
  };

  return (
      <Row className="bg-white py-5 justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className='text-center'>Login</h1>
          <Form onSubmit={submitLoginForm}>
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
            <Button variant="success" type="submit" className='my-2' disabled={loading}>
              {loading ? 'loading...' : 'Login' }
            </Button>
            <br/>
            <small>
              Don't have an account? <Link to='/register'>Register</Link>
            </small>
          </Form>
        </Col>
      </Row>
  );
}

export default Login;
