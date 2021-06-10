import React from 'react';
import { Container } from "react-bootstrap";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import client from "./ApolloClient";
import './App.scss';
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { AuthProvider } from './context/auth'

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Container className='pt-5'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
