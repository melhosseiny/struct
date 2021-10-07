import { write } from "../util/write.js";
import { node } from "./node_234.js";

export function tree_234(spec) {
  let root = node();

  let get_root = () => root;

  let get_next_child = (node, value, cmp = default_cmp) => {
    let i;

    for (i = 0; i < node.get_data().size(); i++) {
      if (cmp(value, node.get_data().getElem(i)) === -1) {
        return node.get_children()[i];
      }
    }

    return node.get_children()[i];
  }

  let find = (key, cmp = default_cmp) => {
    let x = root;

    while (x) {
      const index = x.get_data().find(key, cmp);

      if (index !== -1) {
        return index;
      } else if (x.is_leaf()) {
        return -1;
      } else {
        x = get_next_child(x, key);
      }
    }
  }

  let split = x => {
    let parent = undefined;

    // temp store b, c and remove
    const [b, c] = [x.get_data().getElem(1), x.get_data().getElem(2)];
    x.get_data().remove(b);
    x.get_data().remove(c);

    // temp store and disconnect 2 rightmost children
    const [child2, child3] = [x.disconnect_child(2), x.disconnect_child(3)];

    // make new sibling node
    let new_sibling = node();

    // make new root if it is root
    if (x === root) {
      root = node();
      parent = root;
      // connect x as first child of new root
      root.connect_child(0, x, root);
    } else {
      parent = x.get_parent();
    }

    const [index, n] = [parent.get_data().insert(b), parent.get_data().size()];

    for (let i = n - 1; i > index; i--) {
      // make child i child i + 1 to make room for
      const temp = parent.disconnect_child(i);
      // connect temp as child i + 1 of parent
      parent.connect_child(i + 1, temp, parent);
    }

    // connect new sibling as child index + 1 of parent
    parent.connect_child(index + 1, new_sibling, parent);

    // reconnect the 2 rightmost children to new sibling as 2 leftmost children
    new_sibling.get_data().insert(c);
    new_sibling.connect_child(0, child2, new_sibling);
    new_sibling.connect_child(1, child3, new_sibling);

    return;
  }

  let insert = (value, cmp = default_cmp) => {
    let x = root;

    while (x) {
      if (x.is_full()) {
        split(x);
        x = x.get_parent();
        x = get_next_child(x, value);
      } else if (x.is_leaf()) {
        break;
      } else {
        x = get_next_child(x, value);
      }
    }

    x.get_data().insert(value);
  }

  let pre_order = node => {
    if (node) {
      node.display();
      write('/ ');

      for (let i = 0; i < 4; i++) {
        pre_order(node.get_children()[i]);
      }
    }
  }

  let traverse = () => {
    pre_order(root);
    write('\n');
  }

  const default_cmp = (a, b) => {
    return a < b ? -1 : (a > b ? 1 : 0);
  }

  return {
    get_root,
    find,
    insert,
    traverse
  }
}

const main = () => {
  const tree = tree_234();

  tree.traverse();

  tree.insert(50);
  tree.insert(40);
  tree.insert(60);

  tree.traverse();

  tree.insert(30);
  tree.insert(70);

  tree.traverse();

  let key = 90;
  let result = tree.find(key);
  if (result !== -1) {
    console.log("Found", key, "at index", result);
  } else {
    console.log("Can't find", key);
  }

  tree.insert(20);
  tree.insert(10);

  tree.traverse();
}

// main();
