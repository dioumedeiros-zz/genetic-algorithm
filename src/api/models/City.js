class City {
  constructor() {
    this.generateCities();
  }

  generateCities() {
    this.cities = [
      {
        id: "A",
        name: "Tubarão",
        distance: [
          { id: "B", time: 10 },
          { id: "C", time: 15 },
          { id: "D", time: 5 },
          { id: "E", time: 12 }
        ]
      },
      {
        id: "B",
        name: "Gravatal",
        distance: [
          { id: "A", time: 10 },
          { id: "C", time: 70 },
          { id: "D", time: 52 },
          { id: "E", time: 27 }
        ]
      },
      {
        id: "C",
        name: "Tubarão",
        distance: [
          { id: "A", time: 15 },
          { id: "B", time: 70 },
          { id: "D", time: 120 },
          { id: "E", time: 14 }
        ]
      },
      {
        id: "D",
        name: "Tubarão",
        distance: [
          { id: "A", time: 5 },
          { id: "B", time: 52 },
          { id: "C", time: 120 },
          { id: "E", time: 38 }
        ]
      },
      {
        id: "E",
        name: "Tubarão",
        distance: [
          { id: "A", time: 12 },
          { id: "B", time: 27 },
          { id: "C", time: 14 },
          { id: "D", time: 38 }
        ]
      }
    ];
  }
}

module.exports = { City };
