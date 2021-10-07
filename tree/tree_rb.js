import { write } from "../util/write.js";
import { node } from "./node_rb.js";

export function tree_rb(spec) {
  let root = undefined;

  let get_root = () => root;

  let flip_colors = node => {
    const left_child = node.get_left_child();
    const right_child = node.get_right_child();

    // dont flip if no children
    if (left_child || right_child) {
      if (node !== root) {
        node.toggle_color();
      }

      if (left_child) { left_child.toggle_color() };
      if (right_child) { right_child.toggle_color() };
    }
  }

  // color flip if there's a black node with two red children
  let have_to_color_flip = node => {
    const left_child = node.get_left_child();
    const right_child = node.get_right_child();
    return node.get_color() === 'b'
      && (left_child !== undefined && left_child.get_color() === 'r')
      && (right_child !== undefined && right_child.get_color() === 'r');
  }

  let is_left_child = (x, p) => p.get_left_child() === x;

  let is_right_child = (x, p) => p.get_right_child() === x;

  let is_outside_grandchild = (x, p, g) => {
    return is_left_child(p, g) && is_left_child(x, p)
      || is_right_child(p, g) && is_right_child(x, p);
  }

  let is_inside_grandchild = (x, p, g) => {
    return is_left_child(p, g) && is_right_child(x, p)
      || is_right_child(p, g) && is_left_child(x, p);
  }

  let rotate_right = (top, p) => {
    const left_child = top.get_left_child();

    // top must have a left child
    if (!left_child) { return; }

    const crossover_node = left_child.get_right_child(); // if it exists
    left_child.set_right_child(top);
    top.set_left_child(crossover_node);

    // if top is root
    if (!p) {
      root = left_child;
    } else {
      // top is left child of its parent
      if (is_left_child(top, p)) {
        p.set_left_child(left_child);
      }
      // top is right child of its parent
      if (is_right_child(top, p)) {
        p.set_right_child(left_child);
      }
    }
  }

  let rotate_left = (top, p) => {
    const right_child = top.get_right_child();

    // top must have a left child
    if (!right_child) { return; }

    const crossover_node = right_child.get_left_child(); // if it exists
    right_child.set_left_child(top);
    top.set_right_child(crossover_node);

    // if top is root
    if (!p) {
      root = right_child;
    } else {
      // top is left child of its parent
      if (is_left_child(top, p)) {
        p.set_left_child(right_child);
      }
      // top is right child of its parent
      if (is_right_child(top, p)) {
        p.set_right_child(right_child);
      }
    }
  }

  let perform_rotations = (x, p, g, gg) => {
    if (is_outside_grandchild(x, p, g)) {
      g.toggle_color();
      p.toggle_color();

      if (is_left_child(x, p)) {
        rotate_right(g, gg);
      } else if (is_right_child(x, p)) {
        rotate_left(g, gg);
      }
    } else if (is_inside_grandchild(x, p, g)) {
      g.toggle_color();
      x.toggle_color();

      if (is_left_child(x, p)) {
        rotate_right(p, g);
        rotate_left(g, gg);
      } else if (is_right_child(x, p)) {
        rotate_left(p, g);
        rotate_right(g, gg);
      }
    }
  }

  let find = (key, cmp = default_cmp) => {
    let current = root;

    while (current) {
      if (cmp(key, current.get_data()) === 0) {
        break;
      } else if (cmp(key, current.get_data()) === -1) {
        current = current.get_left_child();
      } else {
        current = current.get_right_child();
      }
    }

    return current;
  }

  let insert = (value, cmp = default_cmp) => {
    let new_node = node({ data: value });

    if (!root) {
      root = new_node;
      root.toggle_color();
    } else {
      let [x, p, g, gg] = [root, undefined, undefined, undefined];

      while (x) {
        // color flip if you have to
        if (have_to_color_flip(x)) {
          flip_colors(x);

          if (x && p && g && p.get_color() === 'r') {
            perform_rotations(x, p, g, gg);
          }
        }

        gg = g;
        g = p;
        p = x;

        if (cmp(value, x.get_data()) === -1) {
          x = x.get_left_child();

          if (!x) {
            p.set_left_child(new_node);
            if (new_node && p && g && p.get_color() === 'r') {
              perform_rotations(new_node, p, g, gg);
            }
            return;
          }
        } else {
          x = x.get_right_child();

          if (!x) {
            p.set_right_child(new_node);
            if (new_node && p && g && p.get_color() === 'r') {
              perform_rotations(new_node, p, g, gg);
            }
            return;
          }
        }
      }
    }
  }

  let pre_order = node => {
    if (node) {
      node.display();
      write(' ');
      pre_order(node.get_left_child());
      pre_order(node.get_right_child());
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
  const tree = tree_rb();

  tree.insert(50);
  tree.insert(40);
  tree.insert(30);
  tree.insert(20);
  tree.insert(10);

  tree.traverse();

  let f = tree.find(20);
  if (f !== undefined) {
    console.log("Found node with key " + f.get_data());
  } else {
    console.log("Can't find node");
  }
}

// main();
