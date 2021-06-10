import React, { useState } from 'react';
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import avatar from '../media/avatar.png'

const GET_USERS = gql`  
  query getUsers {
      getUsers {
          email
          latestMessage {
              content
          }
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
      <div className='d-flex p-3' key={user.email}>
        <Image src={avatar} roundedCircle className="mr-2" style={{ width: 50, height: 50, objectFit: 'cover'}}/>
        <div>
          <p className="text-success">{user.email}</p>
          <p className="font-weight-light">{user.latestMessage ? user.latestMessage.content : ''}</p>
        </div>
      </div>
    ));
  }

  return (
      <Row className="bg-white">
        <Col xs={4} className='p-0 bg-secondary'>
          {usersMarkup}
        </Col>
        <Col xs={8}>
          <p>Messages</p>
        </Col>
      </Row>
  );
}

export default Home;
