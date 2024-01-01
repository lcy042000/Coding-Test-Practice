function makeMenu(word) {
  const set = new Set();
  const chars = word.split("").sort();
  const stack = chars.map((v, i) => {
    const isVisited = Array(chars.length).fill(false);
    isVisited[i] = true;

    return [v, isVisited, i];
  });

  while (stack.length) {
    const [char, isVisited, start] = stack.pop();

    set.add(char);

    if (isVisited.filter((v, i) => i >= start).every((v) => v)) continue;

    for (let i = start; i < chars.length; i++) {
      if (isVisited[i]) continue;

      const newVisited = [...isVisited];
      newVisited[i] = true;
      stack.push([char + chars[i], newVisited, i]);
    }
  }

  return [...set].filter((v) => v.length > 1);
}

function solution(orders, course) {
  var answer = [];
  const map = new Map();

  orders.forEach((v) => {
    const arr = makeMenu(v);

    arr.forEach((value) => {
      if (map.get(value)) {
        map.set(value, map.get(value) + 1);
      } else {
        map.set(value, 1);
      }
    });
  });

  const iter = map.entries();
  let value = undefined;
  const arr = Array.from(Array(Math.max(...course) + 1), () => []);

  while ((value = iter.next().value)) {
    const [menu, cnt] = value;

    if (cnt >= 2 && course.includes(menu.length)) {
      if (arr[menu.length].length === 0 || arr[menu.length][0][1] < cnt) {
        arr[menu.length] = [value];
      } else if (arr[menu.length][0][1] === cnt) {
        arr[menu.length].push(value);
      }
    }
  }

  answer = arr
    .flat()
    .map((v) => v[0])
    .sort();
  return answer;
}
