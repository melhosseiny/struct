import { Queue } from './../queue.mjs';

describe('Queue', () => {
  it('"insert" queues an item', () => {
    const q = Queue({a: [], nElems: 5});
    q.insert(10);
    expect(q.peekFront()).toBe(10);
  });

  it('"remove" removes an item from the queue', () => {
    const q = Queue({a: [], nElems: 5});
    q.insert(10);
    q.insert(20);
    expect(q.peekFront()).toBe(10);
    q.remove();
    expect(q.peekFront()).toBe(20);
  });

  it('"size" returns the size of the queue', () => {
    const q = Queue({a: [], nElems: 3});
    expect(q.size()).toBe(3);
  });

  it('"isEmpty" returns true if the queue is empty', () => {
    const q = Queue({a: [], nElems: 5});
    expect(q.isEmpty()).toBe(true);
  })

  it('"isFull" returns true if the queue is full', () => {
    const q = Queue({a: [], nElems: 3});
    expect(q.isFull()).toBe(false);
    q.insert(10);
    q.insert(20);
    q.insert(30);
    expect(q.isFull()).toBe(true);
  })
});
