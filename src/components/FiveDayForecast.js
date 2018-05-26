var React = require("react");

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

module.exports = FiveDayForecast;
