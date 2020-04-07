const idList = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

class CityController {
  store(city) {
    let cityList = JSON.parse(localStorage.getItem("cities"));
    const index = cityList ? cityList.length : 0;
    const newCity = {
      id: idList[index],
      name: city,
    };

    cityList = cityList ? [...cityList, newCity] : [newCity];

    localStorage.setItem("cities", JSON.stringify(cityList));
  }

  update(cityRoutes) {
    const cityList = JSON.parse(localStorage.getItem("cities"));
    let currentFiltered = cityList.find((c) => c.id === cityRoutes.current.id);

    if (currentFiltered.distance) {
      let newDistancies = currentFiltered.distance.filter(
        (d) => d.id !== cityRoutes.destiny.id
      );
      currentFiltered.distance = [...newDistancies, cityRoutes.destiny];

      let newMerge = cityList.find((c) => c.id === cityRoutes.destiny.id);

      if (newMerge.distance) {
        let distancesMerge = newMerge.distance.filter(
          (d) => d.id !== currentFiltered.id
        );

        newMerge.distance = [
          ...distancesMerge,
          { id: currentFiltered.id, time: cityRoutes.destiny.time },
        ];
      } else {
        newMerge.distance = [];
        newMerge.distance = [
          ...newMerge.distance,
          { id: currentFiltered.id, time: cityRoutes.destiny.time },
        ];
      }
    } else {
      currentFiltered.distance = [];
      currentFiltered.distance = [
        ...currentFiltered.distance,
        cityRoutes.destiny,
      ];

      let newMerge = cityList.find((c) => c.id === cityRoutes.destiny.id);

      newMerge.distance = [];
      newMerge.distance = [
        ...newMerge.distance,
        { id: currentFiltered.id, time: cityRoutes.destiny.time },
      ];
    }

    let newCities = cityList.filter((c) => c.id !== currentFiltered.id);
    newCities = [...newCities, currentFiltered];

    localStorage.setItem("cities", JSON.stringify(newCities));
  }

  delete(data) {
    const cityList = JSON.parse(localStorage.getItem("cities"));

    let newCities = cityList.filter((c) => c.id !== data.id);
    for (const city of newCities) {
      if (city.name === data.name);
      city.distance = city.distance.filter((c) => c.id !== data.id);
    }

    localStorage.setItem("cities", JSON.stringify(newCities));
  }
}

module.exports = new CityController();
