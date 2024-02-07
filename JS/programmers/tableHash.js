function solution(data, col, row_begin, row_end) {
  var answer = 0;

  data.sort((a, b) => {
    if (a[col - 1] !== b[col - 1]) return a[col - 1] - b[col - 1];
    else return b[0] - a[0];
  });

  const calc = Array(row_end - row_begin + 1);

  for (let i = row_begin - 1; i <= row_end - 1; i++) {
    const row = data[i];

    calc[i + 1 - row_begin] = row.reduce(
      (acc, cur) => (acc += cur % (i + 1)),
      0
    );
  }

  answer = calc.reduce((acc, cur) => (acc ^= cur), 0);

  return answer;
}
