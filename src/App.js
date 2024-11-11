import React, { useState } from "react";
import "./App.css";
import clouds from "./assets/images/clouds.jpg";
function App() {
  const [location, setLocation] = useState("India");
  const [weatherLocation, setWeatherLocation] = useState(null);
  const [err, setErr] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const getWeather = () => {
    const apikey = "56b0a9590bbfbcd0b5cbb0a7aff5e6db";
    const api = `http://api.weatherstack.com/current?access_key=${apikey}&query=${location}`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErr("Location not found or invalid.");
          setWeatherLocation(null);
        } else {
          setWeatherLocation(data);
          setErr(null);
        }
      })
      .catch((error) => {
        setErr("Failed to fetch data.");
        setWeatherLocation(null);
      });
  };

  return (
    <div className="  h-screen w-full object-cover ">
      <div className="p-5 rounded-md mt-2 mx-auto my-auto  text-white bg-gradient-to-br from-sky-300 to-teal-200">
        <div className="grid items-center justify-center p-5">
          <div className="mb-2 text-center">
            <h1 className="text-black text-xl underline">
              Welcome to weather app!!
            </h1>
          </div>
          <div className="w-fit max-w-sm min-w-[200px]">
            <input
              value={location}
              onChange={handleLocationChange}
              className="w-80 bg-transparent placeholder:text-black text-slate-700 text-sm border border-orange-500 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
          <div className="mb-4 w-fit rounded-md">
            <button
              onClick={getWeather}
              className="w-80 mt-2 px-4 py-2 font-semibold text-black border border-orange-500 rounded hover:bg-orange-200 hover:text-black"
            >
              Get Info
            </button>
          </div>
        </div>
        <div className="w-full h-full">
          {err && <p className="text-red-500 p-5">{err}</p>}
          {weatherLocation && (
            <div className="text-gray-800 rounded-md p-5 grid   gap-5">
              <div className="border-2 border-orange-500 bg-gray-50 grid gap-2 p-5 rounded-md">
                <h1 className="text-6xl font-bold">
                  {weatherLocation.location.name}
                </h1>
                <h2>
                  {weatherLocation.location.country},{" "}
                  {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                    new Date(weatherLocation.location.localtime)
                  )}
                  ,{" "}
                  {new Intl.DateTimeFormat("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }).format(new Date(weatherLocation.location.localtime))}
                </h2>
              </div>
              <div className="text-gray-800 grid border-2 border-orange-500 bg-gray-50 sm:flex sm:justify-between p-5 rounded-md">
                <div>
                  <label className="text-xl">Feels Like....</label>
                  <h2 className="text-9xl">
                    {weatherLocation.current.temperature}°C
                  </h2>
                </div>
                <div className="grid gap-2">
                  <img
                    className="object-cover h-32 w-32 rounded-xl"
                    src={weatherLocation.current.weather_icons[0]}
                    alt="icon1"
                  />
                  <p className="font-semibold">
                    {weatherLocation.current.weather_descriptions[0]}
                  </p>
                </div>
              </div>
              <div className=" flex justify-between items-center border-2 border-orange-500 bg-gray-50 p-5 rounded-md">
                <div className="">
                  <h1>
                    <strong>Humidity : </strong>
                    {weatherLocation.current.humidity}
                  </h1>
                  <h1>
                    <strong>visibility : </strong>
                    {weatherLocation.current.visibility}
                  </h1>
                </div>
                <div>
                  <h1>
                    <strong>Wind Direction : </strong>
                    {weatherLocation.current.wind_dir}
                  </h1>
                  <h1>
                    <strong>Wind Speed : </strong>
                    {weatherLocation.current.wind_speed}
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
