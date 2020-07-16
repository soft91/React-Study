import React from 'react';
import PropsType from 'prop-types';

class ChildProperty extends React.Component {
    render(){
        return <div>{this.props.children}</div>
    }
}

ChildProperty.propsType = {
    children: PropsType.node
}

export default ChildProperty;