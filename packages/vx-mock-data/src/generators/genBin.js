const defaultCount = (i, n) => {
  return Math.random() * (25 * (n - i));
};

const defaultBin = i => {
  return i * 150;
};

export default function genBin(n, bin = defaultBin, count = defaultCount) {
  return new Array(n).fill(1).reduce((data, d, i) => {
    return data.concat([
      {
        bin: bin(i, n),
        count: count(i, n),
      },
    ]);
  }, []);
}
