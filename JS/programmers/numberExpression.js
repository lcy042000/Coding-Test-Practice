function solution(n) {
  var answer = 0;

  const dp = Array(n + 1).fill(0);

  for (let i = 1; i < n + 1; i++) {
    dp[i] = dp[i - 1] + i;
  }

  for (let i = n; i > 0; i--) {
    for (let j = i - 1; j > -1; j--) {
      if (dp[i] - dp[j] === n) {
        answer++;
        break;
      } else if (dp[i] - dp[j] > n) break;
    }
  }

  return answer;
}
