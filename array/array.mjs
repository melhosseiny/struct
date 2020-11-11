import util from 'util';

export function HighArray(spec = {a: [], nElems: 0}) {
  let {a,nElems} = spec;

  let setElem = function (i, v) {
    a[i] = v;
  }

  let getElem = function(i) {
    return a[i];
  }

  let getArray = function() {
    a.splice(nElems, a.length);
    return a;
  }

  let setArray = function(array) {
    a = array;
    nElems = a.length;
  }

  let insert = function(value) {
    a[nElems] = value;
    nElems++;
  }

  let find = function(key) {
    let j;
    for (j = 0; j < nElems; j++) {
      if (equal(a[j], key)) {
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
      if (equal(a[j], value)) {
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

  let bubbleSort = function(compare = defaultCompare) {
    for (let i = nElems - 1; i > 1; i--) {
      for (let j = 0; j < i; j++) {
        if (compare(a[j], a[j+1]) === 1) {
          swap(j,j+1);
        }
      }
    }
  }

  let selectSort = function(compare = defaultCompare) {
    let min;

    for (let i = 0; i < nElems-1; i++) {
      min = i;
      for (let j = i+1; j < nElems; j++) {
        if (compare(a[j], a[min]) === -1) {
          min = j;
        }
      }
      swap(i,min);
    }
  }

  let hSort = function(h, compare) {
    let temp;

    for (let i = h; i < nElems; i++) {
      temp = a[i];
      let j = i;
      for (j = i; j > h - 1; j -= h) {
        if (compare(a[j-h], temp) === -1) { break; }
        else { a[j] = a[j-h]; }
      }
      a[j] = temp;
    }
  }

  let insertSort = function(compare = defaultCompare) {
    hSort(1, compare);
  }

  let shellSort = function(compare = defaultCompare) {
    let h = 1;
    while (h <= nElems / 3) {
      h = h*3 + 1; // knuth interval sequence
    }
    while (h > 0) {
      hSort(h, compare);
      h = (h - 1) / 3;
    }
  }

  let listInsertSort = async function() {
    const {SortedList} = await import('../list/list_sorted.mjs');

    let list = SortedList();
    for (let i = 0; i < nElems; i++) {
      list.insert(a[i]);
    }

    for (let i = 0; i < nElems; i++) {
      a[i] = list.remove().getData();
    }
  }

  let recMergeSort = function(workspace = [], l = 0, u = nElems - 1) {
    if (l === u) {
      return;
    } else {
      const m = Math.floor((l+u)/2);

      recMergeSort(workspace, l, m);
      recMergeSort(workspace, m+1, u);

      // merge
      let [i, j, k] = [l, m + 1, 0];

      while (i <= m && j <= u) {
        workspace[k++] = a[i] < a[j] ? a[i++] : a[j++];
      }
      while (i <= m) { workspace[k++] = a[i++]; }
      while (j <= u) { workspace[k++] = a[j++]; }

      // write workspace to a
      for (k = 0; k < u - l + 1; k++) {
        a[l+k] = workspace[k];
      }
    }
  }

  let recQuickSort = function(left = 0, right = a.length - 1) {
    if (right - left <= 0) {
      return;
    } else {
      const part = partition(a[right], left, right - 1);
      swap(right, part);
      recQuickSort(left, part - 1);
      recQuickSort(part + 1, right);
    }
  }

  let recQuickSort2 = function(left = 0, right = a.length - 1) {
    if (right - left + 1 <= 3) {
      manualSort(left, right);
    } else {
      const part = partition(medianOf3(left, right), left, right - 2);
      swap(right - 1, part);
      recQuickSort(left, part - 1);
      recQuickSort(part + 1, right);
    }
  }

  let equal = function(a, b) {
    if (typeof b === 'object') {
      const entries = Object.entries(b);
      const prop = entries[0][0];
      const value = entries[0][1];
      return a[prop] === value;
    } else {
      return a === b;
    }
  }

  let defaultCompare = function(a, b) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  let swap = function(one,two) {
    let temp = a[two];
    a[two] = a[one];
    a[one] = temp;
  }

  let partition = function(pivot, left = 0, right = a.length - 1) {
    let leftPtr = left - 1;
    let rightPtr = right + 1;

    while (leftPtr < rightPtr) {
      while (leftPtr < rightPtr && a[++leftPtr] < pivot) {}
      while (rightPtr > leftPtr && a[--rightPtr] > pivot) {}
      swap(leftPtr, rightPtr);
    }

    return leftPtr;
  }

  let medianOf3 = function(left = 0, right = a.length - 1) {
    const center = Math.floor((left + right) / 2);

    if (a[left] > a[center]) { swap(left, center); }
    if (a[left] > a[right]) { swap(left, right); }
    if (a[center] > a[right]) { swap(center, right); }

    swap(center, right - 1);

    return a[right - 1];
  }

  let manualSort = function(left, right) {
    const size = right - left + 1;

    if (size <= 1) {
      return;
    } else if (size === 2) {
      if (a[left] > a[right]) { swap(left, right); }
    } else {
      if (a[left] > a[right - 1]) { swap(left, right - 1); }
      if (a[left] > a[right]) { swap(left, right); }
      if (a[right - 1] > a[right]) { swap(right - 1, right); }
    }
  }

  let display = function() {
    //console.log(a);
    for (let j = 0; j < nElems; j++) {
      process.stdout.write(util.format('%j', a[j]));
      process.stdout.write(typeof a[j] === 'object' || j === nElems - 1 ? '\n' : ' ');
    }
  }

  let getSize = function() {
    return nElems;
  }

  // pp 2.1: assume positive items
  let getMax = function(compare = defaultCompare) {
    let max = a[0];

    for (let i = 0; i < nElems; i++) {
      if (compare(a[i], max) === 1) {
        max = a[i];
      }
    }

    return max;
  }

  // pp 2.3
  let removeMax = function(compare = defaultCompare) {
    let maxIndex = 0;

    for (let i = 0; i < nElems; i++) {
      if (compare(a[i], a[maxIndex]) === 1) {
        maxIndex = i;
      }
    }

    let max = a[maxIndex];

    for (let j = maxIndex; j < nElems - 1; j++) {
      a[j] = a[j+1];
    }
    nElems--;

    return max;
  }

  // pp 2.6
  let noDups = function() {
    for (let i = 0; i < nElems; i++) {
      for(let j = 0; j < nElems; j++) {
        if (i === j) {
          continue;
        }
        if (a[i] === a[j]) {
          a[j] = undefined;
        }
      }
    }

    let lastSwapped = 0;

    for (let i = 0; i < nElems; i++) {
      if (a[i] === undefined) {
        let j = i + 1;
        while (a[j] === undefined) {
          if (j === nElems) {
            break;
          }
          j++;
        }
        if (j < nElems) {
          swap(i, j);
          lastSwapped = i;
        }
      }
    }

    nElems = lastSwapped + 1;
  }

  return Object.freeze({
    getElem,
    setElem,
    getArray,
    setArray,
    insert,
    find,
    remove,
    bubbleSort,
    selectSort,
    insertSort,
    shellSort,
    listInsertSort,
    recMergeSort,
    recQuickSort,
    recQuickSort2,
    display,
    getSize,
    // pp
    getMax,
    removeMax,
    noDups
  });
}

const main = async () => {
  let arr = HighArray();

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
  console.log(arr.getSize());

  let key = 33;
  let result = arr.find(key);
  if (result) {
    console.log("Found", key, "at index", result);
  } else {
    console.log("Can't find", key);
  }

  arr.remove(0);
  arr.remove(55);
  arr.remove(99);

  arr.display();
  console.log(arr.getSize());

  console.log("Sorted array:");
  //arr.bubbleSort();
  //arr.selectSort();
  arr.insertSort();
  //arr.shellSort();
  //await arr.listInsertSort();
  //arr.recMergeSort();
  //arr.recQuickSort2();
  arr.display();

  // pp 2.3
  let arr2 = HighArray();

  arr2.insert(77);
  arr2.insert(99);
  arr2.insert(44);
  arr2.insert(55);
  arr2.insert(22);
  arr2.insert(88);
  arr2.insert(11);
  arr2.insert(0);
  arr2.insert(66);
  arr2.insert(33);

  arr2.display();

  let crudelySortedArr = HighArray();

  while (arr2.getSize() !== 0) {
    crudelySortedArr.insert(arr2.removeMax());
  }

  crudelySortedArr.display();

  // object data
  let people = HighArray();

  people.insert({lastName: "Evans", firstName: "Patty", age: 24});
  people.insert({lastName: "Smith", firstName: "Lorraine", age: 37});
  people.insert({lastName: "Yee", firstName: "Tom", age: 43});
  people.insert({lastName: "Adams", firstName: "Henry", age: 63});
  people.insert({lastName: "Hashimoto", firstName: "Sato", age: 21});
  people.insert({lastName: "Stimson", firstName: "Henry", age: 29});
  people.insert({lastName: "Velasquez", firstName: "Jose", age: 72});
  people.insert({lastName: "Lamarque", firstName: "Henry", age: 54});
  people.insert({lastName: "Vang", firstName: "Minh", age: 22});
  people.insert({lastName: "Creswell", firstName: "Lucinda", age: 18});

  people.display();

  let resultIndex = people.find({ lastName: "Stimson" });
  if (resultIndex) {
    console.log("Found at index", resultIndex);
  } else {
    console.log("Can't find key");
  }

  people.remove({ lastName: "Smith" });
  people.remove({ lastName: "Yee" });
  people.remove({ lastName: "Creswell" });

  people.display();
  console.log(people.getSize());

  const comparePeopleByAge = (a, b) => a.age < b.age ? -1 : (a.age > b.age ? 1 : 0);

  people.insertSort(comparePeopleByAge);
  people.display();
}

//main();
