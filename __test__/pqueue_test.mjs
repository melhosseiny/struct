import { jscheck } from "@melhosseiny/icarus";
import { PQueue } from "./../queue/pqueue.mjs";

const jsc = jscheck();

jsc.claim(
  "insert queues an item with higher priority at the front",
  function predicate(verdict, a, b, size) {
    const q = PQueue({a: [], nElems: size});
    q.insert(a);
    q.insert(b);
    return verdict(a < b? q.peekMin() === a : q.peekMin() === b);
  },
  [
    jsc.integer(-100, 100),
    jsc.integer(100),
    jsc.integer(3, 5)
  ]
);

jsc.claim(
  "remove removes the item with highest priority from the queue",
  function predicate(verdict, items) {
    const q = PQueue({a: [], nElems: items.length});
    items.forEach(item => q.insert(item));
    const min = q.peekMin();
    return verdict(q.remove() === min);
  },
  [
    jsc.array(5, jsc.integer(-100, 100))
  ]
);

jsc.claim(
  "size returns the size of the queue",
  function predicate(verdict, a) {
    const q = PQueue({a: [], nElems: a});
    return verdict(q.size() === a);
  },
  [
    jsc.integer(10)
  ]
);

jsc.claim(
  "isEmpty returns true if the queue is empty",
  function predicate(verdict) {
    const q = PQueue({a: [], nElems: 5});
    return verdict(q.isEmpty() === true);
  },
  []
);

jsc.claim(
  "isFull returns true if the queue is full",
  function predicate(verdict, items) {
    const q = PQueue({a: [], nElems: items.length});
    items.forEach(item => q.insert(item))
    return verdict(q.isFull() === true);
  },
  [
    jsc.array(3, jsc.integer(-100, 100))
  ]
);

jsc.check({
  detail: 2,
  on_report: console.log
});
