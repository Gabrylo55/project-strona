import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  // Stany
  const [city, setCity] = useState("Warsaw");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "af459fdd4e5bca2b0e8fcc186ced5da1";  // Wstaw tutaj swój klucz API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

  useEffect(() => {
    // Funkcja pobierająca dane pogodowe
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(apiUrl);
        setWeather(response.data);
      } catch (err) {
        setError("Błąd podczas pobierania danych pogodowych");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  // Funkcja obsługująca zmianę miasta
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <h1>Prognoza pogody</h1>

      <input
        type="text"
        value={city}
        onChange={handleCityChange}
        placeholder="Wpisz nazwę miasta"
      />

      {loading && <p>Ładowanie...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && !loading && !error && (
        <div>
          <h2>Pogoda w {weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>Wilgotność: {weather.main.humidity}%</p>
          <p>Opis: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default App;