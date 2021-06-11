import React, {useEffect, useState} from 'react';
import { Row } from "react-bootstrap";
import Users from "./Users";
import Messages from "./Messages";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
      <Row className="bg-white">
        <Users setSelectedUser={setSelectedUser} selectedUser={selectedUser}/>
        <Messages selectedUser={selectedUser} />
      </Row>
  );
}

export default Home;
