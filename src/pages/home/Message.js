import React from 'react';
import { useAuthState } from "../../context/auth";
import classNames from "classnames";
import moment from 'moment';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Message({ message }) {
  const { user } = useAuthState();

  console.log(message, 'message')

  const sent = message.from === user.email;
  const received = !sent;
  return (<OverlayTrigger
    placement={sent ? 'left' : 'right'}
    overlay={
    <Tooltip>
      {moment(new Date(message.createdAt * 1000).toISOString()).format('MMMM DD, YYYY @ h:mm a')}
    </Tooltip>}
    >
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
    </OverlayTrigger>
  )
}

export default Message;
