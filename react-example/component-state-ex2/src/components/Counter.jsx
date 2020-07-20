import React, { Component } from 'react';

// state를 활용한 기본 예제
class Counter extends Component {
    constructor(props){
        super(props);

        this.state = { 
            count : 0
        }

        this.increateCount = this.increateCount.bind(this);
    };

    increateCount(){
        this.setState(prevState => {
            const plus = {
                count : this.state.count++
            }
            console.log(prevState);
            return plus;
        })
    };

    render() {
        return (
            <div>
                <span>카운트 : {this.state.count}</span>      
                <button onClick={this.increateCount}>카운트 증가</button>
            </div>
        );
    }
}

export default Counter;