import { Link } from "./link.js";

export function ListIterator(spec) {
  let { current, previous, list }  = spec;

  let reset = function() {
    current = list.getFirst();
    previous = undefined;
  }

  let atEnd = function() {
    return current.getNext() === undefined;
  }

  let nextLink = function() {
    previous = current;
    current = current.getNext();
  }

  let getCurrent = function() {
    return current;
  }

  let insertAfter = function(data) {
    let newLink = Link({data});

    if (list.isEmpty()) {
      list.setFirst(newLink);
    } else {
      newLink.setNext(current.getNext());
      current.setNext(newLink);
      previous = current;
    }

    current = newLink;
  }

  let insertBefore = function(data) {
    let newLink = Link({data});

    newLink.setNext(current);

    if (previous === undefined) {
      list.setFirst(newLink);
    } else {
      previous.setNext(newLink);
    }

    current = newLink;
  }

  let deleteCurrent = function() {
    let value = current.getData();

    if (current === list.getFirst()) {
      list.setFirst(current.getNext());
    } else {
      previous.setNext(current.getNext());
    }

    if (atEnd()) {
      reset();
    } else {
      current = current.getNext();
    }

    return value;
  }

  return Object.freeze({
    reset,
    atEnd,
    nextLink,
    getCurrent,
    insertAfter,
    insertBefore,
    deleteCurrent
  });
}
