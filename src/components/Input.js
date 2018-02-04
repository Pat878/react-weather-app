var React = require("react");
var Form = require("react-bootstrap").Form;
var FormGroup = require("react-bootstrap").FormGroup;
var FormControl = require("react-bootstrap").FormControl;
var Col = require("react-bootstrap").Col;
var Button = require("react-bootstrap").Button;

const Input = props => {
  return (
    <div className="weather">
      <center>
        <div id="title">Enter a City</div>
        <br />

        <Form horizontal>
          <FormGroup controlId="formHorizontalLocation">
            <Col smOffset={5} sm={2}>
              <FormControl
                type="location"
                placeholder="New York"
                onChange={props.onChange}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Button onClick={props.submitNewCity}>Get Weather</Button>
          </FormGroup>
        </Form>
      </center>
    </div>
  );
};

module.exports = Input;
