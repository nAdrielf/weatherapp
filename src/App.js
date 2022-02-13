import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;
  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation('');
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data.sys ? (
              <p>
                {data.name},{data.sys.country}
              </p>
            ) : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != null && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}ºC</p>
              ) : null}
              <p className="bitsmall">Feels Like</p>
            </div>
            <div className="humid">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p className="bitsmall">Humidity</p>
            </div>
            <div className="wind">
              {data.main ? (
                <p className="bold">{data.wind.speed.toFixed()} km/h</p>
              ) : null}
              <p className="bitsmall">Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
