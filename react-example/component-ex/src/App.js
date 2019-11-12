import React from 'react';

class HelloWorld extends React.Component {
  render(){
    return <p>Hello, {this.props.greetTarget}!</p>
  }
}

export default HelloWorld;
