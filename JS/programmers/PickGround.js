function solution(land) {
  var answer = 0;

  const n = land.length;

  const arr = land.slice();

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 4; j++) {
      const noSameArr = arr[i - 1].slice();

      noSameArr.splice(j, 1);
      const max = Math.max(...noSameArr);

      arr[i][j] += max;
    }
  }

  answer = Math.max(...arr[n - 1]);

  return answer;
}
