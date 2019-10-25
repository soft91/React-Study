import React, { Component } from "react";
import axios from "axios";

const key  = "046929b6c2f2f189479736b09c5814bd";
const addr = `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`; 

class weather extends Component {
  
  constructor(props) {
    super(props);
    this.state = { test: [] };
  }

  async componentDidMount() {
    let {data : test} = await axios.get(addr);
    console.log(test);
    console.log("현재온도 : "+ (test.main.temp- 273.15) );
    console.log("현재습도 : "+ test.main.humidity);
    console.log("날씨 : "+ test.weather[0].main );
    console.log("상세날씨설명 : "+ test.weather[0].description );
    console.log("날씨 이미지 : "+ test.weather[0].icon );
    console.log("바람   : "+ test.wind.speed );
    console.log("나라   : "+ test.sys.country );
    console.log("도시이름  : "+ test.name );
    console.log("구름  : "+ (test.clouds.all) +"%" ); 
  }

  render() {
    return(
      <div>
        test
      </div>
    )
  }
}

export default weather;

