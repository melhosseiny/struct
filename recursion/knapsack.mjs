const weights = [11, 8, 7, 6, 5];

const knapsack = (target, first, next = first) => {
  if (next === weights.length) {
    console.log('No more items.');
    return;
  }

  if (weights[next] === target) {
    return 0;
  } else if (weights[next] < target) {
    console.log(`Target=${target}, ${weights[next]} is too small.`);
    return knapsack(target - weights[next], first, next+1);
  } else {
    console.log(`Target=${target}, ${weights[next]} is too big.`);
    if (next+1 === weights.length) {
      console.log('No more items.');
      return knapsack(target + weights[first+1], first+1, first+2)
    }
    return knapsack(target, first, next+1)
  }
}


for (let i = 0; i < weights.length; i++) {
  if (knapsack(20, i) === 0) {
    break;
  };
  console.log('---');
}
