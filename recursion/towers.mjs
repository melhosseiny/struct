const towers = (n, from = 'a', int = 'b', to = 'c') => {
  if (n == 1) {
    console.log(`Disk 1 from ${from} to ${to}`);
  } else {
    towers(n - 1, from, to, int);
    console.log(`Disk ${n} from ${from} to ${to}`);
    towers(n - 1, int, from, to);
  }
}

towers(3);
