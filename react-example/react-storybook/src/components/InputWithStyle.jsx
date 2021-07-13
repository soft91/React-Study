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
        const { errorMessage, label, name, type, value } = this.props;

        return (
            <div className="input-field">
                <input 
                  id={`input_${name}`}
                  className="validate"
                  ref={this.setRef}
                  type={type}
                  onChange={this.handleChange}
                  value={value}
                />
                <label htmlFor={`input_${name}`}>
                    {label}
                </label>
                {errorMessage && <span className="helper-text">{errorMessage}</span>}
            </div>
        );
    }
}

export default Input;