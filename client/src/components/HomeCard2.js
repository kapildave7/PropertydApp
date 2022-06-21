import React from "react";

class HomeCard2 extends React.Component {
  render() {
    return (
      <div>
        <h1 className="home-card2-header">Newly Listed Properties </h1>
        <div className="ui three column grid">
          <div className="column">
            <div className="ui fluid card">
              <div className="image">
                {/* <img src="/images/avatar/large/daniel.jpg" /> */}
              </div>
              <div className="content">
                <div className="header">Shri Ram Complex</div>
                <div className="meta">
                  <a>30% Empty</a>
                </div>
                <div className="description">
                  Matthew is an interior designer living in New York.
                </div>
              </div>
              <div className="extra content">
                <span className="right floated">Last Date 2 May</span>
                <span>
                  <i className="user icon"></i>
                  75 Inversters
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCard2;
