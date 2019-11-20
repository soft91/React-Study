import React, {Component} from 'react';
let xhr;

export default class search extends Component {

    constructor(props){
        super(props);
        this.state = { 
            local : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.resultClick  = this.resultClick.bind(this);
        this.processRequest = this.processRequest.bind(this);
    }

    handleChange(e){
        this.setState({
            local : e.target.value
        })
    }

    resultClick(){
        const jsonURL = 'dummy/country.json';

        xhr = new XMLHttpRequest();
        xhr.open("GET", jsonURL, true);
        xhr.send();

        xhr.addEventListener('readystatechange', this.processRequest, false);
    }

    processRequest(){
        if(xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let key   = "facec94daf1f7f6e25047395ffdbfa19";
            let local = this.state.local;
            debugger;
            response.filter(function(element){
                if(element["name"] === local) {
                    this.setState({local: element["code"]});
                }
            });
            // let URL   = `http://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${key}`;

            console.log(response);
        }
    }

    render(){
        return(
            <div>
                <input placeholder = "나라 이름을 입력하세요" onChange = {this.handleChange}/>
                <button onClick = {this.resultClick}>Search</button>
            </div>
        )
    }
}