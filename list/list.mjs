import {Link} from './link.mjs';

export function List(spec) {
  let {first} = spec;

  let isEmpty = function() {
    return first === undefined;
  }

  let insertFirst = function(data) {
    let newLink = Link({data: data, next: first});
    first = newLink;
  }

  let deleteFirst = function(data) {
    let temp = first;
    first = first.getNext();
    return temp;
  }

  let display = function() {
    console.log("List (first --> last)");
    let iterator = first;
    while (iterator) {
      iterator.display();
      iterator = iterator.getNext();
    }
  }

  return Object.freeze({
    isEmpty,
    insertFirst,
    deleteFirst,
    display
  })
}

let list = List({});

list.insertFirst(22);
list.insertFirst(44);
list.insertFirst(66);
list.insertFirst(88);

list.display();

while (!list.isEmpty()) {
  console.log("deleted", list.deleteFirst().getData());
}

list.display();
