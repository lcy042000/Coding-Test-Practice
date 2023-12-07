function all(arr) {
  const resultZero = [];
  const resultOne = [];

  arr.forEach((v) => resultZero.push(v.every((value) => value === 0)));
  arr.forEach((v) => resultOne.push(v.every((value) => value === 1)));

  if (resultZero.every((v) => v)) {
    return 0;
  }

  if (resultOne.every((v) => v)) {
    return 1;
  }

  return -1;
}

function solution(arr) {
  var answer = [0, 0];

  const queue = [[0, arr.length, 0, arr.length]];
  let idx = 0;

  while (queue.length > idx) {
    const [rowStart, rowEnd, colStart, colEnd] = queue[idx++];
    const S = arr
      .filter((v, i) => rowStart <= i && i < rowEnd)
      .map((v) => v.slice(colStart, colEnd));

    const result = all(S);

    if (result > -1) {
      answer[result] += 1;
    } else {
      const rowMid = parseInt((rowStart + rowEnd) / 2);
      const colMid = parseInt((colStart + colEnd) / 2);

      queue.push([rowStart, rowMid, colStart, colMid]);
      queue.push([rowStart, rowMid, colMid, colEnd]);
      queue.push([rowMid, rowEnd, colStart, colMid]);
      queue.push([rowMid, rowEnd, colMid, colEnd]);
    }
  }

  return answer;
}
