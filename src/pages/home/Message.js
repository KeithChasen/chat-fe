import React from 'react';
import { useAuthState } from "../../context/auth";
import classNames from "classnames";

function Message({ message }) {
  const { user } = useAuthState();
  const sent = message.from === user.email;
  const received = !sent;
  return (
    <div className={classNames('d-flex my-3', {
      'ms-auto': sent,
      'me-auto': received
    })}>
      <div className={classNames('p-2 px-3 rounded-pill', {
        'bg-primary': sent,
        'bg-secondary': received
      })}>
        <p className={classNames({'text-white': sent })} key={message.id}>{message.content}</p>
      </div>
    </div>
  )
}

export default Message;
