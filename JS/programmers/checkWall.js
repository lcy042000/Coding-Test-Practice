function solution(n, weak, dist) {
  var answer = -1;

  const weakList = [...weak, ...weak.map((v) => v + n)];
  weakList.pop();

  dist.sort((a, b) => b - a);

  const makePermutation = (list, size) => {
    if (size === 1) return list.map((v) => [v]);

    const result = [];
    list.forEach((fixed, index, origin) => {
      const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
      const permutation = makePermutation(rest, size - 1);
      const attached = permutation.map((v) => [fixed, ...v]);
      result.push(...attached);
    });

    return result;
  };

  for (let i = 1; i <= dist.length; i++) {
    const permutations = makePermutation(dist, i);

    for (const permutation of permutations) {
      for (let j = 0; j < weak.length; j++) {
        let list = weakList.slice(j, j + weak.length);

        for (const node of permutation) {
          const max = list[0] + node;

          list = list.filter((v) => v > max);

          if (!list.length) return i;
        }
      }
    }
  }

  return answer;
}
