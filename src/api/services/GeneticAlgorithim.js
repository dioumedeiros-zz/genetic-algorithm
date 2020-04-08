class GeneticAlgorithim {
  constructor(cities, generation) {
    this.cities = cities;
    this.MUTATION = 2;
    this.POPULATION_SIZE = 20;
    this.GENERATIONS = generation;
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

    return distance ? Number(distance.time) : 0;
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

  selection(population) {
    let superPopulation = [];

    const betters = Math.floor(population.length / 2);
    this.sortPopulation(population);
    for (let index = 0; index < betters; index++) {
      superPopulation.push(population[index]);
    }

    const randomChoise = Math.floor(Math.random() * betters);
    return superPopulation[randomChoise];
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
    if (bestWay.allDistance < this.best.allDistance) {
      bestWay.generation = this.GENERATIONS;
      this.best = bestWay;
    }
  }

  initialize() {
    let population = [];
    let subject;
    while (population.length < this.POPULATION_SIZE) {
      subject = {
        chromosome: this.createChromosome(this.cities),
        generation: 1,
      };
      population.push(subject);
    }

    population.forEach((element) => {
      this.fitness(element);
    });

    this.best = population[0];

    this.sortPopulation(population);
    for (let i = 1; i <= this.GENERATIONS; i++) {
      let anotherPopulation = [];
      for (let index = 0; index < this.POPULATION_SIZE; index += 2) {
        //Seleção
        let firstParent = this.selection(population);
        let secondParent = this.selection(population);

        let childs = this.crossover(
          firstParent.chromosome,
          secondParent.chromosome
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

      this.getBestDistance(bestWay);
    }

    return this.best;
  }
}

module.exports = GeneticAlgorithim;
