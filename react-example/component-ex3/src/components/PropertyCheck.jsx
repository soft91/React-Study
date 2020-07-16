import React from 'react';
import PropsType from 'prop-types';

class PropertyCheck extends React.Component {
    render(){
        const { 
            objValue,
            requiredStringValue
        } = this.props;

        return(
            <div>
                <div>객체 값 : { String(Object.entries(objValue)) }</div>
                <div>필수 값 : { requiredStringValue }</div>
            </div>
        )
    }
}

PropertyCheck.propsType = {
    // 객체 프로퍼티
    objValue : PropsType.shape({
        name : PropsType.string,
        age  : PropsType.number
    }),

    // 필수 프로퍼티
    requiredStringValue : PropsType.string.isRequired
}

export default PropertyCheck;