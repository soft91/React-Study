import React from 'react';
import ReactDOM from 'react-dom';
import Buttonify from './Buttonify';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Buttonify behavior = "submit">Send Data</Buttonify>
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();