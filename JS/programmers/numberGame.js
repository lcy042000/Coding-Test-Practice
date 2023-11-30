function solution(A, B) {
  var answer = 0;

  const listA = A.sort((a, b) => a - b);
  const listB = B.sort((a, b) => a - b);
  let idx = 0;

  for (const a of listA) {
    while (a >= listB[idx]) {
      idx++;
    }

    if (idx >= listB.length) break;

    if (a < listB[idx]) {
      answer++;
      idx++;
    }
  }

  return answer;
}
