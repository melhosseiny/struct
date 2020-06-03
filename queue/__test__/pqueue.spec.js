import { PQueue } from './../pqueue.mjs';

describe('PQueue', () => {
  it('"insert" queues an item', () => {
    const q = PQueue({a: [], nElems: 5});
    q.insert(10);
    expect(q.peekMin()).toBe(10);
  });

  it('"insert" queues an item with higher priority at the front', () => {
    const q = PQueue({a: [], nElems: 5});
    q.insert(20);
    q.insert(10);
    expect(q.peekMin()).toBe(10);
  });

  it('"remove" removes the item with highest priority from the queue', () => {
    const q = PQueue({a: [], nElems: 5});
    q.insert(30);
    q.insert(50);
    q.insert(10);
    q.insert(40);
    q.insert(20);
    expect(q.remove()).toBe(10);
    expect(q.peekMin()).toBe(20);
  });

  it('"size" returns the size of the queue', () => {
    const q = PQueue({a: [], nElems: 3});
    expect(q.size()).toBe(3);
  });

  it('"isEmpty" returns true if the queue is empty', () => {
    const q = PQueue({a: [], nElems: 5});
    expect(q.isEmpty()).toBe(true);
  })

  it('"isFull" returns true if the queue is full', () => {
    const q = PQueue({a: [], nElems: 3});
    expect(q.isFull()).toBe(false);
    q.insert(20);
    q.insert(10);
    q.insert(30);
    expect(q.isFull()).toBe(true);
  })
});
