import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, FormGroup, FormControl, Button, Form, Col }
from 'react-bootstrap';
import { Router, Route, Link, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

var axios = require('axios');
var Loading = require('./Loading');

class WeatherNav extends Component {
  render () {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Weather App</Link>
            </Navbar.Brand>
          </Navbar.Header>

          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Lancaster, PA"
                onChange={this.props.onChange}/>
              </FormGroup>
              {' '}
              <Button onClick={this.props.submitNewCity}>Get Weather</Button>

            </Navbar.Form>
          </Navbar>
        </div>
      )
    }
  }

  class Input extends Component {
    render () {
      return (
        <div className="weather">
          <center>
            <div id="title">Enter a City and a State</div><br/>

            <Form horizontal>
              <FormGroup controlId="formHorizontalLocation">
                <Col smOffset={5} sm={2}>
                  <FormControl type="location" placeholder="Lancaster, PA"
                    onChange={this.props.onChange}/>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Button onClick={this.props.submitNewCity}>
                    Get Weather
                  </Button>
                </FormGroup>
              </Form>
            </center>
          </div>
        )
      }
    }

    class FiveDayForecast extends Component {


      render () {

        const weatherObject = this.props.weather.list
        const dates = []

        const mappedWeatherObject = Object.keys(weatherObject).map((key,index) => {
          let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

          dates.push(new Date(weatherObject[index].dt * 1000).toLocaleDateString('en-US', options) )

          return (
            <li key={key}>{dates[key]}</li>
          )
        })

        return (
          <div>
            <h1>ID: {this.props.city}</h1>
            <div>
              <center>

                <ul>{mappedWeatherObject}</ul>
              </center>
            </div>

          </div>
        )
      }
    }


    class App extends Component {
      constructor(props) {
        super(props)
        this.state = {
          city: "",
          weather: [],
          loading: true
        }
        this.onChange = this.onChange.bind(this);
        this.submitNewCity = this.submitNewCity.bind(this);
      }
      
      onChange (e) {
        this.setState({ city: e.target.value});

      }

      ajaxCall () {
        axios.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + this.state.city +
        "&type=accurate&APPID=f1455e6d29208b068f597ec226e62ffa&cnt=5").then(res => {
          this.setState({weather: res.data, loading:false});

        });

      }

      submitNewCity (e) {
        this.ajaxCall()
        this.setState({loading: true});
        let submissionPath = '/forecast/' + this.state.city;
        history.push(submissionPath)

        e.preventDefault();
      }


      render() {

        const Home = (props) => {
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
        }

        const Forecast = (props) => {
          return (
            <div>
              <WeatherNav
                submitNewCity={this.submitNewCity.bind(this)}
                onChange={this.onChange.bind(this)}
                city={this.state.city}
              />
              {this.state.loading
                ? <Loading />
                : <FiveDayForecast
                  weather={this.state.weather}
                  city={this.state.city}
                  loading={this.state.loading}
                />}
              </div>

            );
          }

          return (

            <div>
              <Router history={history}>
                <div>

                  <Switch>
                    <Route exact path='/' render={Home} />
                    <Route path='/forecast/:city' render={Forecast} />
                    <Route render={function () {
                      return <p>Not Found</p>
                    }} />
                  </Switch>
                </div>
              </Router>

            </div>


          )
        }
      }

      export default App;
