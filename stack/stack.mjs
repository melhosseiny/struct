export function Stack(spec = {a: [], nElems: 0}) {
  let {a,nElems} = spec;

  let top = -1;

  let push = function(v) {
    a[++top] = v;
  }

  let pop = function() {
    if (top === -1) { throw "stack is empty"; }
    return a[top--];
  }

  let peek = function() {
    return a[top];
  }

  let isEmpty = function() {
    return top === -1;
  }

  let isFull = function() {
    return top === nElems - 1;
  }

  // for debugging
  let display = function() {
    console.log(a, top);
  }

  return Object.freeze({
    push,
    pop,
    peek,
    isEmpty,
    isFull
  });
}

let stack = Stack({a: [], nElemns: 10});
stack.push(20);
stack.push(40);
stack.push(60);
stack.push(80);

while (!stack.isEmpty()) {
  let value = stack.pop();
  console.log(value);
}

try {
  stack.pop();
} catch (e) {
  console.log(e);
}

// reversing a word
let word = "part"
let reverser = Stack({a: [], nElems: word.length})

for (let i = 0; i < word.length; i++) {
  reverser.push(word.charAt(i));
}
let reverse = ""
while (!reverser.isEmpty()) {
  reverse += reverser.pop();
}
console.log(reverse);

// delimiter matching
let expr = "a{b(c[d]e)f}";
//let expr = "a{b(c]d}e";
//let expr = "a{b(c[d]e)f";
console.log(expr);
let checker = Stack({a: [], nElems: expr.length});

try {
  for(let i = 0; i < expr.length; i++) {
    let ch = expr.charAt(i);
    switch(ch) {
      case '{':
      case '[':
      case '(':
        checker.push(ch);
        break;
      case '}':
      case ']':
      case ')':
        if (!checker.isEmpty()) {
          let chx = checker.pop();
          if (ch === '}' && chx !== '{' ||
              ch === ']' && chx !== '[' ||
              ch === ')' && chx !== '(') {
            throw "Error: " + ch + " at " + i;
          }
        } else {
          throw "Error: " + ch + " at " + i;
        }
        break;
      default:
        break;
    }
  }
  if (!checker.isEmpty()) {
    throw "Error: missing right delimiter"
  }
  console.log(true);
} catch(e) {
  console.log(e);
}
