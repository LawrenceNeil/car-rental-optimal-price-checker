const readline = require("readline");

const CAR_CATEGORIES = [
  { name: "small", capacity: 5, price: 5000 },
  { name: "medium", capacity: 10, price: 8000 },
  { name: "large", capacity: 15, price: 12000 },
];

function computeMinimumCost(requiredSeats, categories) {
  if (requiredSeats <= 0) {
    // If no seats are required, cost is zero and no cars needed
    return { totalPrice: 0, carCount: {} };
  }

  const maxCapacity = Math.max(...categories.map((cat) => cat.capacity));
  const dpUpperBound = requiredSeats + maxCapacity; // upper boundary for the dynamic program

  const dpArray = Array.from({ length: dpUpperBound + 1 }, () => ({
    cost: Infinity,
    combination: {},
  }));
  dpArray[0] = { cost: 0, combination: {} };

  for (let currentSeats = 0; currentSeats <= dpUpperBound; currentSeats++) {
    console.log(dpArray);
    const currentState = dpArray[currentSeats];
    if (currentState.cost === Infinity) {
      // unreachable state, skip
      continue;
    }

    for (const category of categories) {
      const nextSeats = currentSeats + category.capacity;
      if (nextSeats > dpUpperBound) {
        continue; // don't exceed array bounds
      }

      const newCost = currentState.cost + category.price;
      if (newCost < dpArray[nextSeats].cost) {
        dpArray[nextSeats].cost = newCost;
        const newCombination = { ...currentState.combination };
        newCombination[category.name] =
          (newCombination[category.name] || 0) + 1;

        dpArray[nextSeats].combination = newCombination;
      }
    }
  }

  let lowestCost = Infinity;
  let optimalCombination = null;
  for (let seats = requiredSeats; seats <= dpUpperBound; seats++) {
    if (dpArray[seats].cost < lowestCost) {
      lowestCost = dpArray[seats].cost;
      optimalCombination = dpArray[seats].combination;
    }
  }

  return { totalPrice: lowestCost, carCount: optimalCombination };
}

const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printResult = (result) => {
  const { totalPrice, carCount } = result;
  console.log(`Optimized price = PHP ${totalPrice}`);
  Object.entries(carCount).forEach(([type, count]) => {
    if (count === 0) return;
    console.log(`Type: ${type} x ${count}`);
  });
};

prompt.question("Enter Number of seats needed: ", (answer) => {
  const seatsNeeded = parseInt(answer, 10);

  if (isNaN(seatsNeeded) || seatsNeeded <= 0) {
    console.log("Invalid input enter a valid number");
    return;
  }

  const result = computeMinimumCost(seatsNeeded, CAR_CATEGORIES);

  printResult(result);

  prompt.close();
});
