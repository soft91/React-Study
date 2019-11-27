import React from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends React.Component {
    componentWillMount(){
        this.props.onMount(this.props.user);
    }
    componentWillReceiveProps(nextProps){
        if(this.props.user !== nextProps.user){
            this.props.onUpdate(nextProps.user);
        }
    }
    render(){
        return(
            <div>
                <h2>User 컴포넌트</h2>
                <p>user: {this.props.user}</p>
            </div>
        )
    }
}

User.propTypes = {
    user: PropTypes.string,
    onMount: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

User.defaultProps = {
    user: 'apple'
}