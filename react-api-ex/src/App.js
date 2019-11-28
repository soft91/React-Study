import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import User from './containers/User';
import Nav from './containers/Nav';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class App extends React.Component {
  render(){
    return(
      <div className = "App" style = {{ paddingLeft: 200 }}>
        <CssBaseline />
        <AppBar style = {{ left: 200 }}>
          <Toolbar>
            <Typography type = "title" color = "inherit">
              Github API 클라이언트
            </Typography>
          </Toolbar>
        </AppBar>
        <Nav />
        <div style = {{ marginTop: 64, padding: 32 }}>
          <Switch>
            <Route exact path = "/" render = {() => (<Redirect to = "/user/apple" />)} />
            <Route path = "/user/:id" render = {({match}) => <User user = {match.params.id} />}/>
          </Switch>
        </div>
      </div>
    )
  }
};
