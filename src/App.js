import React from 'react';
import { Container } from "react-bootstrap";
import { ApolloProvider } from "@apollo/client";

import client from "./ApolloClient";
import './App.scss';
import Register from "./pages/Register";

function App() {
  return (
    <ApolloProvider client={client}>
      <Container className='pt-5'>
        <Register/>
      </Container>
    </ApolloProvider>
  );
}

export default App;
