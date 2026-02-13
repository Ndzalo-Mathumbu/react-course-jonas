import React from "react";

/* function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

async function getWeather(location) {
  try {
    // 1) Getting location (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
    );
    const geoData = await geoRes.json();
    console.log(geoData);

    if (!geoData.results) throw new Error("Location not found");

    const { latitude, longitude, timezone, name, country_code } =
      geoData.results.at(0);
    console.log(`${name} ${convertToFlag(country_code)}`);

    // 2) Getting actual weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
    );
    const weatherData = await weatherRes.json();
    console.log(weatherData.daily);
  } catch (err) {
    console.err(err);
  }
}
 */

/* const App = function () {
  return <Name />;
};

const Name = function () {
  return <h1>Ndzalo NK</h1>;
}; */
// export default App

/* const car = "BMW";
car()
console.log(car); */

class App extends React.Component {
  render() {
    return (
      <>
        <WeatherCounter />
        {/* <Test /> */}
      </>
    );
  }
}

class WeatherCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: 25 };
    this.handleAddTemp = this.handleAddTemp.bind(this);
    this.handleMinusTemp = this.handleMinusTemp.bind(this);
  }

  handleAddTemp = function () {
    const addTemp = this.setState({ temperature: this.state.temperature + 1 });
    return addTemp;
  };
  handleMinusTemp = function () {
    const addTemp = this.setState({ temperature: this.state.temperature - 1 });
    return addTemp;
  };
  componentDidMount() {
    console.log("mounted");
  }
  componentWillUnmount() {
    console.log("Unmounted");
  }

  render() {
    return (
      <div>
        <h1>{this.state.temperature}°</h1>
        <button onClick={this.handleAddTemp}>Increase temp</button>{" "}
        <button onClick={this.handleMinusTemp}>Decrease temp</button>
      </div>
    );
  }
}

/* class Test {
  name = "Ndzalo";

  sayName() {
    console.log(this.name);
  }
}

const t = new Test();
const func = t.sayName;
func(); */

export default App;
