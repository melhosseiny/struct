import { Link } from "./link.js";
import { ListIterator } from "./list_iterator.js";
import { write } from "../util/write.js";

export function List(spec) {
  let first = undefined;

  let isEmpty = function() {
    return first === undefined;
  }

  let getFirst = function() {
    return first;
  }

  let setFirst = function(link) {
    first = link;
  }

  let insertFirst = function(data) {
    let newLink = Link({data});
    newLink.setNext(first); // newLink -> old first
    first = newLink; // first -> newLink
  }

  let deleteFirst = function() {
    let temp = first;
    first = first.getNext(); // first -> old next
    return temp;
  }

  let find = function(key) {
    let iterator = first;
    while (iterator) {
      if (iterator.getData() === key) {
        return iterator;
      }
      iterator = iterator.getNext();
    }
    return undefined;
  }

  // delete is a reserved word
  let deleteLink = function(key) {
    let iterator = first;
    let previous = undefined;
    while (iterator) {
      if (iterator.getData() === key) {
        if (iterator === first) {
          first = first.getNext();
        } else {
          previous.setNext(iterator.getNext());
        }
        return iterator;
      }
      previous = iterator;
      iterator = iterator.getNext();
    }
    return undefined;
  }

  let getIterator = function() {
    let iterator = ListIterator({current: first, list: this});
    return iterator;
  }

  let display = function() {
    console.log("List (first --> last)");
    let iterator = first;
    while (iterator) {
      iterator.display();
      write(' ');
      iterator = iterator.getNext();
    }
    write('\n');
  }

  return Object.freeze({
    isEmpty,
    getFirst,
    setFirst,
    insertFirst,
    deleteFirst,
    find,
    deleteLink,
    getIterator,
    display
  })
}

const main = () => {
  let list = List();

  list.insertFirst(22);
  list.insertFirst(44);
  list.insertFirst(66);
  list.insertFirst(88);

  list.display();

  let f = list.find(44);

  if (f !== undefined) {
    console.log("Found link with key " + f.getData());
  } else {
    console.log("Can't find link");
  }

  let d = list.deleteLink(44);

  if (d !== undefined) {
    console.log("Deleted link with key " + d.getData());
  } else {
    console.log("Can't delete link");
  }

  list.display();

  while (!list.isEmpty()) {
    console.log("deleted ", list.deleteFirst().getData());
  }

  list.display();

  let list2 = List();
  let iter1 = list2.getIterator();

  iter1.insertAfter(20);
  iter1.insertAfter(40);
  iter1.insertAfter(80);
  iter1.insertBefore(60);

  list2.display();

  iter1.reset();
  iter1.nextLink();
  iter1.nextLink();
  console.log(iter1.getCurrent().getData());

  iter1.insertBefore(100);
  iter1.insertAfter(7);

  list2.display();

  console.log(iter1.deleteCurrent());

  list2.display();

  iter1.reset();
  iter1.getCurrent().display();
  write(' ');
  while (!iter1.atEnd()) {
    iter1.nextLink();
    iter1.getCurrent().display();
    write(' ');
  }
  console.log('\n');

  let list3 = new List();
  let iter2 = list3.getIterator();

  iter2.insertAfter(21);
  iter2.insertAfter(40);
  iter2.insertAfter(30);
  iter2.insertAfter(7);
  iter2.insertAfter(45);

  list3.display();
  iter2.reset();

  if (iter2.getCurrent().getData() % 3 === 0) {
    iter2.deleteCurrent();
  }
  while (!iter2.atEnd()) {
    iter2.nextLink();
    if (iter2.getCurrent().getData() % 3 === 0) {
      iter2.deleteCurrent();
    }
  }

  list3.display();
}

// main();
