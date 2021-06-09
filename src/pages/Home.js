import React, { useState } from 'react';
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";

function Home() {
  return (
      <Row className="bg-white py-5 justify-content-center">
        <h1>HOME</h1>
      </Row>
  );
}

export default Home;
