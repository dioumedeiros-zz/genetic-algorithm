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
}

module.exports = new CityController();
