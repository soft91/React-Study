import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import { setCollection, setAge } from '../actions/collectionActions';
import PresentaitionComponent from './PresentationComponent';
import ContainerComponent from '../containers/ContainerComponent';
import DispatchContainer from '../containers/DispatchContainer';

export default class ConnectAdvReduxApp extends PureComponent {
  store = configureStore({ loading: false });

  render(){
    return(
      <Provider store={this.store}>
        화면 컴포넌트 : <PresentaitionComponent userName="화면 컴포넌트"/>
        <br/>
        데이터 컴포넌트 : <ContainerComponent id={2}/>
        <br/>
        액션 데이터 컴포넌트 : <DispatchContainer />
      </Provider>
    )
  }
}