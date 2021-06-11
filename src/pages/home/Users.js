import React, {useEffect, useState} from 'react';
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import {Col, Image} from "react-bootstrap";
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

function Users({ setSelectedUser, selectedUser }) {
    const dispatch = useMessageDispatch();
    const { users } = useMessageState();

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
          return (<div role="button" className= {classNames("user-div d-flex p-3", { 'bg-white': selected })} key={user.email} onClick={() => setSelectedUser(user.email)}>
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
        )});
    }

    return (
        <Col xs={4} className='p-0 bg-secondary'>
            {usersMarkup}
        </Col>
    );
}

export default Users;
