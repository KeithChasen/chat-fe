import React, { useEffect } from 'react';
import { gql,  useLazyQuery } from "@apollo/client";
import { Col } from "react-bootstrap";

const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(from: $from) {
            id content from to createdAt
        }
    }`;

function Messages({ selectedUser }) {
  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if(selectedUser) {
      getMessages({ variables: { from: selectedUser }})
    }
  }, [selectedUser]);

  return (
    <Col xs={8}>{
      messagesData && messagesData.getMessages.length ? (
        messagesData.getMessages.map(message => <p key={message.id}>{message.content}</p>)
      ) : (<div><p>You're now connected!</p> <p>You can start conversation with {selectedUser}</p></div>)}
    </Col>
  )
}

export default Messages;