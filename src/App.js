import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, FormGroup, FormControl, Button, Form, Col }
from 'react-bootstrap';
import { Router, Route, Link, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

var axios = require('axios');

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


    class App extends Component {
      constructor(props) {
        super(props)
        this.state = {
          city: "",
          weather: []
        }
        this.onChange = this.onChange.bind(this);
        this.submitNewCity = this.submitNewCity.bind(this);
      }

      onChange (e) {
        this.setState({ city: e.target.value});

      }

      submitNewCity (e) {
        let submissionPath = '/forecast/' + this.state.city;
        history.push(submissionPath)

        axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + this.state.city +
        "&type=accurate&APPID=KEY").then(res => {
          this.setState({weather: res.data});
          console.log(this.state.weather)
        });
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
                //  {...props}
              />

              <Input
                submitNewCity={this.submitNewCity.bind(this)}
                onChange={this.onChange.bind(this)}
                city={this.state.city}
                //{...props}
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
                //  {...props}
              />
              <h1>ID: {props.match.params.city}</h1>
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
