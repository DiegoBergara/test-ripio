import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import history from "./history";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

function App() {
  return (
    <div>
      <Router history={history}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "100%",
              height: 70,
              display: "flex",
              alignItems: "last baseline"
            }}
          >
            <div style={{ marginLeft: 10 }}>
              <img src={require("./assets/ripio-logo.png")} alt="logo" />
            </div>
            <div style={{}}>
              <img
                src={require("./assets/spinning-coin.gif")}
                alt="coin"
                style={{ maxHeight: 50 }}
              />
            </div>
          </div>
        </div>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
