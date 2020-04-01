const { City } = require("./City");

class GeneticAlgorithim {
  constructor() {
    this.cities = new City().cities;
    this.POPULATION_SIZE = 10;
  }

  createChromosome(data) {
    let chromosome = [];
    let cityList = [...data];
    while (cityList.length > 0) {
      const index = Math.ceil(Math.random() * cityList.length - 1);
      chromosome = [...chromosome, cityList[index]];
      cityList.splice(index, 1);
    }
    return chromosome;
  }

  getDistance(currentCity, destinyCity) {
    const found = this.cities.find(city => city.id === currentCity.id);
    const distance = found.distance.find(f => f.id === destinyCity.id);

    return distance ? distance.time : 0;
  }

  fitness(chromosome) {
    let currentCity = chromosome[0];
    let totDistance = 0;

    chromosome.forEach(chromo => {
      const destiny = chromo;

      let distance = this.getDistance(currentCity, destiny);
      totDistance += distance;

      currentCity = destiny;
    });
    chromosome.allDistance = totDistance;
  }

  initialize() {
    let population = [];
    while (population.length < this.POPULATION_SIZE) {
      population.push(this.createChromosome(this.cities));
    }
    population.forEach(element => {
      this.fitness(element);
      setTimeout(() => {
        console.log("element ", element);
      }, 5000);
    });
  }
}

module.exports = { GeneticAlgorithim };
