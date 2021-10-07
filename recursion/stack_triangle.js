import { Stack } from "../stack/stack.js";

let n = 100;
let codePart = 1;
let stack = Stack({a: [], nElemns: 10000});
let answer = undefined;

console.log('---');

const step = () => {
  switch (codePart) {
    case 1: // initial call
      stack.push({n, returnAddress: 6})
      codePart = 2;
      break;
    case 2: // method entry
      if (stack.peek().n === 1) {
        answer = 1;
        codePart = 5; // exit
      } else {
        codePart = 3; // recursive call
      }
      break;
    case 3: // method call
      stack.push({n: stack.peek().n - 1, returnAddress: 4});
      codePart = 2;
      break;
    case 4: // calculation
      answer += stack.peek().n;
      codePart = 5;
      break;
    case 5: // method exit
      codePart = stack.peek().returnAddress;
      stack.pop();
      break;
    case 6: // return point
      return true;
  }

  return false;
}

while (step() === false) {
  ;
}

console.log("answer", answer);

const stackTriangle = (n) => {
  let answer = 0;

  while (n > 0) {
    stack.push(n);
    n = n - 1;
  }

  while (!stack.isEmpty()) {
    answer += stack.pop();
  }

  return answer;
}

console.log("answer", stackTriangle(4));
