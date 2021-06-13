import React from 'react';
import { gql, useQuery } from "@apollo/client";
import { Col, Image } from "react-bootstrap";
import classNames from "classnames";
import avatar from "../../media/avatar.png";
import { useMessageDispatch, useMessageState } from "../../context/message";

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

function Users() {
    const dispatch = useMessageDispatch();
    const { users } = useMessageState();
    const selectedUser = users?.find(user => user.selected === true)?.email;

    const { loading } = useQuery(GET_USERS, {
        onCompleted: data => dispatch({ type: 'SET_USERS', payload: data.getUsers }),
        onError: err => console.log(err)
    });

    let usersMarkup = null;
    if (!users || loading) {
        usersMarkup = <p>Loading...</p>
    } else if (!users.length) {
        usersMarkup = <p>No users</p>
    } else if (users.length) {
        usersMarkup = users.map(user => {
          const selected = selectedUser === user.email;
          return (
            <div
              role="button"
              className= {classNames("user-div d-flex p-3 justify-content-md-start", { 'bg-white': selected })}
              key={user.email} onClick={() => dispatch({ type: 'SET_SELECTED_USER', payload: user.email })}
            >
              <Image
                src={avatar}
                className="user-image"
              />
              <div className="d-none d-md-block">
                  <p className="text-success">{user.email}</p>
                  <p className="font-weight-light">{user.latestMessage ? user.latestMessage.content : ''}</p>
              </div>
          </div>
        )});
    }

    return (
        <Col xs={2} md={4} className='p-0 bg-secondary'>
            {usersMarkup}
        </Col>
    );
}

export default Users;
