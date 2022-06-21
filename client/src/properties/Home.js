import React from "react";
import About from "../components/AboutWeb";
import HomeCard2 from "../components/HomeCard2";
import HomeCard1 from "../components/HomeCrad1";
import Slider from "../components/Slider";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Slider />
        <HomeCard1 />
        <About />
        <HomeCard2 />
      </div>
    );
  }
}

export default Home;
