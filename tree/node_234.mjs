import util from 'util';
import { OrdArray } from '../array/array_ordered.mjs';

export function node(spec = { data: [] }) {
  const ORDER = 4;

  let { data } = spec;
  let items = OrdArray();
  items.setArray(data);
  let parent = undefined;
  let children = Array(ORDER);

  let is_full = () => items.size() === ORDER - 1;
  let is_leaf = () => children[0] === undefined;

  let get_data = () => items;
  let get_parent = () => parent;
  let get_children = () => children;
  let get_child = child_num => children[child_num];

  let set_parent = node => {
    parent = node;
  }

  let set_child = (child_num, node) => {
    children[child_num] = node;
  }

  let connect_child = (child_num, node, parent) => {
    children[child_num] = node;
    if (node !== undefined) {
      node.set_parent(parent);
    }
  }

  let disconnect_child = child_num => {
    const temp = children[child_num];
    children[child_num] = undefined;
    return temp;
  }

  let display = () => {
    for (let i = 0; i < items.size(); i++) {
      process.stdout.write(util.format('/%j', items.getElem(i)));
    }
  }

  return Object.freeze({
    is_full,
    is_leaf,
    get_data,
    get_parent,
    get_children,
    set_parent,
    connect_child,
    disconnect_child,
    display
  })
}
