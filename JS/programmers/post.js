function solution(cap, n, deliveries, pickups) {
  var answer = 0;

  const dArr = deliveries.slice();
  const pArr = pickups.slice();

  const deleteLastZero = () => {
    while (dArr.length && !dArr[dArr.length - 1]) dArr.pop();
    while (pArr.length && !pArr[pArr.length - 1]) pArr.pop();
  };

  const dnp = (arr) => {
    let cnt = cap;

    for (let i = arr.length - 1; i > -1; i--) {
      if (arr[i] <= cnt) {
        cnt -= arr[i];
        arr[i] = 0;

        if (!cnt) break;
      } else {
        arr[i] -= cnt;
        cnt = 0;
        return;
      }
    }
  };

  while (dArr.length || pArr.length) {
    deleteLastZero();
    answer += Math.max(dArr.length, pArr.length) * 2;
    dnp(dArr);
    dnp(pArr);
  }

  return answer;
}
