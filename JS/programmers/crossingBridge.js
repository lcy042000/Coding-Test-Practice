function solution(stones, k) {
  var answer = Infinity;

  let min = 1;
  let max = 200000000;

  while (min <= max) {
    const mid = parseInt((min + max) / 2);

    let flag = false;
    let cnt = 0;

    for (const v of stones) {
      cnt = v - mid > 0 ? 0 : cnt + 1;

      if (cnt === k) {
        flag = true;
        break;
      }
    }

    flag ? (max = mid - 1) : (min = mid + 1);
  }

  answer = min;
  return answer;
}
