import React, { Component } from 'react';

// State 변경의 기본
class StateExample extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            formData: 'no data'
        };

        this.handledata = this.handledata.bind(this);
        setTimeout(this.handledata, 400);
    }

    handledata(){
        const data = 'new Data';
        const { formData } = this.state;

        this.setState({
            loading : false,
            formData : data + formData
        });

        console.log(`loading값 ${this.state.loading}`);
    }
    render() {
        return (
            <div>
                <span>로딩중 : {String(this.state.loading)}</span>
                <span>결과   : {this.state.formData}</span>
            </div>
        );
    }
}

export default StateExample;