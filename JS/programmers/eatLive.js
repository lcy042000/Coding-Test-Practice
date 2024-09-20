function solution(food_times, k) {
  var answer = 0;

  if (food_times.reduce((acc, cur) => (acc += cur), 0) <= k) return -1;

  const arr = food_times.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  let prev = 0;
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const curTime = arr[i][0];
    const remain = len - i;
    const eatTime = (curTime - prev) * remain;
    prev = curTime;

    if (k < eatTime) {
      const nArr = arr.slice(i).sort((a, b) => a[1] - b[1]);

      return nArr[k % remain][1] + 1;
    }

    k -= eatTime;
  }

  return answer;
}
