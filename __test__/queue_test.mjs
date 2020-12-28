import { jscheck } from "@melhosseiny/icarus";
import { Queue } from "./../queue/queue.mjs";

const jsc = jscheck();

jsc.claim(
  "insert queues an item",
  function predicate(verdict, a) {
    const q = Queue({a: [], nElems: 5});
    q.insert(a);
    return verdict(q.peekFront() === a);
  },
  [
    jsc.integer(-100, 100)
  ]
);

jsc.claim(
  "remove removes an item from the queue",
  function predicate(verdict, a, b) {
    const q = Queue({a: [], nElems: 5});
    q.insert(a);
    q.insert(b);
    q.remove();
    return verdict(q.peekFront() === b);
  },
  [
    jsc.integer(-100, 100),
    jsc.integer(-100, 100)
  ]
);

jsc.claim(
  "size returns the size of the queue",
  function predicate(verdict, a) {
    const q = Queue({a: [], nElems: a});
    return verdict(q.size() === a);
  },
  [
    jsc.integer(10)
  ]
);

jsc.claim(
  "isEmpty returns true if the queue is empty",
  function predicate(verdict) {
    const q = Queue({a: [], nElems: 5});
    return verdict(q.isEmpty() === true);
  },
  []
);

jsc.claim(
  "isFull returns true if the queue is full",
  function predicate(verdict, items) {
    const q = Queue({a: [], nElems: items.length});
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
