function solution(target) {
  var answer = [];

  const dp = Array.from(Array(target + 1), () => [Infinity, 0]);

  for (let num = 1; num < target + 1; num++) {
    if (num < 21) {
      dp[num][0] = 1;
      dp[num][1] = 1;

      continue;
    } else if (num <= 60 && num % 3 === 0) {
      dp[num][0] = 1;
      dp[num][1] = 0;

      continue;
    } else if (num <= 40 && num % 2 === 0) {
      dp[num][0] = 1;
      dp[num][1] = 0;

      continue;
    } else if (num === 50) {
      dp[num][0] = 1;
      dp[num][1] = 1;

      continue;
    }

    for (let j = 1; j <= 20; j++) {
      for (let k = 1; k <= 3; k++) {
        if (num < j * k) break;

        const acc = dp[num - j * k],
          cur = dp[j * k];
        const cnt = dp[num][0],
          sob = dp[num][1];

        if (
          acc[0] + cur[0] < cnt ||
          (acc[0] + cur[0] === cnt && acc[1] + cur[1] > sob)
        ) {
          dp[num] = [acc[0] + cur[0], acc[1] + cur[1]];

          continue;
        }
      }
    }

    if (50 < num) {
      const acc = dp[num - 50],
        cur = dp[50];
      const cnt = dp[num][0],
        sob = dp[num][1];

      if (
        acc[0] + cur[0] < cnt ||
        (acc[0] + cur[0] === cnt && acc[1] + cur[1] > sob)
      ) {
        dp[num] = [acc[0] + cur[0], acc[1] + cur[1]];

        continue;
      }
    }
  }

  return dp[target];
}
