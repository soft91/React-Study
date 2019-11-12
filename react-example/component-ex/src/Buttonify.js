import React from 'react';

class Buttonify extends React.Component {
    render(){
        return(
            <div>
                <button type = {this.props.behavior}>{this.props.children}</button>
            </div>
        )
    }
}

export default Buttonify;