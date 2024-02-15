const result = [];
function hanoi(n, from, to, assi) {
  if (n === 1) {
    result.push([from, to]);
    return;
  }

  hanoi(n - 1, from, assi, to);
  result.push([from, to]);
  hanoi(n - 1, assi, to, from);
}

function solution(n) {
  hanoi(n, 1, 3, 2);

  return result;
}
