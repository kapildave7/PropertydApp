import React from "react";
import Header from "./Header";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Footer from "./Footer";
import Home from "../properties/Home";
import Invest from "../properties/Invest";
import InvestDetails from "../properties/InvestDetails";
import Investing from "../properties/Investing";
import Listing from "../properties/Listing";
import FetchProfile from "../properties/FetchProfile";

// import BackUp from "../backup";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/properties/invest" exact component={Invest} />
            <Route
              path="/properties/invest-details/:id"
              exact
              component={InvestDetails}
            />
            <Route
              path="/properties/investing/:id"
              exact
              component={Investing}
            />
            <Route path="/properties/profile/" exact component={FetchProfile} />
            <Route path="/properties/listing/" exact component={Listing} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
