function solution(n) {
  var answer = 0;

  const fi = Array(n + 1).fill(0n);
  fi[0] = 0n;
  fi[1] = 1n;

  for (let i = 2; i < n + 1; i++) {
    fi[i] = fi[i - 1] + fi[i - 2];
  }

  answer = fi[n] % 1234567n;

  return answer;
}
