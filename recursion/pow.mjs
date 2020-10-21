const pow = (x, y) => {
  const args = [x*x,Math.floor(y / 2)];
  return y === 1 ? x : y % 2 === 0 ? pow(...args) : x * pow(...args);
}

console.log(pow(2,8));
console.log(pow(3,18));
