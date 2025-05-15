function solution(e, starts) {
  var answer = [];

  const list = Array(e + 1).fill(0);

  for (let n = 1; n <= e; n++) {
    for (let j = n; j <= e; j += n) {
      list[j]++;
    }
  }

  const dp = Array(e + 1).fill(0);
  let max = [Infinity, -Infinity];

  for (let i = e; 0 < i; i--) {
    const cnt = list[i];

    if (max[1] < cnt) {
      max = [i, cnt];
    } else if (max[1] === cnt) {
      max[0] = i;
    }

    dp[i] = max[0];
  }

  answer = starts.map((v) => dp[v]);

  return answer;
}
