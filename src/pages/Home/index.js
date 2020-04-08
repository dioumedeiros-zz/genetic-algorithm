import React, { useEffect, useState } from "react";
import { MdAdd, MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

import Header from "../../components/Header";
import CityList from "../../components/CityList";
import Modal from "../../components/Modal";
import "./styles.css";

const CityController = require("../../api/controller/CityController");
const GeneticAlgorithim = require("../../api/services/GeneticAlgorithim");

export default function List() {
  const [city, setCity] = useState("");
  const [selectList, setSelectList] = useState([]);
  const [selection, setSelection] = useState("A");
  const [solution, setSolution] = useState();
  const [open, setOpen] = useState(false);
  const [generation, setGeneration] = useState(1000);

  useEffect(() => {
    loadCities();
  }, []);

  function handleAddCity() {
    const cities = JSON.parse(localStorage.getItem("cities"));
    if (!cities || cities.length < 10) {
      CityController.store(city);
      loadCities();
      setCity("");
    } else {
      toast.error("No máximo 10 cidades");
    }
  }

  function loadCities() {
    const cities = JSON.parse(localStorage.getItem("cities"));

    if (cities) {
      setSelectList(cities);
      const index = cities.length - 1;
      setSelection(cities[index].id);
      setTimeout(() => {
        document.querySelector(".select").selectedIndex = String(index);
      }, 100);
    }
  }

  function handleExecute() {
    const cities = JSON.parse(localStorage.getItem("cities"));

    if (isValid(cities)) {
      const algorithm = new GeneticAlgorithim(cities, generation);
      const bestRoute = algorithm.initialize();
      if (bestRoute) {
        setSolution(bestRoute);
        setOpen(true);
      }
    }
  }

  function isValid(cities) {
    for (const city of cities) {
      if (!city.distance) {
        toast.error(
          `Distância inválida. Verifique os destinos da cidade ${city.name}`
        );
        return false;
      }
      city.distance.forEach((dist) => {
        if (!dist.time) {
          toast.error(
            `Distância inválida. Verifique os destinos da cidade ${city.name}`
          );
          return false;
        }
      });
    }
    return true;
  }

  function handleDelete() {
    const cities = JSON.parse(localStorage.getItem("cities"));
    const citySelected = cities.find((c) => c.id === selection);
    CityController.delete(citySelected);
    loadCities();
  }

  function handleCloseModal() {
    setOpen(false);
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
            <div className="city-selected">
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
              <MdDeleteForever
                size={28}
                color="#81259d"
                onClick={handleDelete}
              />
            </div>
            <div className="generation">
              <label>Gerações</label>
              <input
                placeholder="Gerações"
                value={generation}
                onChange={(e) => setGeneration(e.target.value)}
              />
            </div>
          </div>
          <CityList filter={selection} />
        </div>
        <button className="btn-execute" onClick={handleExecute}>
          EXECUTAR ALGORITMO
        </button>
        <Modal open={open} data={solution} close={handleCloseModal} />
      </div>
    </>
  );
}
