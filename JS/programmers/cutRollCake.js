function solution(topping) {
  var answer = 0;

  const map = new Map();
  const older = new Set();

  topping.forEach((v) => {
    map.has(v) ? map.set(v, map.get(v) + 1) : map.set(v, 1);
  });

  topping.forEach((v) => {
    const cnt = map.get(v) - 1;
    older.add(v);

    cnt === 0 ? map.delete(v) : map.set(v, cnt);

    if (older.size === map.size) answer++;
  });

  return answer;
}
