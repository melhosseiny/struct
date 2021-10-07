import { write } from "../util/write.js";

export function Link(spec) {
  let {data} = spec;
  let next = undefined;

  let getData = function() {
    return data;
  }

  let setData = function(value) {
    data = value;
  }

  let getNext = function() {
    return next;
  }

  let setNext = function(link) {
    next = link;
  }

  let display = async function() {
    write(data);
  }

  return Object.freeze({
    getData,
    setData,
    getNext,
    setNext,
    display
  })
}
