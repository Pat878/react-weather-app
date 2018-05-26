import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
  Form,
  Col
} from "react-bootstrap";
import { Router, Route, Link, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

var history = createBrowserHistory();
var axios = require("axios");

var Loading = require("./Loading");
var WeatherNav = require("./components/WeatherNav");
var Input = require("./components/Input");
var FiveDayForecast = require("./components/FiveDayForecast");
var DayDetail = require("./components/DayDetail");

class App extends Component {
  state = {
    city: "",
    weather: [],
    loading: true,
    detailIndex: null
  };

  onChange = e => {
    this.setState({ city: e.target.value });
  };

  ajaxCall = () => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
          this.state.city +
          "&type=accurate&APPID=f1455e6d29208b068f597ec226e62ffa&cnt=5"
      )
      .then(res => {
        this.setState({ weather: res.data, loading: false });
      });
  };

  submitNewCity = e => {
    this.ajaxCall();
    this.setState({ loading: true });
    let submissionPath = "/forecast/" + this.state.city;
    history.push(submissionPath);

    e.preventDefault();
  };

  viewDayDetail = (index, e) => {
    this.setState({ detailIndex: index });
    let detailPath = "/detail/" + this.state.city;
    history.push(detailPath);
  };

  goBack = () => {
    let submissionPath = "/forecast/" + this.state.city;
    history.push(submissionPath);
  };

  render() {
    const Forecast = props => {
      return (
        <div>
          <WeatherNav
            submitNewCity={this.submitNewCity.bind(this)}
            onChange={this.onChange.bind(this)}
            city={this.state.city}
          />
          {this.state.loading ? (
            <Loading />
          ) : (
            <FiveDayForecast
              weather={this.state.weather}
              city={this.state.city}
              loading={this.state.loading}
              viewDayDetail={this.viewDayDetail.bind(this)}
            />
          )}
        </div>
      );
    };

    const DayRender = props => {
      return (
        <div>
          <WeatherNav
            submitNewCity={this.submitNewCity.bind(this)}
            onChange={this.onChange.bind(this)}
            city={this.state.city}
          />
          <DayDetail
            weather={this.state.weather}
            detailIndex={this.state.detailIndex}
            goBack={this.goBack}
          />
        </div>
      );
    };

    return (
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route
                exact
                path={process.env.PUBLIC_URL + "/"}
                render={props => (
                  <div>
                    <WeatherNav
                      submitNewCity={this.submitNewCity.bind(this)}
                      onChange={this.onChange.bind(this)}
                      city={this.state.city}
                    />

                    <Input
                      submitNewCity={this.submitNewCity.bind(this)}
                      onChange={this.onChange.bind(this)}
                      city={this.state.city}
                    />
                  </div>
                )}
              />
              <Route
                path="/forecast/:city"
                render={props => (
                  <div>
                    <WeatherNav
                      submitNewCity={this.submitNewCity.bind(this)}
                      onChange={this.onChange.bind(this)}
                      city={this.state.city}
                    />
                    {this.state.loading ? (
                      <Loading />
                    ) : (
                      <FiveDayForecast
                        weather={this.state.weather}
                        city={this.state.city}
                        loading={this.state.loading}
                        viewDayDetail={this.viewDayDetail.bind(this)}
                      />
                    )}
                  </div>
                )}
              />
              <Route path="/detail/:city" render={DayRender} />
              <Route
                render={function() {
                  return <p>Not Found</p>;
                }}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
