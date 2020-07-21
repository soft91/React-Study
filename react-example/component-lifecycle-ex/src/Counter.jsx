import React from 'react';
import PlusButton from './Button';


class Counter extends React.Component {
    render(){
        const textStyle = {
            fontSize : 72,
            fontFamily : "sans-serif",
            color : "#333",
            fontWeight : "bold" 
        }
        return(
            <div style = {textStyle}>
                {this.props.display}
            </div>
        )
    }
}

export default class CounterParent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            count: 0
        };

        this.increase = this.increase.bind(this);
    }

    increase(e) {
        let currentCount = this.state.count;
    
        if(e.shiftKey){
            currentCount += 10;
        } else {
            currentCount += 1;
        }

        this.setState({
            count : currentCount
        })
    }

    UNSAFE_componentWillUpdate(newProps, newState) {
        console.log('componentWillUpdate: Component is about to update!');
        /* 컴포넌트가 업데이트되기 직전에 호출하는 메소드
           this.setState를 사용해 상태를 변경할 수 없음. */
    }

    componentDidUpdate(currentProps, currentState) {
        console.log('componentDidUpdate: Component just updated!');
        /* 컴포넌트가 업데이트되고 render 메소드의 실행이 끝난 후에 호출 */
    }

    UNSAFE_componentWillMount() {
        console.log('componentWillMount: Component is about to mount!');
        /* 컴포넌트가 DOM 안으로 렌더링되기 전에 호출되는 마지막 메소드 
           이 메소드 안에서 setState를 호출해도 컴포넌트가 다시 렌더링 되지 않음.*/
    }

    componentDidMount() {
        console.log('componentDidMount: Component just mounted!');
        /* 컴포넌트가 렌더링돼 DOM에 자리 잡은 직후 호출 */
    }

    componentWillUnmount() {
        console.log('componentWillUnmount: Component is about to be removed from the DOM!');
        /* 이벤트 리스너를 제거하거나 타이머를 중단시키는 등의 뒷처리를 할 수 있는 메소드 (DOM에서 제거할 때) */
    }

    shouldComponentUpdate(newProps, newState) {
        /* 상태가 변경 되었어도 컴포넌트의 업데이트 여부를 제어할 수 있게 해주는 메소드 */
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        console.log('componentWillReceiveProps: Component will get new props!');
        /* 새로 할당하고자 하는 속성 값이 포함되어 있는 메소드 */
    }

    render(){
        const backgroundStyle = {
            padding: 50,
            backgroundColor: "#FFC53A",
            width: 250,
            height: 100,
            borderRadius: 10,
            textAlign: "center"
        };

        

        return(
            <div style = {backgroundStyle}>
                <Counter display = {this.state.count} />
                <PlusButton clickHandler = {this.increase} />
            </div>
        )
    }
}