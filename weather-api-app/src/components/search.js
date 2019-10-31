import React, {Component} from 'react';
import axios from 'axios';

export default class search extends Component {

    constructor(props){
        super(props);
        this.state = { 
            result: [],
            local : "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.resultClick  = this.resultClick.bind(this);
    }

    handleChange(e) {
        this.setState({local : e.target.value});
    }

    resultClick = () => {
        var key   = "facec94daf1f7f6e25047395ffdbfa19";
        var local = this.state.local;
        var URL   = `http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${key}`;

        const jsonURL = 'dummy/country.json';
        axios.get(jsonURL)
            .then(result => { 
            //가지고 온 리스트를 state에 저장합니다.
            result.data.filter(function(element){
                if(element["name"] === local) {
                    this.setState({local: element["code"]});
                }
                });
            })
            .catch(error => { 
                console.log(error); 
            });

        // axios.get(URL)
        //     .then(result => {
        //     //가지고 온 리스트를 state에 저장합니다.
        //         console.log(result);
        //     })
        //     .catch(error => {
        //         alert("해당 국가가 없습니다.");
        //     });
    }
    render(){
        return(
            <div>
                <input placeholder = "나라 이름을 입력하세요" value = {this.state.local} onChange={this.handleChange}/>
                <button onClick = {this.resultClick}>Search</button>
            </div>
        )
    }
}