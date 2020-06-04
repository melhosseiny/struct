import util from 'util';

export function DoubleLink(spec) {
  let {data} = spec;
  let previous = undefined;
  let next = undefined;

  let getData = function() {
    return data;
  }

  let setData = function(value) {
    data = value;
  }

  let getPrevious = function() {
    return previous;
  }

  let setPrevious = function(link) {
    previous = link;
  }

  let getNext = function() {
    return next;
  }

  let setNext = function(link) {
    next = link;
  }

  let display = function() {
    process.stdout.write(util.format('%j', data));
  }

  return Object.freeze({
    getData,
    setData,
    getPrevious,
    setPrevious,
    getNext,
    setNext,
    display
  })
}
