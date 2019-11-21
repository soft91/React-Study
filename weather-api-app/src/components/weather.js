import React, { Component } from "react";
import './Weather.css';

class weather extends Component {

  render() {
    const result  = this.props.resultObject;

    if(result !== ""){
      return(
        <div className = "container">
          <p>도시 이름 : {result.name}</p>
          <p>현재 온도 : {Math.round(result.main.temp - 273.15)}˚C</p>
          <p>날씨 : {result.weather[0].main}</p>
        </div>
      )
    } else {
      return <div className = "container">검색 할 나라를 선택해 주세요.</div>
    }
  }
}

export default weather;

