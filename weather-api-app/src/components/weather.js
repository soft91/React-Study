import React, { Component } from "react";

class weather extends Component {

  render() {
    const result = this.props.resultObject;

    if(result !== ""){
      return(
        <div>
          <p>나라 : {result.sys.country}</p>
          <p>도시 이름 : {result.name}</p>
          <p>현재 온도 : {Math.round(result.main.temp - 273.15)}˚C</p>
          <p>날씨 : {result.weather[0].main}</p>
          <p>날씨 이미지 : {result.weather[0].icon}</p>
        </div>
      )
    } else {
      return <div>검색 할 나라를 선택해 주세요.</div>
    }
  }
}

export default weather;

