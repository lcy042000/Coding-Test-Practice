function solution(a) {
  var answer = 0;

  let m1Idx = 0,
    m2Idx = a.length - 1;
  let m1 = a[m1Idx],
    m2 = a[m2Idx];

  while (m1Idx < m2Idx) {
    if (m1 > m2) {
      if (m1 > a[++m1Idx]) {
        answer++;
        m1 = a[m1Idx];
      }
    } else {
      if (m2 > a[--m2Idx]) {
        answer++;
        m2 = a[m2Idx];
      }
    }
  }

  return answer + 1;
}
