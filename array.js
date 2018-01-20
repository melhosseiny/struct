function HighArray(spec = {a: [], nElems: 0}) {
  let {a,nElems} = spec;

  let setElem = function (i, v) {
    a[i] = v;
  }

  let getElem = function(i) {
    return a[i];
  }

  let insert = function(value) {
    a[nElems] = value;
    nElems++;
  }

  let find = function(searchKey) {
    let j;
    for (j = 0; j < nElems; j++) {
      if (a[j] === searchKey) {
        break;
      }
    }
    if (j === nElems) {
      return false;
    } else {
      return j;
    }
  }

  let remove = function(value) {
    let j;
    for (j = 0; j < nElems; j++) {
      if (a[j] === value) {
        break;
      }
    }
    if (j === nElems) {
      return false;
    } else {
      for (let k = j; k < nElems - 1; k++) {
        a[k] = a[k+1];
      }
      nElems--;
      return true;
    }
  }

  let display = function() {
    for (j = 0; j < nElems; j++) {
      process.stdout.write(a[j] + " ");
    }
    process.stdout.write("\n");
  }

  let getSize = function() {
    return nElems;
  }

  return Object.freeze({
    setElem,
    getElem,
    insert,
    find,
    remove,
    display,
    getSize
  });
}

let arr = HighArray();

// init array with 10 items
arr.insert(77);
arr.insert(99);
arr.insert(44);
arr.insert(55);
arr.insert(22);
arr.insert(88);
arr.insert(11);
arr.insert(00);
arr.insert(66);
arr.insert(33);

arr.display();
console.log(arr.getSize());

let searchKey = 35;
let result = arr.find(searchKey);
if (result) {
  console.log("Found", searchKey, "at index", result);
} else {
  console.log("Can't find", searchKey);
}

arr.remove(00);
arr.remove(55);
arr.remove(99);

arr.display();
console.log(arr.getSize());
