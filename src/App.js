import React from 'react';
import { Container } from "react-bootstrap";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Switch } from "react-router-dom";

import client from "./ApolloClient";
import './App.scss';
import Register from "./pages/Register";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";

import { AuthProvider } from './context/auth'
import { MessageProvider } from './context/message'
import DynamicRoute from "./util/dynamicRoute";

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
      <MessageProvider>
        <BrowserRouter>
          <Menu/>
          <Container className='pt-5'>
            <Switch>
              <DynamicRoute exact path='/' component={Home} authenticated/>
              <DynamicRoute path='/login' component={Login} guest/>
              <DynamicRoute path='/register' component={Register} guest/>
            </Switch>
          </Container>
        </BrowserRouter>
      </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
