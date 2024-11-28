function solution(alp, cop, problems) {
  var answer = 0;

  const sortedPb = problems.sort((a, b) => {
    return (a[2] + a[3]) / a[4] - (b[2] + b[3]) / b[4];
  });

  const maxAlp = problems.reduce(
    (acc, cur) => (acc < cur[0] ? cur[0] : acc),
    0
  );
  const maxCop = problems.reduce(
    (acc, cur) => (acc < cur[1] ? cur[1] : acc),
    0
  );

  const dp = Array.from(Array(maxAlp + 1), () =>
    Array(maxCop + 1).fill(Infinity)
  );

  if (alp > maxAlp) alp = maxAlp;
  if (cop > maxCop) cop = maxCop;

  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    for (let j = cop; j <= maxCop; j++) {
      if (i === maxAlp && j === maxCop) break;

      if (i < maxAlp) {
        dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
      }

      if (j < maxCop) {
        dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);
      }

      for (const [alp_req, cop_req, alp_rwd, cop_rwd, cost] of sortedPb) {
        if (i < alp_req || j < cop_req) continue;

        const sumAlp = i + alp_rwd;
        const sumCop = j + cop_rwd;

        if (maxAlp <= sumAlp && maxCop <= sumCop) {
          dp[maxAlp][maxCop] = Math.min(dp[maxAlp][maxCop], dp[i][j] + cost);
        } else if (maxAlp < sumAlp) {
          dp[maxAlp][sumCop] = Math.min(dp[maxAlp][sumCop], dp[i][j] + cost);
        } else if (maxCop < sumCop) {
          dp[sumAlp][maxCop] = Math.min(dp[sumAlp][maxCop], dp[i][j] + cost);
        } else {
          dp[sumAlp][sumCop] = Math.min(dp[sumAlp][sumCop], dp[i][j] + cost);
        }
      }
    }
  }

  return dp[maxAlp][maxCop];
}
