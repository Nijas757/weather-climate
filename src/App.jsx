import { useEffect, useState } from 'react'

import './App.css'
import searchicon from "./assets/searchicon.png";
import dirsle from "./assets/dirsleIcon.png";
import humidityIcon from "./assets/humidityIcon.png";
import rain from "./assets/rainIcon.png";
import sunbright from "./assets/sunbrightIcon.png";
import suncloud from "./assets/suncloudIcon.png";
import windIcon from "./assets/windIcon.png";


const WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
  return (
    <>
      <div className='images'>
        <img src={icon} alt="image" />
      </div>
      <div className='temp'>{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className='log'>longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="humidity" className='icon' />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} alt="wind" className='icon' />
          <div className="data">
            <div className="wind-percent">{wind}km/h</div>
            <div className="text">wind-speed</div>
          </div>
        </div>
      </div>
    </>
  )
};



function App() {
  const api_key = "928b7d562f03bbf879b2fdfa7d0143d9";
  const [text, setText] = useState("coimbatore");

  const [icon, setIcon] = useState(rain);
  const [temp, setTemp] = useState(0);
  const [city, setcity] = useState("coimbatore");
  const [country, setcountry] = useState("India");
  const [lat, setlat] = useState(0);
  const [log, setlog] = useState(0);
  const [humidity, sethumidity] = useState(0);
  const [wind, setwind] = useState(0);

  const [cityNotFound, setcityNotFound] = useState(false);
  const [loading, setloading] = useState(false);

 
  const weatherIconMap = {
  "01d": sunbright,
  "01n": sunbright,
  "02d": suncloud,
  "02n": suncloud,
  "03d": dirsle,
  "03n": dirsle,
  "04d": dirsle,
  "04n": dirsle,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "13d": suncloud,
  "13n": suncloud,
};

const search = async () => {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;



    try {
      let res = await fetch(url);
      let data = await res.json();
      //  console.log(data)
      if (data.cod === "404") {
        console.log("city not found")
        setcityNotFound(true);
        setloading(true);

        return;

      }
      sethumidity(data.main.humidity);
      setwind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setcity(data.name);
      setcountry(data.sys.country);
      setlat(data.coord.lat);
      setlog(data.coord.lon);


      const weatherIconCode = data.weather[0].icon;

      setIcon(weatherIconMap[weatherIconCode] || suncloud);
      setcityNotFound(false);

    } catch (error) {
      console.error("An error occurred:", error.message)

    } finally {
      setloading(false);
    }
  };
  const handlecity = (e) => {
    setText(e.target.value);
  };
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  useEffect(function () {
    search();
  }, []);

  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input type="text" className='cityinput' placeholder='Search city' onChange={handlecity} value={text} onKeyDown={handlekeydown} />
          <div className='search-icon'>
            <img src={searchicon} alt="searchicon" style={{ width: "30px", height: "30px" }} onClick={() => search()} />
          </div>
        </div>
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />

        <p className='copyright'>Designed by <span>NIJAS</span></p>
      </div>
    </>
  );
}

export default App;
