import fruits from "../data/fruits";
import { FruitInput } from "../services/fruits-service";

export type Fruit = {
  id: number;
  name: string;
  price: number;
};

function getFruits() {
  return fruits;
}

function getSpecificFruit(id: number): Fruit | undefined {
  return fruits.find((fruit) => {
    return fruit.id === id;
  });
}

function getSpecificFruitByName(name: string): Fruit | undefined {
  return fruits.find((fruit) => {
    return fruit.name === name;
  });
}

function insertFruit(fruit: FruitInput) {
  const id = fruits.length + 1;
  fruits.push({ ...fruit, id });
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit,
};

export default fruitsRepository;
