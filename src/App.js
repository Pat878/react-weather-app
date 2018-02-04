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
    const Home = props => {
      return (
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
      );
    };

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
              <Route exact path={process.env.PUBLIC_URL + "/"} render={Home} />
              <Route path="/forecast/:city" render={Forecast} />
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

const FiveDayForecast = props => {
  const weatherObject = props.weather.list;
  const dates = [];
  const imageIcon = [];

  const mappedWeatherObject = Object.keys(weatherObject).map((key, index) => {
    let options = { weekday: "long", month: "long", day: "numeric" };

    dates.push(
      new Date(weatherObject[index].dt * 1000).toLocaleDateString(
        "en-US",
        options
      )
    );
    imageIcon.push(weatherObject[index].weather);

    return (
      <div key={index} onClick={props.viewDayDetail.bind(this, index)}>
        <div>
          <img
            alt="weather_icon"
            src={
              "http://openweathermap.org/img/w/" +
              imageIcon[key][0].icon +
              ".png"
            }
          />
        </div>
        <div>
          <h3>{dates[key]}</h3>
        </div>
      </div>
    );
  });

  return (
    <div>
      <center>
        <h1>{props.weather.city.name}</h1>
        <div>{mappedWeatherObject}</div>
      </center>
    </div>
  );
};

const DayDetail = props => {
  let weatherProps = props.weather;
  let options = { weekday: "long", month: "long", day: "numeric" };
  let index = props.detailIndex;
  let date = new Date(weatherProps.list[index].dt * 1000).toLocaleDateString(
    "en-US",
    options
  );
  let icon = weatherProps.list[index].weather[0].icon;
  let city = weatherProps.city.name;
  let description = weatherProps.list[index].weather[0].description;
  let minTemp = Math.round(weatherProps.list[index].temp.min * 9 / 5 - 459.67);
  let maxTemp = Math.round(weatherProps.list[index].temp.max * 9 / 5 - 459.67);
  let humidity = weatherProps.list[index].humidity;

  return (
    <div>
      <center>
        <div>
          {
            <img
              alt="weather_icon"
              src={"http://openweathermap.org/img/w/" + icon + ".png"}
            />
          }
        </div>
        <h2>{date}</h2>
        <h2>{city}</h2>
        <h3>{description}</h3>
        <h3>Min Temp: {minTemp} degrees</h3>
        <h3>Max Temp: {maxTemp} degrees</h3>
        <h3>Humidity: {humidity}</h3>
        <Button onClick={props.goBack}>Back</Button>
      </center>
    </div>
  );
};

export default App;
