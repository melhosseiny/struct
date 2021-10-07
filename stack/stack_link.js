import { List } from "../list/list.js";

export function LinkStack(spec) {
  let list = List();

  let push = function(v) {
    list.insertFirst(v);
  }

  let pop = function() {
    return list.deleteFirst();
  }

  let isEmpty = function() {
    return list.isEmpty();
  }

  let display = function() {
    console.log("Stack (top --> bottom)");
    list.display();
  }

  return Object.freeze({
    push,
    pop,
    isEmpty,
    display
  });
}

let stack = LinkStack();

stack.push(20);
stack.push(40);

stack.display();

stack.push(60);
stack.push(80);

stack.display();

stack.pop();
stack.pop();

stack.display();
