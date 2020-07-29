import React, { Component } from 'react';

class Input extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        const { name, onChange } = this.props;
        if (onChange) {
            onChange(name, e.target.value)
        }
    }

    render() {
        return (
            <div>
                { this.props.label }
                <input onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Input;