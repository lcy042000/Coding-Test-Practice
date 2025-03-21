function solution(matrix_sizes) {
  const n = matrix_sizes.length;
  const dp = Array.from(Array(n), () => Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) {
    dp[i][i] = 0;
  }

  for (let type = 1; type < n; type++) {
    for (let start = 0; start < n; start++) {
      const end = start + type;

      if (n <= end) break;

      for (let c = start; c < end; c++) {
        dp[start][end] = Math.min(
          dp[start][end],
          dp[start][c] +
            dp[c + 1][end] +
            matrix_sizes[start][0] *
              matrix_sizes[c + 1][0] *
              matrix_sizes[end][1]
        );
      }
    }
  }

  return dp[0][n - 1];
}
