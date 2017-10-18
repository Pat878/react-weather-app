import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, FormGroup, FormControl, Button, Form, Col }
from 'react-bootstrap';

var axios = require('axios');

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

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Weather App
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Lancaster, PA" />
            </FormGroup>
            {' '}
            <Button type="submit" onClick={this.props.submitNewCity}>Get Weather</Button>
          </Navbar.Form>
        </Navbar>

        <div className="weather">
          <center>
            <div id="title">Enter a City and a State</div><br/>

            <Form horizontal onSubmit={this.submitNewCity}>
              <FormGroup controlId="formHorizontalLocation">
                <Col smOffset={5} sm={2}>
                  <FormControl type="location" placeholder="Lancaster, PA" onChange={this.onChange}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Button type="submit">
                  Get Weather
                </Button>
              </FormGroup>
            </Form>
          </center>
        </div>
      </div>


    )
  }
}

export default App;
