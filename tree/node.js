import { write } from "../util/write.js";

export function Node(spec) {
  let {data} = spec;
  let leftChild = undefined;
  let rightChild = undefined;

  let getData = function() {
    return data;
  }

  let setData = function(value) {
    data = value;
  }

  let getLeftChild = function() {
    return leftChild;
  }

  let setLeftChild = function(node) {
    leftChild = node;
  }

  let getRightChild = function() {
    return rightChild;
  }

  let setRightChild = function(node) {
    rightChild = node;
  }

  let display = function() {
    write(data);
  }

  return Object.freeze({
    getData,
    setData,
    getLeftChild,
    setLeftChild,
    getRightChild,
    setRightChild,
    display
  })
}
