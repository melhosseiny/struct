const mountainClimbers = ['a','b','c','d','e'];

const showTeams = (sequence, n, k) => {
  if (k === 0) {
    console.log(sequence);
  }

  if (n === 0 || k === 0 || k > n) {
    return;
  }

  showTeams(sequence + mountainClimbers[mountainClimbers.length-n], n-1, k-1);
  showTeams(sequence, n-1, k);
}

showTeams('',5,3);
