function solution(distance, rocks, n) {
  var answer = 0;

  let start = 0,
    end = distance;
  const list = [0, ...rocks.sort((a, b) => a - b), distance];

  while (start <= end) {
    let point = parseInt((start + end) / 2);
    let cnt = 0;
    let idx = 1;

    for (let i = 0; i < list.length - 1; ) {
      if (list[idx] - list[i] < point) {
        cnt++;
        idx++;
      } else {
        i = idx;
        idx++;
      }
    }

    if (cnt <= n) {
      start = point + 1;
    } else {
      end = point - 1;
    }
  }

  return end;
}
