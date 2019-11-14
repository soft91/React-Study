import React from 'react';
import ReactDOM from 'react-dom';
import Circle from './Circle';

function renderData() {
    let colors = ["#393E41", "#E94F37", "#1C89BF", "#A1D363"];
    let renderData = [];

    for(var i = 0; i < colors.length; i++){
        let color = colors[i];
        renderData.push(<Circle key = {i + color} bgColor = {colors[i]} />)
    }

    return renderData;
}

ReactDOM.render(
    <div>
        {renderData()}
    </div>,
    document.getElementById('root')
);
