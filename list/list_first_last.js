import { Link } from "./link.js";
import { write } from "../util/write.js";

export function FirstLastList(spec) {
  let first = undefined;
  let last = undefined;

  let isEmpty = function() {
    return first === undefined;
  }

  let insertFirst = function(data) {
    let newLink = Link({data});
    if (isEmpty()) {
      last = newLink; // newLink <- last
    }
    newLink.setNext(first); // newLink -> old first
    first = newLink; // first -> newLink
  }

  let insertLast = function(data) {
    let newLink = Link({data});
    if (isEmpty()) {
      first = newLink; // first -> newLink
    } else {
      last.setNext(newLink); // oldLast -> newLink
    }
    last = newLink; // newLink <- last
  }

  let deleteFirst = function() {
    let temp = first;
    if (first === last) {
      last = undefined; // undefined <- last
    }
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
          if (first === last) {
            last = undefined; // undefined <- last
          }
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
    insertFirst,
    insertLast,
    deleteFirst,
    find,
    deleteLink,
    display
  })
}

const main = () => {
  let list = FirstLastList();

  list.insertFirst(22);
  list.insertFirst(44);
  list.insertFirst(66);

  list.insertLast(11);
  list.insertLast(33);
  list.insertLast(55);

  list.display();

  list.deleteFirst();
  list.deleteFirst();

  list.display();

  let f = list.find(55);

  if (f !== undefined) {
    console.log("Found link with key " + f.getData());
  } else {
    console.log("Can't find link");
  }

  let d = list.deleteLink(33);

  if (d !== undefined) {
    console.log("Deleted link with key " + d.getData());
  } else {
    console.log("Can't delete link");
  }

  list.display();
}

// main();
