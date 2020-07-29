import React, { Component } from 'react';

class NewCounter extends Component {
    render() {
        return (
            <div>
                <p>현재 카운트: {this.props.count}</p>
                <button>카운트 증가</button>
            </div>
        );
    }
}

export default NewCounter;