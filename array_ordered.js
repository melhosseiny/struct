function OrdArray(spec = {a: [], nElems: 0}) {
  let {a,nElems} = spec;

  let setElem = function (i, v) {
    a[i] = v;
  }

  let getElem = function(i) {
    return a[i];
  }

  let insert = function(value) {
    let j;
    for (j = 0; j < nElems; j++) {
      if (a[j] > value) {
        break;
      }
    }
    for (let k = nElems; k > j; k--) {
      a[k] = a[k-1];
    }
    a[j] = value;
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
    for (j = 0; j < nElems; j++) {
      process.stdout.write(a[j] + " ");
    }
    process.stdout.write("\n");
  }

  let size = function() {
    return nElems;
  }

  return Object.freeze({
    setElem,
    getElem,
    insert,
    find,
    remove,
    display,
    size
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
