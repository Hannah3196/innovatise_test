import './App.css';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';

const App = () => (
    <Switch>
      <Route exact path="/login" component={Login}/>
      {/* <Route exact path="/users" component={UserList}/>
      <Route exact path="/user/:id" component={UserDetails}/> */}
    </Switch>
);

export default App;
