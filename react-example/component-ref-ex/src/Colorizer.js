import React from 'react';

export default class Colorizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            color : "",
            bgColor : "white" 
        };

        this.colorValue = this.colorValue.bind(this);
        this.setNewColor = this.setNewColor.bind(this);
    }

    colorValue(e) {
        this.setState({
            color: e.target.value
        });
    }

    setNewColor(e){
        this.setState({
            bgColor: this.state.color
        });

        this._input.focus();
        this._input.value = "";

        e.preventDefault();
    }

    render() {
        const squareStlye = {
            backgroundColor: this.state.bgColor
        };
        
        let self = this;

        return(
            <div className = "colorArea">
                <div style = {squareStlye} className = "colorSquare"></div>
                <form onSubmit={this.setNewColor}>
                    <input onChange = {this.colorValue} 
                           ref = {(el) => self._input = el}
                           placeholder = "Enter a color value"></input>
                    <button type = "submit">go</button>
                </form>
            </div>
        );
    }
}