import React from 'react';

class Circle extends React.Component {
    render(){
        var circleStyle = {
            padding: 10,
            margin: 10,
            display: "inline-block",
            backgroundColor: this.props.bgColor,
            borderRadius: "50%",
            width: 100,
            height: 100
        };

        return(
            <div style = {circleStyle}></div>
        )
    }
};

export default Circle;