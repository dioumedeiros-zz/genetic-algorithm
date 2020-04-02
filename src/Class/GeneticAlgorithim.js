const { City } = require("./City");

class GeneticAlgorithim {
  constructor() {
    this.cities = new City().cities;
    this.POPULATION_SIZE = 20;
    this.GENERATIONS = 1000;
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
      let destiny = chromo;

      let distance = this.getDistance(currentCity, destiny);
      totDistance += distance;

      currentCity = destiny;
    });
    chromosome.allDistance = totDistance;
  }

  rouletteWheel(population) {
    let i = 0;
    let totalSum = 0;
    let parent = -1;

    let totalProbability = population.reduce(
      (total, element) => total + 1 / element.allDistance,
      0
    );

    population.forEach(el => {
      let probability = 1 / el.allDistance;

      el.probability = probability / totalProbability;
    });

    let random = Math.random();
    while (i < population.length && totalSum < random) {
      totalSum += population[i].probability;
      parent += 1;
      i += 1;
    }

    return parent;
  }

  crossover(firstGene, secondGene) {
    let randomGene = Math.ceil(Math.random() * firstGene.length - 1);
    this.crossingGenes(firstGene, secondGene, randomGene);
    this.validateDuplicity(randomGene, firstGene, secondGene);

    return [firstGene, secondGene];
  }

  crossingGenes(firstGene, secondGene, randomGene) {
    let wait = firstGene[randomGene];
    firstGene[randomGene] = secondGene[randomGene];
    secondGene[randomGene] = wait;
  }

  validateDuplicity(randomGene, firstGene, secondGene) {
    let crossingList = [];
    crossingList.push(randomGene);
    while (true) {
      let duplicated = this.getDuplicated(firstGene, crossingList);
      if (duplicated === -1) {
        break;
      }
      this.crossingGenes(firstGene, secondGene, duplicated);
      crossingList.push(duplicated);
    }
  }

  getDuplicated(firstGene, crossingList) {
    for (let index = 0; index < firstGene.length; index++) {
      if (crossingList.includes(index)) continue;

      if (firstGene.filter(g => g.id === firstGene[index].id).length > 1) {
        return index;
      }
    }
    return -1;
  }

  initialize() {
    let population = [];
    while (population.length < this.POPULATION_SIZE) {
      population.push(this.createChromosome(this.cities));
    }

    population.forEach(element => {
      this.fitness(element);
    });

    //

    //for nas geracoes
    // for (let i = 1; i < this.GENERATIONS; i++) {
    for (let i = 1; i < 100; i++) {
      let anotherPopulation = [];
      for (let index = 0; index < this.POPULATION_SIZE; index += 2) {
        //roleta
        let firstParent = this.rouletteWheel(population);
        let secondParent = this.rouletteWheel(population);

        let childs = this.crossover(
          population[firstParent],
          population[secondParent]
        );

        anotherPopulation = [...anotherPopulation, childs[0]];
        anotherPopulation = [...anotherPopulation, childs[1]];
      }
      population = [];
      population = anotherPopulation;

      population.forEach(element => {
        this.fitness(element);
      });
    }

    console.log("population ", population);

    let min = 999;
    population.forEach(pop => {
      if (pop.allDistance < min) {
        min = pop.allDistance;
      }
    });

    console.log("min ", min);

    population = population.map((a, b) =>
      a.allDistance < b.allDistance ? -1 : a.allDistance > b.allDistance ? 1 : 0
    );
    // console.log(
    //   `Generation: ${0} | Time: ${population[0].allDistance} | Chromssome: ${
    //     population[0]
    //   }`
    // );
  }
}

module.exports = { GeneticAlgorithim };
