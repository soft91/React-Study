import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ActionComponent extends PureComponent {
  render(){
    const { setLoading, resetLoading, setUser, setCollection, setAge } = this.props;
    const collection = [
      { id: 21, name: 'John', age: 20 },
      { id: 2, name: 'Justin', age: 40 },
      { id: 3, name: 'Mary', age: 21}
    ];

    return(
      <React.Fragment>
        <button onClick={() => setLoading(true)}>setLoading</button>
        <button onClick={() => resetLoading()}>resetLoading</button>
        <button onClick={() => setCollection(collection)}>setCollection</button>
        <button onClick={() => setUser({name:'Park', age: 20})}>setUser</button>
        <button onClick={() => setAge(2, 55)}>setAge</button>
      </React.Fragment>
    );
  }
}

ActionComponent.propTypes = {
  setLoading: PropTypes.func,
  resetLoading: PropTypes.func,
  setUser: PropTypes.func,
  setCollection: PropTypes.func,
  setAge: PropTypes.func
}