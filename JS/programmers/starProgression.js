function solution(a) {
  var answer = 0;

  if (a.length < 2) return 0;

  const map = new Map();
  const set = new Set(a);

  for (const num of set) {
    map.set(num, []);
  }

  for (let i = 0; i < a.length; i++) {
    const num = a[i];
    const list = map.get(num);

    list.push(i);

    map.set(num, list);
  }

  const len = a.length;

  const queue = [...set]
    .map((v) => [v, map.get(v)])
    .sort((a, b) => b[1].length - a[1].length);
  let idx = 0;

  while (queue.length > idx) {
    const [num, idxs] = queue[idx++];

    if (answer >= idxs.length * 2) continue;

    let count = 0;

    for (let i = 0; i < a.length; i++) {
      if (a[i + 1] === undefined) continue;
      if (a[i] === a[i + 1]) continue;
      if (a[i] !== num && a[i + 1] !== num) continue;

      count++;
      i++;
    }

    answer = Math.max(answer, count * 2);
  }

  return answer;
}
