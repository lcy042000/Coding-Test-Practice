function solution(n) {
  var answer = "";
  const arr = [1, 2, 4];

  let num = n;

  while (num > 0) {
    let idx = (num - 1) % 3;
    answer = arr[idx] + answer;
    num = Math.floor((num - 1) / 3);
  }

  return answer;
}
