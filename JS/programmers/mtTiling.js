function solution(n, tops) {
  var answer = 0;

  const dp = Array.from(Array(n), () => Array(2).fill(0));

  dp[0][0] = tops[0] ? 3 : 2;
  dp[0][1] = 1;

  for (let i = 1; i < n; i++) {
    const mul = tops[i] ? 3 : 2;

    dp[i][0] = (dp[i - 1][0] * mul + dp[i - 1][1] * (mul - 1)) % 10007;
    dp[i][1] = dp[i - 1][0] + dp[i - 1][1];
  }

  return (dp[n - 1][0] + dp[n - 1][1]) % 10007;
}
