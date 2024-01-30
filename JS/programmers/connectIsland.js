function getParent(parentArr, point) {
  if (parentArr[point] === point) return point;
  return (parentArr[point] = getParent(parentArr, parentArr[point]));
}

function setParent(parentArr, a, b) {
  const parentA = getParent(parentArr, a);
  const parentB = getParent(parentArr, b);

  if (parentA < parentB) return (parentArr[parentB] = parentA);
  return (parentArr[parentA] = parentB);
}

function solution(n, costs) {
  var answer = 0;

  let parentArr = Array(n)
    .fill()
    .map((v, i) => i);

  costs.sort((a, b) => (a[2] === b[2] ? a[0] - b[0] : a[2] - b[2]));

  for (const cost of costs) {
    if (getParent(parentArr, cost[0]) !== getParent(parentArr, cost[1])) {
      answer += cost[2];
      setParent(parentArr, cost[0], cost[1]);
    }
  }

  return answer;
}
