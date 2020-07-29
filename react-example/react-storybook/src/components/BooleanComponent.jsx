import React, { Component } from 'react';

class BooleanComponent extends Component {
    render() {
        return (
            <div>
                {this.props.bored ? '하던 일 안하기 ㅡㅡ;' : '하던 일 열심히 하기!!'}
            </div>
        );
    }
}

export default BooleanComponent;