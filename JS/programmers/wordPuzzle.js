function solution(strs, t) {
  var answer = 0;

  const dp = Array(t.length + 1).fill(Infinity);

  for (let i = 0; i < t.length; i++) {
    const curStr = t.slice(0, i + 1);

    for (const str of strs) {
      if (!curStr.endsWith(str)) continue;

      const diff = curStr.length - str.length;

      if (diff === 0) {
        dp[i + 1] = 1;
        break;
      }

      dp[i + 1] = Math.min(dp[i + 1], dp[diff] + 1);
    }
  }

  return dp[t.length] === Infinity ? -1 : dp[t.length];
}
