function sum(arr, from, to) {
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    if (from <= i || i <= to) {
      result += arr[i];
    }
  }

  return result;
}

function solution(queue1, queue2) {
  var answer = -2;

  const sum1 = queue1.reduce((acc, cur) => (acc += BigInt(cur)), 0n);
  const sum2 = queue2.reduce((acc, cur) => (acc += BigInt(cur)), 0n);
  const result = (sum1 + sum2) / 2n;

  if (sum1 === sum2) return 0;

  const arr = [...queue1.map(BigInt), ...queue2.map(BigInt)];
  const sum = Array(arr.length).fill(0n);
  sum[0] = arr[0];

  for (let i = 1; i < arr.length; i++) {
    sum[i] = sum[i - 1] + arr[i];
  }

  let pointer1 = -1;
  let pointer2 = queue1.length - 1;
  let cnt = 0;

  while (true) {
    cnt++;

    if (pointer1 < 0) {
      if (sum[pointer2] === result) break;
      else if (sum[pointer2] < result) pointer2++;
      else pointer1++;
    } else {
      if (sum[pointer2] - sum[pointer1] === result) break;
      else if (sum[pointer2] - sum[pointer1] < result) pointer2++;
      else pointer1++;
    }

    if (pointer2 === pointer1 || pointer2 >= sum.length) return -1;
  }

  answer = cnt - 1;
  return answer;
}
