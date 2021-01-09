export function hash(spec = {arr: [], size: 10}) {
  let { arr, size } = spec;
  const DEL = -1;
  let n_items = 0;
  let load_factor = 0;

  let get_size = () => size;
  let get_arr = () => arr;

  let hash_fn_rand = key => key % size;

  // non-zero, less than size, size must be relatively prime to 5, 4, 3, 2
  let hash_fn_double = key => 5 - key % 5;

  let hash_fn_str = key => {
    let hash_val = key.charCodeAt(0) - 96;

    for (let j = 1; j < key.length; j++) {
      const letter = key.charCodeAt(j) - 96;
      hash_val = hash_val * 27 + letter;
    }

    return hash_val % size;
  }

  // first prime > min
  let get_prime = min => {
    for (let i = min; true; i++) {
      if (is_prime(i)) {
        return i;
      }
    }
  }

  let is_prime = n => {
    for (let i = 2; i*i <= n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  size = get_prime(size);

  let insert = (key_val, hash_fn = hash_fn_rand) => {
    const index = hash_fn(key_val[0] || key_val);

    if (arr[index] === undefined || arr[index] === DEL) {
      arr[index] = key_val;
      return index;
    }

    probe(
      key_val[0] || key_val,
      index,
      _ => false,
      i => arr[i] === undefined || arr[i] === DEL,
      i => arr[i] = key_val
    )

    n_items++;
    load_factor = n_items / size;
    console.log(load_factor);
  }

  let remove = (key) => {
    const i = find(key);

    if (i) {
      arr[i] = DEL;
      return i;
    }

    return false;
  }

  let find = (key, hash_fn = hash_fn_rand) => {
    const index = hash_fn(key);

    if (arr[index] && (arr[index] === key || arr[index][0] === key)) {
      return index;
    }

    return probe(
      key,
      index,
      i => arr[i] === undefined,
      i => arr[index] && (arr[i] === key || arr[index][0] === key)
    )
  }

  const step_lin = (i, _) => i;
  const step_quad = (i, _) => 2 * i + 1; // diff between two consecutive sq
  const step_dbl = (i, k) => (i + 1) * hash_fn_double(k);

  // assumes array is not full
  let probe = (key, index, cancel, found, action, step = step_dbl) => {
    let i = 0;
    let j;

    while (true) {
      j = (index + step(i, key)) % size;

      if (cancel(j) === true) { return false; }
      if (found(j) === true) {
        if (action) {
          action(j);
        }
        return j;
      }
      i++;
    }
  }

  let get = key => {
    const index = find(key, hash_fn_str);
    return index !== false ? arr[index][1] : undefined;
  }

  let has = key => find(key, hash_fn_str) !== false;

  let set = (key, val) => {
    insert([key, val], hash_fn_str);
  }

  let display = () => {
    console.log(arr);
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
  const h = hash({ arr: [], size: 13});

  h.insert(108);
  h.insert(13);
  h.insert(0);
  h.insert(113);
  h.insert(5);
  h.insert(66);
  h.insert(117);
  h.insert(47);

  h.display();

  let key = 66;
  let result = h.find(key);
  if (result) {
    console.log("Found", key, "at index", result);
  } else {
    console.log("Can't find", key);
  }

  h.insert(100);
  h.display();

  h.remove(100);
  h.display();
}

// main();
