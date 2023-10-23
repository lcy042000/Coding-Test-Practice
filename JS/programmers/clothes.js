function solution(clothes) {
  var answer = 0;

  const room = {};

  clothes.forEach((v) => {
    if (room[v[1]]) {
      room[v[1]].push(v[0]);
    } else {
      room[v[1]] = [v[0]];
    }
  });

  const values = Object.values(room);

  answer = values.reduce((cur, v) => (cur *= v.length + 1), 1) - 1;

  return answer;
}
