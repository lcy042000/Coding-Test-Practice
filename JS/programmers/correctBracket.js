function solution(n) {
  var answer = 0;

  const dp = Array(n + 1).fill(0);

  dp[0] = dp[1] = 1;

  for (let i = 2; i < n + 1; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j];
    }
  }

  return dp[n];
}
