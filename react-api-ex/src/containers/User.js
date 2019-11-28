import { connect } from 'react-redux';
import User from '../components/User';
import * as actions from '../actions/User';

const mapStatetoProps = (state, ownProps) => ({
    user: ownProps.user,
    category: state.User.category,
    repos: state.User.repos,
    error: state.User.error
});

const mapDispatchToProps = dispatch => ({
    onMount(user){
        dispatch(actions.fetchUser(user));
    },
    onUpdate(user){
        dispatch(actions.fetchUser(user));
    }
});

export default connect(mapStatetoProps, mapDispatchToProps)(User);