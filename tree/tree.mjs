import {Node} from './node.mjs';

export function Tree(spec) {
  let root = undefined;

  let getRoot = function() {
    return root;
  }

  let find = function(key, compare = defaultCompare) {
    let current = root;

    while (current) {
      if (compare(key, current.getData()) === -1) {
        break;
      } else if (compare(key, current.getData()) === -1) {
        current = current.getLeftChild();
      } else {
        current = current.getRightChild();
      }
    }

    return current;
  }

  let insert = function(value, compare = defaultCompare) {
    let node = Node({ data: value });

    if (!root) {
      root = node;
    } else {
      let [current, parent] = [root, undefined];

      while (current) {
        parent = current;

        if (compare(value, current.getData()) === -1) {
          current = current.getLeftChild();

          if (!current) {
            parent.setLeftChild(node);
            return;
          }
        } else {
          current = current.getRightChild();

          if (!current) {
            parent.setRightChild(node);
            return;
          }
        }
      }
    }
  }

  let deleteNode = function(key, compare = defaultCompare) {
    let [current, parent] = [root, undefined];

    while (current) {
      if (compare(key, current.getData()) === 0) {
        break;
      } else if (compare(key, current.getData()) === -1) {
        parent = current;
        current = current.getLeftChild();
      } else {
        parent = current;
        current = current.getRightChild();
      }
    }

    if (current) {
      if (!current.getLeftChild() && !current.getRightChild()) {
        // leaf node
        if (current === root) {
          root = undefined;
        } else if (compare(key, parent.getData())) {
          parent.setLeftChild(undefined);
        } else {
          parent.setRightChild(undefined);
        }
      } else if (!current.getRightChild()) {
        // has left child
        if (current === root) {
          root = current.getLeftChild();
        } else if (compare(key, parent.getData())) {
          parent.setLeftChild(current.getLeftChild());
        } else {
          parent.setRightChild(current.getLeftChild());
        }
      } else if (!current.getLeftChild()) {
        // has right child
        if (current === root) {
          root = current.getRightChild();
        } else if (compare(key, parent.getData()) === -1) {
          parent.setLeftChild(current.getRightChild());
        } else {
          parent.setRightChild(current.getRightChild());
        }
      } else {
        // has two children
        let successor = getSuccessor(current);

        if (current === root) {
          root = successor;
        } else if (compare(key, parent.getData()) === -1) {
          parent.setLeftChild(successor);
        } else {
          parent.setRightChild(successor);
        }

        successor.setLeftChild(current.getLeftChild())
      }
    }

    return current;
  }

  let min = function() {
    let [current, parent] = [root, undefined];

    while (current) {
      parent = current;
      current = current.getLeftChild();
    }

    return parent;
  }

  let max = function() {
    let [current, parent] = [root, undefined];

    while (current) {
      parent = current;
      current = current.getRightChild();
    }

    return parent;
  }

  let getSuccessor = function(delNode) {
    let [current, parent, grandParent] =
      [delNode.getRightChild(), delNode, undefined];

    while (current) {
      grandParent = parent;
      parent = current;
      current = current.getLeftChild();
    }

    if (parent !== delNode.getRightChild()) {
      grandParent.setLeftChild(parent.getRightChild());
      parent.setRightChild(delNode.getRightChild())
    }

    return parent;
  }

  let preOrder = function(node) {
    if (node) {
      node.display();
      process.stdout.write(' ');
      preOrder(node.getLeftChild());
      preOrder(node.getRightChild());
    }
  }

  let inOrder = function(node) {
    if (node) {
      inOrder(node.getLeftChild());
      node.display();
      process.stdout.write(' ');
      inOrder(node.getRightChild());
    }
  }

  let postOrder = function(node) {
    if (node) {
      inOrder(node.getLeftChild());
      inOrder(node.getRightChild());
      node.display();
      process.stdout.write(' ');
    }
  }

  let traverse = function() {
    inOrder(root);
    process.stdout.write('\n');
  }

  const defaultCompare = function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  return Object.freeze({
    getRoot,
    insert,
    deleteNode,
    find,
    min,
    max,
    traverse
  })
}

const main = () => {
  let tree = Tree();

  tree.insert(50)
  tree.insert(25)
  tree.insert(75)
  tree.insert(12)
  tree.insert(37)
  tree.insert(43)
  tree.insert(30)
  tree.insert(33)
  tree.insert(87)
  tree.insert(93)
  tree.insert(97)

  tree.traverse();

  let f = tree.find(25);
  if (f !== undefined) {
    console.log("Found node with key " + f.getData());
  } else {
    console.log("Can't find node");
  }

  tree.deleteNode(50);
  tree.deleteNode(25);
  tree.deleteNode(30);

  tree.traverse();
}

// main();
