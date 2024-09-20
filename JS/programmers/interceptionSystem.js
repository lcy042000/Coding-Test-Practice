function solution(targets) {
  var answer = 1;

  targets.sort((a, b) => {
    if (a[0] === b[0]) return b[1] - a[1];
    else return b[0] - a[0];
  });

  let cur = targets[0][0];

  for (let i = 1; i < targets.length; i++) {
    const [s, e] = targets[i];

    if (e <= cur) {
      cur = s;
      answer++;
    }
  }

  return answer;
}
