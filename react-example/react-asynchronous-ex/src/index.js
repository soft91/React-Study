import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IPAdressContainer from './IPAddressContainer';

var destination = document.querySelector('#container');

ReactDOM.render(
    <div>
        <IPAdressContainer />
    </div>,
    destination
)