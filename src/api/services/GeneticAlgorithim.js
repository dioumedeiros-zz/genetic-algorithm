const { City } = require("../models/City");

class GeneticAlgorithim {
  constructor() {
    this.cities = new City().cities;
    this.MUTATION = 1;
    this.POPULATION_SIZE = 20;
    this.GENERATIONS = 1000;
    this.best = [];
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
    const found = this.cities.find((city) => city.id === currentCity.id);
    const distance = found.distance.find((f) => f.id === destinyCity.id);

    return distance ? distance.time : 0;
  }

  fitness(subject) {
    let currentCity = subject.chromosome[0];
    let totDistance = 0;

    const initialCity = currentCity;
    subject.chromosome.forEach((chromo) => {
      let destiny = chromo;

      let distance = this.getDistance(currentCity, destiny);
      totDistance += distance;

      currentCity = destiny;
    });

    totDistance += this.getDistance(currentCity, initialCity);

    subject.allDistance = totDistance;
  }

  rouletteWheel(population) {
    let i = 0;
    let totalSum = 0;
    let parent = -1;

    let totalProbability = population.reduce(
      (total, element) => total + 1 / element.allDistance,
      0
    );

    population.forEach((el) => {
      let probability = 1 / el.allDistance;

      el.probability = probability / totalProbability;
    });

    const random = Math.random();

    this.sortPopulation(population);
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

    return [{ chromosome: firstGene }, { chromosome: secondGene }];
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

      if (firstGene.filter((g) => g.id === firstGene[index].id).length > 1) {
        return index;
      }
    }
    return -1;
  }

  transform(chromosomeList) {
    const min = Math.ceil(1);
    const max = Math.floor(100);
    const rand = Math.floor(Math.random() * (max - min));
    if (rand <= this.MUTATION) {
      const firstGene = Math.ceil(Math.random() * chromosomeList.length - 1);
      const secondGene = Math.ceil(Math.random() * chromosomeList.length - 1);
      const waiting = chromosomeList[firstGene];
      chromosomeList[firstGene] = chromosomeList[secondGene];
      chromosomeList[secondGene] = waiting;
    }
    return { chromosome: chromosomeList };
  }

  sortPopulation(population) {
    return population.sort((a, b) =>
      a.allDistance < b.allDistance ? -1 : a.allDistance > b.allDistance ? 1 : 0
    );
  }

  getBestDistance(bestWay) {
    if (bestWay.allDistance <= this.best.allDistance) {
      this.best = bestWay;
    }
  }

  initialize() {
    let population = [];
    let subject;
    while (population.length < this.POPULATION_SIZE) {
      subject = { chromosome: this.createChromosome(this.cities) };
      population.push(subject);
    }

    population.forEach((element) => {
      this.fitness(element);
    });

    this.best = population[0];
    console.log("Initial ", this.best.allDistance);

    //

    this.sortPopulation(population);
    for (let i = 1; i <= this.GENERATIONS; i++) {
      let anotherPopulation = [];
      for (let index = 0; index < this.POPULATION_SIZE; index += 2) {
        //roleta
        let firstParent = this.rouletteWheel(population);
        let secondParent = this.rouletteWheel(population);

        let childs = this.crossover(
          population[firstParent].chromosome,
          population[secondParent].chromosome
        );

        anotherPopulation = [
          ...anotherPopulation,
          this.transform(childs[0].chromosome),
        ];
        anotherPopulation = [
          ...anotherPopulation,
          this.transform(childs[1].chromosome),
        ];
      }

      population = [];
      population = anotherPopulation;

      population.forEach((element) => {
        this.fitness(element);
      });

      this.sortPopulation(population);
      let bestWay = population[0];
      console.log("bestWay ", bestWay.allDistance);

      this.getBestDistance(bestWay);
    }
    console.log("best ", this.best.allDistance);

    // const greatSolucion = population.find(p => p.allDistance === bestWay);
    // console.log("greatSolucion ", greatSolucion);

    // population.forEach(p => {
    //   if (bestWay.allDistance < this.best) {
    //     this.best = bestWay.allDistance;
    //   }
    // })
    // console.log(
    //   `Generation: ${this.GENERATIONS} | Time: ${this.best} | Chromssome: ${
    //     bestWay
    //   }`
    // );
  }
}

module.exports = { GeneticAlgorithim };
