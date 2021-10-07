import { Link } from "./link.js";
import { write } from "../util/write.js";

export function SortedList(spec) {
  let first = undefined;

  let isEmpty = function() {
    return first === undefined;
  }

  let insert = function(data) {
    let newLink = Link({data});
    let iterator = first;
    let previous = undefined;

    while (iterator && data > iterator.getData()) {
      previous = iterator;
      iterator = iterator.getNext();
    }

    if (previous === undefined) { // at beginning
      first = newLink;            // first -> newLink
    } else {                      // not at beginning
      previous.setNext(newLink);  // prev -> newLink
    }
    newLink.setNext(iterator);    // newLink -> iterator or old first
    return;
  }

  let remove = function() {
    let temp = first;
    first = first.getNext(); // first -> old next
    return temp;
  }

  // delete is a reserved word
  let deleteLink = function(key) {
    let iterator = first;
    let previous = undefined;

    while (iterator) {
      if (iterator.getData() > key) {
        break;
      }

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

  let find = function(key, cmp = default_cmp) {
    let iterator = first;
    while (iterator) {
      if (cmp(iterator.getData(), key) === 0) {
        return iterator;
      }
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

  const default_cmp = (a, b) => {
    return a < b ? -1 : (a > b ? 1 : 0);
  }

  return Object.freeze({
    isEmpty,
    insert,
    remove,
    deleteLink,
    find,
    display
  })
}

const main = () => {
  let list = SortedList();

  list.insert(20);
  list.insert(40);

  list.display();

  list.insert(10);
  list.insert(30);
  list.insert(50);

  list.display();

  list.remove();

  list.display();
}

// main();
