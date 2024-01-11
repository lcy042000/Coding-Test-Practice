function solution(storey) {
  var answer = 0;

  let num = storey;
  const numArr = [];

  while (num > 0) {
    numArr.push(num % 10);
    num = parseInt(num / 10);
  }

  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] > 5) {
      answer += 10 - numArr[i];
      numArr[i] = 0;

      if (i + 1 < numArr.length) {
        numArr[i + 1] += 1;
      } else numArr.push(1);
    } else if (numArr[i] === 5 && i < numArr.length - 1) {
      if (numArr[i + 1] >= 5) {
        answer += 10 - numArr[i];
        numArr[i] = 0;
        numArr[i + 1] += 1;
      } else continue;
    } else continue;
  }

  numArr.reverse();

  for (let i = 0; i < numArr.length; i++) {
    answer += numArr[i];
  }

  return answer;
}
