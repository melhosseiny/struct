import util from 'util';

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

  let display = function() {
    process.stdout.write(util.format('%j', data));
  }

  return Object.freeze({
    getData,
    setData,
    getNext,
    setNext,
    display
  })
}
