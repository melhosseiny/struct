import { hash } from "./hash.js";

export function map(spec = { hash_table: hash() }) {
  let { hash_table } = spec;

  let hash_fn_str = key => {
    let hash_val = key.charCodeAt(0) - 96;

    for (let j = 1; j < key.length; j++) {
      const letter = key.charCodeAt(j) - 96;
      hash_val = hash_val * 27 + letter;
    }

    return hash_val % hash_table.get_size();
  }

  let get = key => {
    // either an index or a link
    const index_or_link = hash_table.find(key, hash_fn_str);
    if (index_or_link !== false) {
      const item = hash_table.get_arr()[index_or_link] || index_or_link.getData();
      return item[1];
    }
    return undefined;
  }

  let has = key => hash_table.find(key, hash_fn_str) !== false;

  let set = (key, val) => {
    hash_table.insert([key, val], hash_fn_str);
  }

  let display = () => {
    hash_table.display();
  }

  return Object.freeze({
    get,
    has,
    set,
    display
  })
}

const main = () => {
  const h_map = map();

  h_map.set('cats', {a: 1, b: 4});
  h_map.display();
  console.log(h_map.has('cats'));
  console.log(h_map.has('dogs'));
  console.log(h_map.get('cats'));
  console.log(h_map.get('dogs'));
}

// main();
