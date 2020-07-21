import React from 'react';

class LifeCycleExample extends React.Component {
    static getDerivedStateFromProps(){
        console.log('getDerivedStateFromProps 호출');
        return {};
    }

    constructor(props){
        super(props);

        this.state = {};
        console.log('constructor 호출');
    }

    componentDidMount(){
        console.log('componentDidMount 호출');
    }

    componentDidUpdate(){
        console.log('componentDidUpdate 호출');
    }

    componentWillUnmount(){
        console.log('componentWillUnmount 호출');
    }

    getSnapshotBeforeUpdate(_){
        console.log('getSnaphshotBeforeUpdate 호출');
        return {}
    }

    shouldComponentUpdate(){
        console.log('shouldComponentupdate 호출');
        return true;
    }

    render() {
        console.log('render 호출');
        return null;
    }
}

export default LifeCycleExample;