import { Node } from "./node.js";
import { Tree } from "./tree.js";
import { PQueue } from "../queue/pqueue.js";

function huffman(spec) {
  const { message } = spec;

  const create_freq_table = () => {
    const freq_table = new Map();

    for (let i = 0; i < message.length; i++) {
      const char = message.charAt(i);
      const freq = freq_table.has(char) ? freq_table.get(char) : 0;
      freq_table.set(char, freq + 1);
    }

    return freq_table;
  }

  // grow a huffman tree by removing two trees from the q and making them the
  // children of a new tree whose root's frequency is the sum of the children's
  const grow_huffman_tree = (q) => {
    while (!q.isEmpty()) {
      const a = q.remove();
      if (q.isEmpty()) {
        return a;
      }
      const b = q.remove();

      const new_tree = Tree();
      new_tree.insert({
        char: '',
        freq: a.getRoot().getData().freq + b.getRoot().getData().freq
      },
      compare_tree);

      const new_root = new_tree.getRoot();
      new_root.setLeftChild(a.getRoot());
      new_root.setRightChild(b.getRoot());

      q.insert(new_tree, compare_tree);
    }
  }

  const code_table = new Map();

  // create a code table by mapping leafs to paths branches on the huffman tree
  const create_code_table = (node, code = [], branch) => {
    if (!node) {
      return;
    }
    if (branch !== undefined) {
      code.push(branch);
    }

    if (!node.getLeftChild() && !node.getRightChild()) {
      code_table.set(node.getData().char, code.join(''));
    } else {
      create_code_table(node.getLeftChild(), code.slice(), 0);
      create_code_table(node.getRightChild(), code.slice(), 1);
    }
  }

  // encode a message by growing a huffman tree and creating a code table
  const encode = () => {
    let encoded_message = '';
    const freq_table = create_freq_table();
    const q = PQueue({a: [], nElems: freq_table.size});

    for (let [key, value] of freq_table) {
      const char_tree = Tree();
      char_tree.insert({char: key, freq: value}, compare_node_data)
      q.insert(char_tree, compare_tree)
    }

    const huffman_tree = grow_huffman_tree(q);
    create_code_table(huffman_tree.getRoot());

    for (let i = 0; i < message.length; i++) {
      encoded_message += code_table.get(message.charAt(i));
    }

    return [encoded_message, huffman_tree];
  }

  // decode a binary string by following a path to a leaf of the huffman tree
  const decode = (encoded_message, huffman_tree) => {
    let decoded_message = '';
    let current = huffman_tree.getRoot();

    for (let i = 0; i < encoded_message.length; i++) {
      if (encoded_message.charAt(i) === '0') {
        current = current.getLeftChild();
      } else {
        current = current.getRightChild();
      }

      if (current.getData().char !== '') {
        decoded_message += current.getData().char;
        current = huffman_tree.getRoot();
      }
    }

    return decoded_message;
  }

  const compare_tree = (a, b) => {
    if (a.getRoot().getData().freq < b.getRoot().getData().freq) {
      return -1;
    } else if (a.getRoot().getData().freq > b.getRoot().getData().freq) {
      return 1;
    }
    return 0;
  }

  const compare_node_data = (a, b) => {
    if (a.freq < b.freq) {
      return -1;
    } else if (a.freq > b.freq) {
      return 1;
    }
    return 0;
  }

  return Object.freeze({
    encode,
    decode
  })
}

const huffman_code = huffman({ message: "SUSIE SAYS IT IS EASY\n"});
const [encoded_message, huffman_tree] = huffman_code.encode();
console.log(encoded_message);
const decoded_message = huffman_code.decode(encoded_message, huffman_tree);
console.log(decoded_message);
