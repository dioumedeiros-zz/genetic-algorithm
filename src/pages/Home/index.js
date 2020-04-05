import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

import Header from "../../components/Header";
import CityList from "../../components/CityList";
import "./styles.css";

const CityController = require("../../api/controller/CityController");

export default function List() {
  const [city, setCity] = useState("");
  const [selectList, setSelectList] = useState([]);
  const [selection, setSelection] = useState("T");

  function handleAddCity() {
    CityController.store(city);
    loadCities();
    setCity("");
  }

  function loadCities() {
    const cities = localStorage.getItem("cities");
    setSelectList(JSON.parse(cities));
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="register">
          <input
            placeholder="Insira uma cidade"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleAddCity}>
            <MdAdd size={25} />
            CADASTRAR
          </button>
        </div>
        <div className="content">
          <div className="controls">
            <select
              className="select-task"
              onChange={(e) => setSelection(e.target.value)}
            >
              {selectList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <CityList filter={selection} />
        </div>
      </div>
    </>
  );
}
