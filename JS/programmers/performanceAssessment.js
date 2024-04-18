function solution(scores) {
  var answer = 0;

  const wanho = scores[0];
  const bTW = scores
    .slice(1)
    .filter((v) => v[0] + v[1] > wanho[0] + wanho[1])
    .sort((a, b) => {
      if (a[0] === b[0]) return b[1] - a[1];

      return b[0] - a[0];
    });

  for (let i = 0; i < bTW.length; i++) {
    const score = bTW[i];

    if (score[0] > wanho[0] && score[1] > wanho[1]) return -1;

    for (let j = 0; j < i; j++) {
      if (!bTW[j]) continue;

      if (bTW[j][0] > score[0] && bTW[j][1] > score[1]) bTW[i] = undefined;
    }
  }

  answer = bTW.filter((v) => v !== undefined).length + 1;
  return answer;
}
