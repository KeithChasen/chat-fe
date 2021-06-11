import React, {useEffect, useState} from 'react';
import { Row, Col, Form, Button, Image } from "react-bootstrap";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import avatar from '../../media/avatar.png'
import Users from "./Users";

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(from: $from) {
            id content from to createdAt
        }
    }`;

function Home() {
  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if(selectedUser) {
      getMessages({ variables: { from: selectedUser }})
    }
  }, [selectedUser]);

  return (
      <Row className="bg-white">
        <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
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
