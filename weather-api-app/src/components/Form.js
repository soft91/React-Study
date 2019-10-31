import React, {Component} from 'react';
import Search from './search';
import Weather from './weather';

export default class Form extends Component {
    render(){
        return(
            <div>
                <Search />
                <Weather />
            </div>
        );
    }
}