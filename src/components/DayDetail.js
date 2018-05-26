var React = require("react");
var Button = require("react-bootstrap").Button;

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

module.exports = DayDetail;
