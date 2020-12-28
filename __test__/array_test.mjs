import { jscheck } from "@melhosseiny/icarus";
import { HighArray } from "./../array/array.mjs";

const jsc = jscheck();

jsc.claim(
  "getMax gets the value of the highest key",
  function predicate(verdict, a) {
    const arr = HighArray();
    arr.setArray(a);
    const max = arr.getMax();
    return verdict(arr.getMax() === Math.max(...a));
  },
  [
    jsc.array(10, jsc.integer(-100, 100))
  ]
);

jsc.claim(
  "removeMax removes the key with the highest value",
  function predicate(verdict, a) {
    const max_a = Math.max(...a);
    const arr = HighArray();
    arr.setArray(a);
    const max = arr.removeMax();
    return verdict(arr.getSize() === a.length - 1 && max === max_a);
  },
  [
    jsc.array(10, jsc.integer(-100, 100))
  ]
);

jsc.claim(
  "noDups removes duplicates from the array",
  function predicate(verdict, a) {
    const arr = HighArray();
    arr.setArray(a.slice());
    arr.noDups();
    return verdict(arr.getSize() === new Set(a).size);
  },
  [
    jsc.array(10, jsc.integer(-100, 100))
  ]
);

jsc.check({
  detail: 2,
  on_report: console.log
});
