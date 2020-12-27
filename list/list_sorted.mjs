import {Link} from './link.mjs';

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

  let display = function() {
    console.log("List (first --> last)");
    let iterator = first;
    while (iterator) {
      iterator.display();
      process.stdout.write(' ');
      iterator = iterator.getNext();
    }
    process.stdout.write('\n');
  }

  return Object.freeze({
    isEmpty,
    insert,
    remove,
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
