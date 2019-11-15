import React from 'react';
import PlusButton from './Button';


class Counter extends React.Component {
    render(){
        const textStyle = {
            fontSize : 72,
            fontFamily : "sans-serif",
            color : "#333",
            fontWeight : "bold" 
        }
        return(
            <div style = {textStyle}>
                {this.props.display}
            </div>
        )
    }
}

export default class CounterParent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            count: 0
        };

        this.increase = this.increase.bind(this);
    }

    increase(e) {
        let currentCount = this.state.count;
    
        if(e.shiftKey){
            currentCount += 10;
        } else {
            currentCount += 1;
        }

        this.setState({
            count : currentCount
        })
    }

    render(){
        const backgroundStyle = {
            padding: 50,
            backgroundColor: "#FFC53A",
            width: 250,
            height: 100,
            borderRadius: 10,
            textAlign: "center"
        };

        

        return(
            <div style = {backgroundStyle}>
                <Counter display = {this.state.count} />
                <PlusButton clickHandler = {this.increase} />
            </div>
        )
    }
}