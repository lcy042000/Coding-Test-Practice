function solution(n) {
  var answer = 0;
  let cur = n + 1;
  const bi = toBi(n);

  while (true) {
    if (toBi(cur) === bi) {
      answer = cur;
      break;
    } else {
      cur++;
    }
  }

  return answer;
}

function toBi(num) {
  let cnt = 0;

  while (num > 0) {
    if (num % 2) cnt++;

    num = parseInt(num / 2);
  }

  return cnt;
}
