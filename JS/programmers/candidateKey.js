const combine = (array, r) => {
  const n = array.length;
  if (n === 0 || r === 0) return [""];
  if (n === r) return [array.join("")];

  const next = array.slice(1);
  return [
    ...combine(next, r - 1).map((v) => `${array[0]}` + v),
    ...combine(next, r),
  ];
};

const isEqual = (a, b) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

function solution(relation) {
  const columnLength = relation[0].length,
    columnIndexes = Array(columnLength)
      .fill(0)
      .map((_, i) => i);

  let columnSet = [];
  for (let i = columnLength; i > 0; i--)
    columnSet.push(...combine(columnIndexes, i));

  let answer = 0,
    s;
  while (columnSet.length > 0) {
    s = columnSet.pop().split("");
    if (
      relation
        .map((v) => s.map((i) => v[i]))
        .some((v, i, a) => i !== a.findIndex((_v) => isEqual(_v, v)))
    )
      continue;

    answer++;
    for (let i = 0; i < columnSet.length; i++)
      if (s.every((v) => columnSet[i].includes(v))) columnSet.splice(i--, 1);
  }
  return answer;
}
