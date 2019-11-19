import React, {Component} from 'react';
import MenuButton from './MenuButton';
import Menu from './Menu';

export default class MenuContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            visible: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    handleMouseDown(e){
        this.toggleMenu();

        console.log('clicked');
        e.stopPropagation();
    }

    toggleMenu(){
        this.setState({
            visible: !this.state.visible
        })
    }

    render(){
        return(
            <div>
                <MenuButton handleMouseDown = {this.handleMouseDown}></MenuButton>
                <Menu handleMouseDown = {this.handleMouseDown} menuVisibility = {this.state.visible}></Menu>
                <div>
                    <p>Can You spot the item that doesn't beling?</p>
                    <ul>
                        <li>Lorem</li>
                        <li>Ipsum</li>
                        <li>Dolor</li>
                        <li>Sit</li>
                        <li>Bumblebees</li>
                        <li>Aenean</li>
                        <li>Consectetur</li>
                    </ul>
                </div>
            </div>
        )
    }
}