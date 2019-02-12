function Person(spec) {
  let {lastName,firstName,age} = spec;

  let display = function() {
    console.log("Last name:", lastName,
      ", firstName:", firstName,
      ", Age:", age);
  }

  let getAge = function() {
    return age;
  }

  let getLast = function() {
    return lastName;
  }

  return Object.freeze({
    display,
    getAge,
    getLast
  });
}

function DataArray(spec = {a: [], nElems: 0}) {
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
      if (a[j].getLast() === searchKey) {
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
      if (a[j].getLast() === value) {
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

  let insertSort = function() {
    let temp;

    for (let i = 1; i < nElems; i++) {
      temp = a[i];
      let j = i;
      for (j = i; j > 0; j--) {
        if (a[j-1].getAge() < temp.getAge()) { break; }
        else { a[j] = a[j-1]; }
      }
      a[j] = temp;
    }
  }

  let display = function() {
    for (j = 0; j < nElems; j++) {
      a[j].display();
    }
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
    insertSort,
    display,
    getSize
  });
}

let arr = DataArray();

arr.insert(Person({lastName: "Evans", firstName: "Patty", age: 24}));
arr.insert(Person({lastName: "Smith", firstName: "Lorraine", age: 37}));
arr.insert(Person({lastName: "Yee", firstName: "Tom", age: 43}));
arr.insert(Person({lastName: "Adams", firstName: "Henry", age: 63}));
arr.insert(Person({lastName: "Hashimoto", firstName: "Sato", age: 21}));
arr.insert(Person({lastName: "Stimson", firstName: "Henry", age: 29}));
arr.insert(Person({lastName: "Velasquez", firstName: "Jose", age: 72}));
arr.insert(Person({lastName: "Lamarque", firstName: "Henry", age: 54}));
arr.insert(Person({lastName: "Vang", firstName: "Minh", age: 22}));
arr.insert(Person({lastName: "Creswell", firstName: "Lucinda", age: 18}));

arr.display();
console.log(arr.getSize())

let searchKey = "Stimson";
let result = arr.find(searchKey);
if (result) {
  console.log("Found", searchKey, "at index", result);
} else {
  console.log("Can't find", searchKey);
}

arr.remove("Smith");
arr.remove("Yee");
arr.remove("Creswell");

arr.display();
console.log(arr.getSize());

arr.insertSort();
arr.display();
