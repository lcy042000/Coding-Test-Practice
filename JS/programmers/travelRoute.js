function solution(tickets) {
  var answer = [];
  const len = tickets.length + 1;
  const info = tickets.map((v, i) => [...v, i]);
  const stack = [];

  info
    .filter((v) => v[0] === "ICN")
    .sort((a, b) => {
      if (a < b) return 1;
      else if (a > b) return -1;
      else return 0;
    })
    .forEach((v) => {
      const [start, end, idx] = v;

      const isVisited = Array(info.length).fill(false);
      isVisited[idx] = true;

      stack.push([[start, end], isVisited]);
    });

  while (stack.length) {
    const [record, isVisited] = stack.pop();

    if (record.length === len) {
      answer = record;
      break;
    }

    const last = record[record.length - 1];
    const nextes = info
      .filter((v) => v[0] === last && !isVisited[v[2]])
      .sort((a, b) => {
        if (a < b) return 1;
        else if (a > b) return -1;
        else return 0;
      });

    nextes.forEach((v) => {
      const [start, end, idx] = v;
      const newRecord = [...record, end];
      const newIsVisited = [...isVisited];

      newIsVisited[idx] = true;

      stack.push([newRecord, newIsVisited]);
    });
  }

  return answer;
}
