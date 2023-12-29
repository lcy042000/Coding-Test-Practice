function validate(ids, banId) {
  const list = [];

  ids.forEach((v) => {
    for (let i = 0; i < v.length; i++) {
      if (banId[i] !== "*" && v[i] !== banId[i]) break;

      if (i === v.length - 1) {
        list.push(v);
      }
    }
  });

  return list;
}

function solution(user_id, banned_id) {
  var answer = 0;
  const lists = {};

  banned_id.forEach((v) => {
    const ids = user_id.filter((id) => id.length === v.length);

    lists[v] = validate(ids, v);
  });

  let queue = [[0, []]];
  let idx = 0;
  while (queue.length > idx) {
    if (queue[0][0] === banned_id.length) break;

    const [index, arr] = queue[idx++];
    const ids = lists[banned_id[index]];

    if (index + 1 > banned_id.length) continue;

    for (let i = 0; i < ids.length; i++) {
      if (arr.includes(ids[i])) continue;

      queue.push([index + 1, [...arr, ids[i]]]);
    }
  }

  const list = queue
    .filter((v) => v[0] === banned_id.length)
    .map((v) => new Set(v[1]))
    .filter((v) => v.size === banned_id.length)
    .map((v) => [...v].sort().join(""));

  answer = list.filter(
    (v, i) => list.findIndex((value) => value === v) === i
  ).length;

  return answer;
}
