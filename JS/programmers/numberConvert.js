function solution(x, y, n) {
  var answer = 0;
  const dp = Array(y + 1).fill(-1);

  dp[x] = 0;

  for (let i = 0; i < y; i++) {
    if (dp[i] === -1) continue;

    if (i + n <= y) {
      if (dp[i + n] === -1) dp[i + n] = dp[i] + 1;
      else dp[i + n] = Math.min(dp[i + n], dp[i] + 1);
    }

    if (i * 2 <= y) {
      if (dp[i * 2] === -1) dp[i * 2] = dp[i] + 1;
      else dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
    }

    if (i * 3 <= y) {
      if (dp[i * 3] === -1) dp[i * 3] = dp[i] + 1;
      else dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
    }
  }

  return dp[y];
}
