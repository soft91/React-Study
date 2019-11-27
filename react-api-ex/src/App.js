import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import User from './containers/User';

export default class App extends React.Component {
  render(){
    return(
      <div className = "App">
        <ul>
          <li><Link to = "/user/apple">애플</Link></li>
          <li><Link to = "/user/google">구글</Link></li>
          <li><Link to = "/user/microsoft">마이크로소프트</Link></li>
        </ul>
        <Switch>
          <Route exact path = "/" render = {() => (<Redirect to = "/user/apple" />)} />
          <Route path = "/user/:id" render = {({match}) => <User user = {match.params.id} />}/>
        </Switch>
      </div>
    )
  }
};
