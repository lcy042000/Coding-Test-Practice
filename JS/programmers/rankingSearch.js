function solution(info, query) {
  var answer = [];

  const map = new Map();

  info.forEach((v, i) => {
    const list = v.split(" ");
    const score = Number(list.pop());

    const word = list.join("");

    if (map.has(word)) {
      map.set(word, [...map.get(word), score]);
    } else {
      map.set(word, [score]);
    }
  });

  Array.from(map.keys()).forEach((v) => {
    map.set(
      v,
      map.get(v).sort((a, b) => a - b)
    );
  });

  const countPerson = (list, score) => {
    const scores = map.get(list);
    let start = 0,
      end = scores.length;

    while (start < end) {
      const mid = parseInt((start + end) / 2);

      if (scores[mid] < score) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }

    return scores.length - start;
  };

  query.forEach((v) => {
    const querys = v
      .replaceAll(" and", "")
      .replaceAll("-", "")
      .split(" ")
      .filter((v) => v);
    const score = querys.pop();

    answer.push(
      Array.from(map.keys())
        .filter((key) => querys.every((v) => key.includes(v)))
        .reduce((acc, cur) => (acc += countPerson(cur, score)), 0)
    );
  });

  return answer;
}
