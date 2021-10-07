import { DoubleLink } from "./link_double.js";
import { write } from "../util/write.js";

export function DoublyLinkedList(spec) {
  let first = undefined;
  let last = undefined;

  let isEmpty = function() {
    return first === undefined;
  }

  let getFirst = function() {
    return first;
  }

  let getLast = function() {
    return last;
  }

  let insertFirst = function(data) {
    let newLink = DoubleLink({data});

    if (first === undefined) { // empty list
      last = newLink;
    } else { // at least 1 element
      newLink.setNext(first); // newLink -> old first
      first.setPrevious(newLink); // newLink <- old first
    }
    first = newLink; // first > newLink
  }

  let insertLast = function(data) {
    let newLink = DoubleLink({data});

    if (last === undefined) {
      first = newLink;
    } else {
      newLink.setPrevious(last); // old last <- newLink
      last.setNext(newLink); // old last -> newLink
    }
    last = newLink; // newLink <- last
  }

  let insertAfter = function(key, data) {
    let newLink = DoubleLink({data});

    let iterator = first;
    while (iterator) {
      if (iterator.getData() === key) {
        if (iterator === last) {
          last = newLink;
        } else {
          iterator.getNext().setPrevious(newLink);
        }
        newLink.setNext(iterator.getNext());
        newLink.setPrevious(iterator);
        iterator.setNext(newLink);
        return true;
      }
      iterator = iterator.getNext();
    }
    // list is empty or key not found
    return false;
  }

  let deleteFirst = function() {
    let temp = first;
    if (first.getNext() === undefined) {
      last = undefined;
    } else {
      first.getNext().setPrevious(undefined); // undefined <- old next
    }
    first = first.getNext(); // first -> old next
    return temp;
  }

  let deleteLast = function() {
    let temp = last;
    if (last.getPrevious() === undefined) {
      first = undefined;
    } else {
      last.getPrevious().setNext(undefined); // old previous -> undefined
    }
    last = last.getPrevious(); // last -> old previous
    return temp;
  }

  let deleteKey = function(key) {
    let iterator = first;
    while (iterator) {
      if (iterator.getData() === key) {
        if (iterator === first) {
          first = iterator.getNext();
        } else {
          iterator.getPrevious().setNext(iterator.getNext());
        }

        if (iterator === last) {
          last = iterator.getPrevious();
        } else {
          iterator.getNext().setPrevious(iterator.getPrevious());
        }

        return true;
      }
      iterator = iterator.getNext();
    }
    // list is empty or key not found
    return false;
  }

  let displayForward = function() {
    console.log("List (first --> last)");
    let iterator = first;
    while (iterator) {
      iterator.display();
      write(' ');
      iterator = iterator.getNext();
    }
    write('\n');
  }

  let displayBackward = function() {
    console.log("List (last --> first)");
    let iterator = last;
    while (iterator) {
      iterator.display();
      write(' ');
      iterator = iterator.getPrevious();
    }
    write('\n');
  }

  return Object.freeze({
    isEmpty,
    getFirst,
    getLast,
    insertFirst,
    insertLast,
    insertAfter,
    deleteFirst,
    deleteLast,
    deleteKey,
    displayForward,
    displayBackward
  })
}

const main = () => {
  let list = DoublyLinkedList();

  list.insertFirst(22);
  list.insertFirst(44);
  list.insertFirst(66);

  list.insertLast(11);
  list.insertLast(33);
  list.insertLast(55);

  list.displayForward();
  list.displayBackward();

  list.deleteFirst();
  list.deleteLast();
  list.deleteKey(11);

  list.displayForward();

  list.insertAfter(22, 77);
  list.insertAfter(33, 88);

  list.displayForward();
}

// main();
