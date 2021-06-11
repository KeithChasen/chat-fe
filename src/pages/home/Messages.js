import React, { useEffect } from 'react';
import { gql,  useLazyQuery } from "@apollo/client";
import { Col } from "react-bootstrap";
import { useMessageDispatch, useMessageState } from "../../context/message";


const GET_MESSAGES = gql`
    query getMessages($from: String!) {
        getMessages(from: $from) {
            id content from to createdAt
        }
    }`;

function Messages() {
  const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES);
  const { users } = useMessageState();
  const selectedUser = users?.find(user => user.selected === true);
  const messages = selectedUser?.messages;
  const dispatch = useMessageDispatch();

  useEffect(() => {
    if(selectedUser && !selectedUser.messages) {
      getMessages({ variables: { from: selectedUser.email }})
    }
  }, [selectedUser]);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: 'SET_USER_MESSAGES',
        payload: {
          email: selectedUser.email,
          messages: messagesData.getMessages
        }
      })
    }
  }, [messagesData]);

  let selectedChatMarkup = null;
  if (!messages && !messagesLoading) {
    selectedChatMarkup = <p>Select a friend</p>
  } else if (messagesLoading) {
    selectedChatMarkup = <p>Loading...</p>
  } else if (messages.length) {
    selectedChatMarkup = messages.map(message => <p key={message.id}>{message.content}</p>)
  } else if (!messages.length) {
    selectedChatMarkup = <div><p>You're now connected!</p> <p>You can start conversation with {selectedUser.email}</p></div>
  }

  return (
    <Col xs={8}>{selectedChatMarkup}</Col>
  )
}

export default Messages;