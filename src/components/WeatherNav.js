var React = require("react");
var Link = require("react-router-dom").Link;
var Navbar = require("react-bootstrap").Navbar;
var FormGroup = require("react-bootstrap").FormGroup;
var FormControl = require("react-bootstrap").FormControl;
var Button = require("react-bootstrap").Button;

const WeatherNav = props => {
  return (
    <div>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={process.env.PUBLIC_URL + "/"}>Weather App</Link>
          </Navbar.Brand>
        </Navbar.Header>

        <Navbar.Form pullRight>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="New York"
              onChange={props.onChange}
            />
          </FormGroup>{" "}
          <Button onClick={props.submitNewCity}>Get Weather</Button>
        </Navbar.Form>
      </Navbar>
    </div>
  );
};

module.exports = WeatherNav;
