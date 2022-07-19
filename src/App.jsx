import axios from "axios";
import React, { useState } from "react";

export default function App() {


  const [cityName, setCityName] = useState("");

  const [city, setCity] = useState({
    isSuccess: false,
    data: {}
  });

  const onClick = () => {
    let query = document.getElementById("cityName").value
    weatherData(query)
  }


  const weatherData = async (query) => {

    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_WEATHER_API}`)
      .then(res => setCity({ isSuccess: true, data: res.data }))
      .catch(err => console.log(err))
  }

  return (
    <div className="container">
      <p className="text-center" style={{ fontSize: "30px" }}>City Name</p>
      <input onChange={(e) => setCityName(e.target.value)} value={cityName} id="cityName" type="text" className="form-control" />
      <div className="container text-center">
        <button onClick={() => onClick()} className="btn btn-outline-success mt-3 btn-m">Search</button>
      </div>
      {city.isSuccess ?
        (
          <div className="container mt-5" style={{ width: "345px" }}>
            <div className="card border-danger text-center" style={{ height: "20rem", width: "20rem" }}>
              <div className="card-body">
                <h5 className="card-title mb-4 mt-2">{city.data.name}</h5>
                <p className="card-text">Weather Forecast: {city.data.weather.map(data => data.main).join(", ")}</p>
                <p className="card-text">Temperature: {city.data.main.temp} °F</p>
                <p className="card-text">Sensed Temperature: {city.data.main.temp_min} °F</p>
                <p className="card-text">Wind speed: {city.data.wind.speed}</p>
                <p className="card-text">Country: {city.data.sys.country}</p>
                <p className="card-text">Date: {new Date(city.data.dt * 1000).toLocaleDateString()}</p>
              </div>
            </div>
          </div>) : (<></>)
      }
    </div>
  );
}

