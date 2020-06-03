import { HighArray } from './../array.mjs';

describe('HighArray', () => {
  it('"getMax" gets the value of the highest key', () => {
    let arr = HighArray();
    arr.setArray([77, 99, 44, 55, 22, 88, 11, 0, 66, 33]);

    expect(arr.getMax()).toBe(99);
  })

  it('"removeMax" removes the key with highest value', () => {
    let arr = HighArray();
    arr.setArray([77, 99, 44, 55, 22, 88, 11, 0, 66, 33]);

    expect(arr.removeMax()).toBe(99);
    expect(arr.getArray()).toEqual([77, 44, 55, 22, 88, 11, 0, 66, 33]);
  })

  it('"noDups" removes duplicates from the array', () => {
    let set = HighArray();
    set.setArray([7, 9, 9, 4, 5, 4, 2, 1, 1, 8, 1, 6, 3, 3]);
    set.noDups();

    expect(set.getArray()).toEqual([7, 9, 4, 5, 2, 1, 8, 6, 3]);
  });
})
