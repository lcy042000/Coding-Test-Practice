function isPalin(s) {
  const half = parseInt(s.length / 2);

  const before = s.substring(0, half);
  const after = s
    .substring(s.length % 2 === 0 ? half : half + 1)
    .split("")
    .reverse()
    .join("");

  return before === after;
}

function solution(s) {
  var answer = 0;

  const dp = Array.from(Array(s.length), () => Array(s.length).fill(false));

  for (let i = 0; i < s.length; i++) {
    dp[i][i] = true;
  }

  for (let i = s.length - 2; i >= 0; i--) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] !== s[j]) {
        continue;
      }

      if (i + 1 > j - 1) {
        dp[i][j] = true;
        answer = Math.max(answer, j - i + 1);
        continue;
      }

      if (dp[i + 1][j - 1]) {
        dp[i][j] = true;
        answer = Math.max(answer, j - i + 1);
      }
    }
  }

  if (!answer) answer++;

  return answer;
}
