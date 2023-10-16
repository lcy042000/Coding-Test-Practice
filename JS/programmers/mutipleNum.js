function solution(arr) {
  var answer = 0;

  arr = arr.filter((v) => v > 1);
  arr.sort((a, b) => b - a);
  const num = arr.reduce((cur, v) => (cur *= v), 1);

  for (let i = arr[0]; i <= num; i++) {
    let isOk = true;

    for (let j = 0; j < arr.length; j++) {
      if (i % arr[j] !== 0) {
        isOk = false;
        break;
      }
    }

    if (isOk) {
      answer = i;
      break;
    }
  }

  return answer;
}
