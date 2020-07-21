import React, { Component } from 'react';

// state를 활용한 기본 예제
class Counter extends Component {
    constructor(props){
        super(props);

        this.state = { 
            count : 0
        }

        this.increateCount = this.increateCount.bind(this);
        this.decreaseCount = this.decreaseCount.bind(this);
    };

    // count 증가
    increateCount(){
        this.setState(prevState => {
            const plus = {
                count : this.state.count++
            }
            return plus;
        })
    };

    // count 감소
    decreaseCount(){
        this.setState(prevState => {
            const minus = {
                count : this.state.count - 1
            }
            return minus;
        })
    }

    render() {
        return (
            <div>
                <span>카운트 : {this.state.count}</span><br></br>
                <button onClick={this.increateCount}>카운트 증가</button>
                <button onClick={this.decreaseCount}>카운트 감소</button>
            </div>
        );
    }
}

export default Counter;