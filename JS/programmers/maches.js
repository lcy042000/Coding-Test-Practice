function solution(n, a, b) {
  var answer = 0;
  const game = Math.log2(n);
  let cnt = 0;
  let min = 0;
  let max = n;

  while (isHave(min, max, a, b)) {
    cnt++;
    if (min <= a && a <= parseInt((min + max) / 2)) {
      max = parseInt((min + max) / 2);
    } else {
      min = parseInt((min + max) / 2) + 1;
    }
  }

  answer = game - (cnt - 1);
  return answer;
}

function isHave(min, max, a, b) {
  if (min <= a && min <= b && a <= max && b <= max) return true;
  else return false;
}
