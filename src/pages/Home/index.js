import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import CityList from "../../components/CityList";
import "./styles.css";

const CityController = require("../../api/controller/CityController");
const GeneticAlgorithim = require("../../api/services/GeneticAlgorithim");

export default function List() {
  const [city, setCity] = useState("");
  const [selectList, setSelectList] = useState([]);
  const [selection, setSelection] = useState("A");

  useEffect(() => {
    loadCities();
  }, []);

  function handleAddCity() {
    CityController.store(city);
    loadCities();
    setCity("");
  }

  function loadCities() {
    const cities = JSON.parse(localStorage.getItem("cities"));

    if (cities) {
      setSelectList(cities);
    }
  }

  function handleExecute() {
    const cities = JSON.parse(localStorage.getItem("cities"));

    if (isValid(cities)) {
      const algorithm = new GeneticAlgorithim(cities);
      algorithm.initialize();
    }
  }

  function isValid(cities) {
    cities.forEach((city) => {
      city.distance.forEach((dist) => {
        if (!dist.time) {
          toast.error(
            `Distância inválida. Verifique os destinos da cidade ${city.name}`
          );
          return false;
        }
      });
    });
    return true;
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
              className="select"
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
        <button className="btn-execute" onClick={handleExecute}>
          EXECUTAR ALGORITMO
        </button>
      </div>
    </>
  );
}
