function solution(n) {
  var answer = 0;

  let count = 1n;
  let twoCnt = 0;
  const arr = Array(n).fill(1);
  let arrLen = arr.length - 1;

  while (arr[arrLen] === 1 && arr[arrLen - 1] === 1) {
    arr.pop();
    arr.pop();

    arr.splice(0, 0, 2);
    twoCnt++;
    count += BigInt(fac(arr.length) / (fac(twoCnt) * fac(arr.length - twoCnt)));
    arrLen = arr.length - 1;
  }

  answer = count % 1234567n;
  return answer;
}

function fac(num) {
  let re = 1n;

  for (let i = 2n; i < num + 1; i++) {
    re *= i;
  }

  return re;
}
