<h1 align="center">Algoritimo genético</h1>
<p align="center">Resolução do problema do Caixeiro Viajante</p>

![](github/genetico.png)

## Representação dos Indivíduos

- Cada indivíduo é representado por seu id, como sendo uma letra do alfabeto.

```js
[{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }];
```

## Cálculo fitness

- O cálculo é feito selecionando uma cidade, que com ela tem uma lista de cidades e suas distâncias. Sendo efetuado a soma das distâncias no qual a cidade percorrerá.

```js
[
  {
    id: "A",
    distance: [
      {
        id: "B",
        time: 10,
      },
      {
        id: "D",
        time: 37,
      },
      {
        id: "E",
        time: 22,
      },
    ],
  },
];
```

## Mutação Genética

- Utilizado um percentual de **2%**

## Seleção de Indivíduos

- Utilizado o método de elitismo para a seleção dos indivíduos, onde foi é ordenado a lista de indivíduos pela menor distância, pegando a metade mais qualificada e assim é escolhido de forma aleatória.

```js
const betters = Math.floor(population.length / 2);
for (let index = 0; index < betters; index++) {
  superPopulation.push(population[index]);
}
```

- Retorno do novo indivíduo de forma aleatória

```js
const randomChoise = Math.floor(Math.random() * betters);
return superPopulation[randomChoise];
```

## Critério de parada

- Utilizado com critério de parada o total de gerações.
