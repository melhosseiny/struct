export function Link(spec) {
  let {data,next} = spec;

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
    console.log(data);
  }

  return Object.freeze({
    getData,
    setData,
    getNext,
    setNext,
    display
  })
}
