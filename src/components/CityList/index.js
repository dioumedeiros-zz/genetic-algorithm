import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import City from "../City";

import "./styles.css";

const CityController = require("../../api/controller/CityController");

export default function CityList({ filter }) {
  const [routes, setRoutes] = useState([]);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("cities"));

    if (cities) {
      const newRoutes = cities.filter((city) => city.id !== filter);
      setRoutes(newRoutes);
      const current = cities.find((city) => city.id === filter);
      setCurrentCity(current);
    }
  }, [filter]);

  function handleDistance(data) {
    CityController.update(data);
  }

  return (
    <div className="grid">
      <div className="header">
        <div>Origem</div>
        <div>Destino</div>
        <div>Distância</div>
      </div>
      <div className="items">
        {routes &&
          routes.map((route) => (
            <City
              key={route.id}
              current={currentCity}
              destiny={route}
              addDistance={handleDistance}
            />
          ))}
      </div>
    </div>
  );
}
