import React from 'react';

class LightningCounter extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            strikes: 0
        }

        this.timerTick = this.timerTick.bind(this);
    }

    timerTick(){
        this.setState({
            strikes: this.state.strikes + 100
        });
    }

    componentDidMount(){
        setInterval(this.timerTick, 1000);
    }
    
    render(){
        var counterStyle = {
            color : "#66FFFF",
            fontSize: 50
        };

        var count = this.state.strikes.toLocaleString();

        return(
            <h1 style = {counterStyle}>{count}</h1>
        )
    }
}

export default class LightningCounterDisplay extends React.Component {
    render(){
        var commonStyle = {
            margin: 0,
            padding: 0
        };

        var divStyle = {
            width: 250,
            textAlign: "center",
            backgroundColor: "black",
            padding: 40,
            fontFamily: "sans-serif",
            color: "#999",
            borderRadius: 10
        };

        var textStyles = {
            emphasis: {
                fontSize: 38,
                ...commonStyle
            },
            smallEmphasis: {
                ...commonStyle
            },
            small: {
                fontSize: 17,
                opacity: 0.5,
                ...commonStyle
            }
        }

        return(
            <div style = {divStyle}>
                <LightningCounter />
                <h2 style={textStyles.smallEmphasis}>LIGHTNING STRIKES</h2>
                <h2 style={textStyles.emphasis}>WORLDWIDE</h2>
                <h2 style={textStyles.small}>(since you loaded this example)</h2>
            </div>    
        )
    }
}