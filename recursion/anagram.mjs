let count = 0;

const anagram = (word, n = word.length) => {
  const position = word.length - n;

  if (n === 1) {
    count++;
    console.log(word, count);
    return;
  }
  for (let i = position; i < word.length; i++) {
    anagram(word, n-1);
    word = before(word, position) + rotate(after(word, position));
  }
}

const before = (word, n) => word.substring(0, n)
const after = (word, n) => word.substring(n, word.length);

const rest = word => word.substring(1, word.length);

const rotate = word => {
  return rest(word) + word[0];
}

console.log(rest('cat'));

console.log(rotate('cat'));
console.log(rotate(rotate('cat')));
console.log(rotate(rotate(rotate('cat'))));
