import React, { useEffect, useState } from 'react';
import { gql,  useLazyQuery, useMutation } from "@apollo/client";
import { Col, Form } from "react-bootstrap";
import { useMessageDispatch, useMessageState } from "../../context/message";
import Message from "./Message";

const SEND_MESSAGE = gql`
    mutation sendMessage($to: String! $content: String!) {
        sendMessage(to: $to, content: $content) {
            id content from to createdAt
        }
    }
`;


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
  const [content, setContent] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: err => console.log(err),
    onCompleted: data => dispatch({ type: 'ADD_MESSAGE', payload: {
      email: selectedUser.email,
        message: data.sendMessage
      }})
  });

  const submitMessage = e => {
    e.preventDefault();

    if (content.trim() === '' || !selectedUser)
      return;

    setContent('');

    sendMessage({ variables: { to: selectedUser.email, content }})

  };

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
    selectedChatMarkup = <p className="info-text">Select a friend</p>
  } else if (messagesLoading) {
    selectedChatMarkup = <p className="info-text">Loading...</p>
  } else if (messages.length) {
    selectedChatMarkup = messages.map((message, index) => (
      <>
      <Message key={message.id} message={message}/>
        { index === messages.length - 1 && ( <div className='invisible'><hr className='m-0'/></div>  )}
      </>
      ));
  } else if (!messages.length) {
    selectedChatMarkup = <div>
      <p className="info-text">You're now connected!</p>
      <p className="info-text">You can start conversation with {selectedUser.email}</p>
    </div>
  }

  return (
    <Col xs={10} md={8}>
      <div className="messages-box d-flex flex-column-reverse">
        {selectedChatMarkup}
      </div>
      <div>
        <Form onSubmit={submitMessage}>
          <Form.Group className="d-flex">
            <Form.Control
              type="text"
              className="message-input p-3 mb-4 rounded-pill bg-secondary border-0"
              placeholder="Type a message..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <i className="fas fa-paper-plane fa-2x text-primary mt-2 p-1" onClick={submitMessage} role='button'></i>
          </Form.Group>
        </Form>
      </div>
    </Col>
  )
}

export default Messages;