import { SortedList } from "../list/list_sorted.js";

export function hash_chain(spec = { arr: [], size: 10}) {
  let { arr, size } = spec;

  let get_size = () => size;
  let get_arr = () => arr;

  let hash_fn_rand = key => key % size;

  let insert = (key_val, hash_fn = hash_fn_rand) => {
    const index = hash_fn(key_val[0] || key_val);

    if (arr[index] === undefined) {
      const list = SortedList();
      arr[index] = list;
    }

    arr[index].insert(key_val);

    return index;
  }

  let remove = (key, hash_fn = hash_fn_rand) => {
    const index = hash_fn(key);

    if (arr[index]) {
      arr[index].deleteLink(key);
    }

    return false;
  }

  let find = (key, hash_fn = hash_fn_rand) => {
    const index = hash_fn(key);

    if (arr[index]) {
      return arr[index].find(key, (a, b) => {
        return b === (a[0] || a) ? 0 : undefined;
      });
    }

    return false;
  }

  let display = () => {
    for (let i = 0; i < size; i++) {
      if (arr[i] !== undefined) {
        arr[i].display();
      } else {
        console.log("Empty");
      }
    }
  }

  return Object.freeze({
    get_size,
    get_arr,
    insert,
    remove,
    find,
    display
  })
}

const main = () => {
  const h = hash_chain({ arr: [], size: 20 });

  h.insert(240);
  h.insert(1160);
  h.insert(143);
  h.insert(1004);
  h.insert(1485);
  h.insert(1585);
  h.insert(87);
  h.insert(1407);
  h.insert(309);
  h.insert(490);
  h.insert(872);
  h.insert(1073);
  h.insert(594);
  h.insert(954);
  h.insert(335);
  h.insert(1216);
  h.insert(1057);
  h.insert(1357);
  h.insert(938);
  h.insert(1818);

  h.display();

  let key = 1585;
  let item = h.find(key);

  if (item !== undefined) {
    console.log("Found link with key " + item.getData());
  } else {
    console.log("Can't find", key);
  }

  h.remove(954);

  h.display();
}

// main()
