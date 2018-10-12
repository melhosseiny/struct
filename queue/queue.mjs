export function Queue(spec = {a: [], nElems: 0}) {
  let {a, nElems} = spec;

  let front = 0;
  let rear = -1;
  let nItems = 0;

  let insert = function(v) {
    if (isFull()) { throw "Can't insert: queue is full" };
    if (rear === nElems-1) { rear = -1; }
    a[++rear] = v;
    nItems++;
  }

  let remove = function() {
    if (isEmpty()) { throw "Can't remove: queue is empty" };
    let temp = a[front++];
    if (front === nElems) { front = 0; }
    nItems--;
    return temp;
  }

  let peekFront = function() {
    return a[front];
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
    console.log(a, front, rear);
  }

  return Object.freeze({
    insert,
    remove,
    peekFront,
    isFull,
    isEmpty,
    size
  })
}

let q = Queue({a: [], nElems: 5});

try {
  q.insert(10);
  q.insert(20);
  q.insert(30);
  q.insert(40);

  q.remove();
  q.remove();
  q.remove();

  q.insert(50);
  q.insert(60);
  q.insert(70);
  q.insert(80);

  while (!q.isEmpty()) {
    console.log(q.remove());
  }
} catch (e) {
  console.log(e);
}
