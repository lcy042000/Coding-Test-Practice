function solution(brown, yellow) {
  var answer = [];

  const factor = findFactor(yellow);
  let i = 0;
  let j = factor.length - 1;

  while (i <= j) {
    if ((factor[j] + 2) * 2 + factor[i] * 2 === brown) {
      answer = [factor[j] + 2, factor[i] + 2];
      break;
    }

    i++;
    j--;
  }

  return answer;
}

function findFactor(num) {
  const arr = [];

  for (let i = 1; i < num + 1; i++) {
    if (num % i === 0) arr.push(i);
  }

  return arr;
}
