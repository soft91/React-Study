import React, { Component } from "react";


class weather extends Component {
  
  constructor(props) {
    super(props);
    this.state = { result: [] };
  }

  async componentDidMount() {
    // let {data : result} = await axios.get(addr);
    // this.setState({ result });
  }

  render() {
    const { result } = this.state;

    if(Object.keys(result).length > 0){
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
      return <div>조금만 기다려 주십시오...</div>
    }
  }
}

export default weather;
