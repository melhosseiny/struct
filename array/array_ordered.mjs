export function OrdArray(spec = {a: [], nElems: 0}) {
  let {a,nElems} = spec;

  let setElem = function (i, v) {
    a[i] = v;
  }

  let getElem = function(i) {
    return a[i];
  }

  let getArray = function() {
    return a;
  }

  let setArray = function(array) {
    a = array;
    nElems = a.length;
  }

  let insert = function(value) {
    let l = 0;
    let u = nElems - 1;
    let i = 0;

    while (l <= u) {
      i = Math.floor((l+u)/2);

      if (value < a[i]) {
        u = i - 1;
      } else if (value > a[i]) {
        l = i + 1;
        i++;
      }
    }

    for (let j = nElems; j > i; j--) {
      a[j] = a[j-1];
    }

    a[i] = value;
    nElems++;
  }

  let find = function(searchKey) {
    let l = 0;
    let u = nElems - 1;
    let i;

    while (l <= u) {
      i = Math.floor((l+u)/2);
      if (searchKey === a[i]) {
        return i;
      } else if (searchKey < a[i]) {
        u = i - 1;
      } else if (searchKey > a[i]) {
        l = i + 1;
      }
    }
    return -1;
  }

  let remove = function(value) {
    let j = find(value);
    if (j !== -1) {
      for (let k = j; k < nElems - 1; k++) {
        a[k] = a[k+1]
      }
      nElems--;
      return true;
    } else {
      return false;
    }
  }

  let display = function() {
    for (let j = 0; j < nElems; j++) {
      process.stdout.write(a[j] + " ");
    }
    process.stdout.write("\n");
  }

  let size = function() {
    return nElems;
  }

  // pp
  let merge = function(arr_b) {
    let c = [];
    let b = arr_b.getArray();

    let s1 = a.length >= b.length ? a : b;
    let s2 = a.length >= b.length ? b : a;

    for (let i = 0, j= 0; i < s1.length; i++) {
      for (; j < s2.length && s2[j] < s1[i]; j++) {
        c[i+j] = s2[j];
      }
      c[i+j] = s1[i];
      if (i === s1.length - 1) {
        for (; j < s2.length; j++) {
          c[i+j+1] = s2[j];
        }
      }
    }

    let arr_c = OrdArray();
    arr_c.setArray(c);
    return arr_c;
  }

  return Object.freeze({
    setElem,
    getElem,
    getArray,
    setArray,
    insert,
    find,
    remove,
    display,
    size,
    // pp
    merge,
  });
}

let arr = OrdArray();

// init array with 10 items
arr.insert(77);
arr.insert(99);
arr.insert(44);
arr.insert(55);
arr.insert(22);
arr.insert(88);
arr.insert(11);
arr.insert(0);
arr.insert(66);
arr.insert(33);

arr.display();
console.log(arr.size());

let searchKey = 0;
let result = arr.find(searchKey);
if (result !== -1) {
  console.log("Found", searchKey, "at index", result);
} else {
  console.log("Can't find", searchKey);
}

arr.remove(0);
arr.remove(55);
arr.remove(99);

arr.display();
console.log(arr.size());

// pp
let arr_a = OrdArray();
arr_a.insert(77);
arr_a.insert(99);
arr_a.insert(33);
arr_a.insert(55);

let arr_b = OrdArray();
arr_b.insert(22);
arr_b.insert(44);
arr_b.insert(11);
arr_b.insert(0);
arr_b.insert(54);
arr_b.insert(98);

let arr_c = arr_a.merge(arr_b);

console.log("merge");
arr_c.display();
