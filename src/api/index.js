const { GeneticAlgorithim } = require("./Class/GeneticAlgorithm");

const init = () => {
  const geneticAlgorithim = new GeneticAlgorithim();
  geneticAlgorithim.initialize();
};

init();

// const functionToCalcFitness = () => (x, y) => {
//   const div = (y ^ Math.PI) / 4;
//   const calcFitness = x * y + Math.sin(div);
//   return Number(calcFitness.toFixed(2));
// };

// sortOnInterval = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max) + 1;
//   return Math.floor(Math.random() * (max - min)) + min;
// };

// sumFitnessTotal = table => {
//   return Number(
//     table.reduce((total, arg) => total + arg.fitness, 0).toFixed(2)
//   );
// };

// calcProb = (table, total) =>
//   table.map(line => {
//     const calcProb = (line.fitness * 100) / total;
//     const probability = Number(calcProb.toPrecision(2));

//     line = { ...line, probability };
//     return line;
//   });

// calculateLine = functionToFitness => {
//   if (!functionToFitness || typeof functionToFitness !== "function")
//     throw Error("You have specify a function to calc fitness");

//   const x = this.sortOnInterval(this.interval.start, this.interval.end);
//   const y = this.sortOnInterval(this.interval.start, this.interval.end);

//   const chromosome = Number(`${convertToBinary(x)}${convertToBinary(y)}`);
//   const fitness = functionToFitness(x, y, chromosome);

//   return { x, y, chromosome, fitness };
// };

// mountTable = () => {
//   let lines = [];
//   if (!numberIsEven(this.lines))
//     throw Error("Lines quantity should be a even number");

//   for (let i = 0; i <= this.lines; i++) {
//     lines.push(this.calculateLine(this.functionToCalcFitness()));
//   }

//   const total = this.sumFitnessTotal(lines);

//   if (this.calculateProbability) {
//     console.log("Calculating probability");
//     lines = this.calcProb(lines, total);
//   }

//   return { total, data: lines };
// };
