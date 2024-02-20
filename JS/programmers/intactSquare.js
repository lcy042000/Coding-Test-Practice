function fcd(num1, num2) {
  if (num1 % num2 === 0) return num2;

  return fcd(num2, num1 % num2);
}

function solution(w, h) {
  var answer = 1;

  const num = w + h - fcd(w, h);

  answer = w * h - num;

  return answer;
}
