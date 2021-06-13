import React, { useEffect } from 'react';
import { Row } from "react-bootstrap";
import Users from "./Users";
import Messages from "./Messages";
import { gql, useSubscription } from '@apollo/client';
import { useMessageDispatch } from "../../context/message";
import { useAuthState } from "../../context/auth";

const NEW_MESSAGE = gql`  
  subscription newMessage {
      newMessage {
          id content from to createdAt
      }
  }
`;

function Home() {
  const { data, error } = useSubscription(NEW_MESSAGE);
  const dispatch = useMessageDispatch();
  const { user } = useAuthState();

  useEffect(() => {
    if (error) {
      console.log(error)
    }

    if (data) {
      const otherUser = user.email === data.newMessage.to ? data.newMessage.from : data.newMessage.to;
      dispatch({ type: 'ADD_MESSAGE', payload: {
          email: otherUser,
          message: data.newMessage
        }})
    }
  }, [data, error]);

  return (
      <Row className="bg-white">
        <Users/>
        <Messages/>
      </Row>
  );
}

export default Home;
