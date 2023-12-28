function solution(sticker) {
  var answer = 0;
  const n = sticker.length + 2;
  const dp1 = Array(n).fill(0);
  const dp2 = Array(n).fill(0);

  if (sticker.length === 1) return sticker[0];

  for (let i = 2; i < n - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + sticker[i - 2]);
  }

  for (let i = 3; i < n; i++) {
    dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + sticker[i - 2]);
  }

  answer = Math.max(dp1[n - 2], dp2[n - 1]);
  return answer;
}
