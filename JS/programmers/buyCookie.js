function solution(cookie) {
  var answer = 0;

  if (cookie.length === 1) return 0;
  if (cookie.length === 2) {
    return cookie[0] === cookie[1] ? cookie[0] : 0;
  }

  const arr = Array(cookie.length + 1).fill(0);

  cookie.forEach((v, i) => {
    arr[i + 1] = arr[i] + v;
  });

  const len = cookie.length;

  for (let m = 0; m < len - 1; m++) {
    let left = m,
      right = m + 1;

    while (left >= 0 && right < len) {
      const leftSum = arr[m + 1] - arr[left];
      const rightSum = arr[right + 1] - arr[m + 1];

      if (leftSum === rightSum) {
        answer = Math.max(answer, leftSum);
        left--;
        right++;
      } else if (leftSum < rightSum) {
        left--;
      } else {
        right++;
      }
    }
  }

  return answer;
}
