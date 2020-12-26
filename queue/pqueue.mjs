export function PQueue(spec = {a: [], nElems: 0}) {
  let {a, nElems} = spec;

  let nItems = 0;

  let insert = function(v) {
    if (isFull()) { throw "Can't insert: queue is full" };
    if (nItems === 0) {
      a[0] = v;
    } else {
      let i;
      for (i = nItems; i > 0; i--) {
        if (a[i-1] < v) {
          a[i] = a[i-1];
        } else {
          break;
        }
      }
      a[i] = v;
    }
    nItems++;
  }

  let remove = function() {
    if (isEmpty()) { throw "Can't remove: queue is empty" };
    return a[--nItems];
  }

  let peekMin = function() {
    return a[nItems-1];
  }

  let isFull = function() {
    return nItems === nElems;
  }

  let isEmpty = function() {
    return nItems === 0;
  }

  let size = function() {
    return nElems;
  }

  // for debugging
  let display = function() {
    console.log(a, nItems);
  }

  return Object.freeze({
    insert,
    remove,
    peekMin,
    isFull,
    isEmpty,
    size
  })
}

const main = () => {
  let q = PQueue({a: [], nElems: 5});

  try {
    q.insert(30);
    q.insert(50);
    q.insert(10);
    q.insert(40);
    q.insert(20);

    while (!q.isEmpty()) {
      console.log(q.remove());
    }
  } catch (e) {
    console.log(e);
  }
}

//main();
