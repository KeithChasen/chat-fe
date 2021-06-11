import React, {useEffect, useState} from 'react';
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import {Col, Image} from "react-bootstrap";
import avatar from "../../media/avatar.png";


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

function Users({ setSelectedUser }) {
    const { loading, data, error } = useQuery(GET_USERS);

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
        <Col xs={4} className='p-0 bg-secondary'>
            {usersMarkup}
        </Col>
    );
}

export default Users;
