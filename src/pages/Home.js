import React, {useEffect, useState} from 'react';
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
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

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
      getMessages(from: $from) {
          id content from to createdAt
      }
}`;

function Home() {
  const { loading, data, error } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES)

  useEffect(() => {
    if(selectedUser) {
      getMessages({ variables: { from: selectedUser }})
    }
  }, [selectedUser]);

  if (messagesData) {
    console.log(messagesData, 'mess data')
  }

  let usersMarkup = null;
  if (!data || loading) {
    usersMarkup = <p>Loading...</p>
  } else if (!data.getUsers.length) {
    usersMarkup = <p>No users</p>
  } else if (data.getUsers.length) {
    usersMarkup = data.getUsers.map(user => (
      <div className='d-flex p-3' key={user.email} onClick={() => setSelectedUser(user.email)}>
        <Image
          src={avatar}
          roundedCircle
          className="mr-2"
          style={{ width: 50, height: 50, objectFit: 'cover'}}
        />
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
          {
            messagesData && messagesData.getMessages.length ? (
              messagesData.getMessages.map(message => <p key={message.id}>{message.content}</p>)
            ) : (<div><p>You're now connected!</p> <p>You can start conversation with {selectedUser}</p></div>)}
        </Col>
      </Row>
  );
}

export default Home;
