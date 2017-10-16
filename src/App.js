import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, FormGroup, FormControl,
  Button, Form, Col } from 'react-bootstrap';


  class App extends Component {
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
              <Button type="submit">Get Weather</Button>
            </Navbar.Form>
          </Navbar>

          <div className="weather">
            <center>
              <div id="title">Enter a City and a State</div><br/>
              <Form horizontal>
                <FormGroup controlId="formHorizontalLocation">
                  <Col smOffset={5} sm={2}>
                    <FormControl type="location" placeholder="Lancaster, PA" />
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

      );
    }
  }

  export default App;
