function minMultiple(array) {
  let min = array.sort((a, b) => a - b)[0];
  const minMultipleNums = [];

  for (let i = 2; i <= min; i++) {
    if (array.every((v) => v % i === 0)) minMultipleNums.push(i);
  }

  return minMultipleNums;
}

function solution(arrayA, arrayB) {
  var answer = -Infinity;

  minMultiple(arrayA).forEach((v) => {
    if (arrayB.every((num) => num % v !== 0)) answer = Math.max(answer, v);
  });

  minMultiple(arrayB).forEach((v) => {
    if (arrayA.every((num) => num % v !== 0)) answer = Math.max(answer, v);
  });

  if (answer === -Infinity) answer = 0;

  return answer;
}
