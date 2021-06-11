import React from 'react';
import { Row } from "react-bootstrap";
import Users from "./Users";
import Messages from "./Messages";

function Home() {
  return (
      <Row className="bg-white">
        <Users/>
        <Messages/>
      </Row>
  );
}

export default Home;
