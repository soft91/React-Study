import React, {Component} from 'react';
import axios from 'axios';
import Weather from './weather';

export default class Form extends Component {

    constructor(props){
        super(props);
        this.state = { 
            jsonResult   : [],
            resultObject : ""
        };

        this.resultClick  = this.resultClick.bind(this);
    }

    componentDidMount(){
        const jsonURL = 'dummy/country.json';

        axios.get(jsonURL)
             .then(obj => {
               this.setState({
                jsonResult : this.state.jsonResult.concat(obj.data)
               });
             })
             .catch(error => {
                alert("json 객체가 없습니다.");
             });
    }

    resultClick(){
        const local = document.getElementById('local').value;
        const key   = "facec94daf1f7f6e25047395ffdbfa19";
        const URL   = `http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${key}`;
    
        axios.get(URL)
             .then(result => {
                this.setState({
                    resultObject : result.data
                });
             })
             .catch(error => {
                alert("해당 국가의 데이터가 없습니다.");
             });
    }

    render(){
        const { jsonResult } = this.state;
        const resultList = jsonResult.map(
            (data, i) => (
                <option key = {i} value = {data.code}>{data.name}</option>
            )
        );

        return(
            <div>
                <select id = "local">
                    {resultList}
                </select>
                <button onClick = {this.resultClick}>Search</button>
                <Weather resultObject = {this.state.resultObject}/>
            </div>
        )
    }
}