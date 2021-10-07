import { FirstLastList } from "../list/list_first_last.js";

export function Queue() {
  let list = new FirstLastList();

  let front = 0;
  let rear = -1;
  let nItems = 0;

  let insert = function(v) {
    list.insertLast(v);
  }

  let remove = function() {
    return list.deleteFirst();
  }

  let isEmpty = function() {
    return list.isEmpty();
  }

  // for debugging
  let display = function() {
    console.log("Queue (front --> rear)");
    list.display();
  }

  return Object.freeze({
    insert,
    remove,
    isEmpty,
    display
  })
}

let q = Queue();

q.insert(20);
q.insert(40);

q.display();

q.insert(60);
q.insert(80);

q.display()

q.remove();
q.remove();

q.display();
