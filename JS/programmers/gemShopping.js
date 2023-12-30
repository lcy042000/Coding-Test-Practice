function solution(gems) {
  var answer = [];
  const len = new Set(gems).size;
  const map = new Map();
  let section = [-Infinity, Infinity];

  gems.forEach((gem, idx) => {
    map.delete(gem);
    map.set(gem, idx);

    if (map.size === len) {
      const newSection = [map.values().next().value + 1, idx + 1];

      section =
        section[1] - section[0] > newSection[1] - newSection[0]
          ? newSection
          : section;
    }
  });

  answer = section;

  return answer;
}
