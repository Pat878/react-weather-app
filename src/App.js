import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavItem, NavDropdown, Nav, MenuItem, FormGroup, FormControl,
  Button } from 'react-bootstrap';


  class App extends Component {
    render() {
      return (
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Weather App</a>
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
      );
    }
  }

  export default App;
