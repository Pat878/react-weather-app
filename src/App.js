import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, FormGroup, FormControl, Button, Form, Col }
from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link, Switch
} from 'react-router-dom'

var axios = require('axios');

class WeatherNav extends Component {
  render () {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Weather</Link>
              <Link to="/forecast">forecast</Link>
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
                {...props}
              />

              <Input
                submitNewCity={this.submitNewCity.bind(this)}
                onChange={this.onChange.bind(this)}
                {...props}
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
                {...props}
              />
              <h1>test</h1>
            </div>

          );
        }

        return (

          <div>
            <Router>
              <div>

                <Switch>
                  <Route exact path='/' render={Home} />
                  <Route exact path='/forecast' render={Forecast} />
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
