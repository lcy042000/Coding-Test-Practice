function solution(sequence, k) {
  var answer = [];

  const arr = [];
  const sums = Array(sequence.length + 1).fill(0);
  sums[1] = sequence[0];

  for (let i = 2; i <= sequence.length; i++) {
    sums[i] = sequence[i - 1] + sums[i - 1];
  }

  let pointer1 = 0;
  let pointer2 = 0;

  while (pointer1 < sums.length && pointer2 < sums.length) {
    if (sums[pointer2] - sums[pointer1] < k) {
      pointer2++;
    } else if (sums[pointer2] - sums[pointer1] === k) {
      arr.push([pointer1, pointer2 - 1]);
      pointer2++;
    } else {
      pointer1++;
    }
  }

  arr.sort((a, b) => {
    const aLen = a[1] - a[0];
    const bLen = b[1] - b[0];

    if (aLen !== bLen) {
      return aLen - bLen;
    } else {
      return a[0] - b[0];
    }
  });

  answer.push(...arr[0]);
  return answer;
}
