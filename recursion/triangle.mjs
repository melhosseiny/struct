const triangle = function(n) {
  let total = 0;

  for (; n > 0; n--) {
    total += n;
  }

  return total;
}

const triangle_r = function(n) {
  return n === 1 ? 1 : n + triangle_r(n-1);
}

const triangle_re = function(n) {
  if (n === 1) {
    console.log('Returning 1');
    return 1;
  }
  const temp =  n + triangle_re(n-1);
  console.log(`Returning ${temp}`);
  return temp;
}

console.log(triangle(1));
console.log(triangle(2));
console.log(triangle(3));
console.log(triangle(4));
console.log(triangle_re(5));
