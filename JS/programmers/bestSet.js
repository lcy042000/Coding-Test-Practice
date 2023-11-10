function solution(n, s) {
  var answer = [];

  const value = parseInt(s / n);

  if (value === 0) return [-1];

  if (s % n === 0) return Array(n).fill(value);

  const arr = Array(n).fill(value);
  const sum = arr.reduce((acc, cur) => (acc += cur), 0);

  if (sum !== s) {
    const gap = s - sum;

    for (let i = arr.length - 1; i >= arr.length - gap; i--) {
      arr[i] += 1;
    }
  }

  return arr;
}

function reduce(arr, idx) {
  let sum = 0;

  for (let i = idx; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}
