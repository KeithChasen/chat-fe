import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`  
  query getUsers {
      getUsers {
          email
      }
  }
`;

function Home() {
  const { loading, data, error } = useQuery(GET_USERS);

  if (error) {
    console.log(error)
  }

  if (data) {
    console.log(data)
  }

  let usersMarkup = null;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>
  } else if (!data.getUsers.length) {
    usersMarkup = <p>No users</p>
  } else if (data.getUsers.length) {
    usersMarkup = data.getUsers.map(user => (
      <div key={user.email}>
        <p>{user.email}</p>
      </div>
    ));
  }

  return (
      <Row className="bg-white">
        <Col xs={4}>
          {usersMarkup}
        </Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>
  );
}

export default Home;
