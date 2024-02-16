function solution(n, times) {
  var answer = 0;

  let start = 1n;
  let end = BigInt(Math.max(...times)) * BigInt(n);

  while (start <= end) {
    const mid = BigInt(parseInt((start + end) / 2n));

    const sum = times.reduce(
      (acc, cur) => acc + BigInt(parseInt(mid / BigInt(cur))),
      0n
    );

    if (sum < n) {
      start = mid + 1n;
    } else {
      end = mid - 1n;
    }
  }

  answer = parseInt(start);

  return answer;
}
