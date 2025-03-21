function solution(info, n, m) {
  var answer = Infinity;
  const len = info.length;
  const dp = new Map();

  const dfs = (idx, aTrace, bTrace) => {
    if (n <= aTrace || m <= bTrace) return Infinity;
    if (idx === len) return aTrace;

    const key = `${idx}/${aTrace}/${bTrace}`;
    if (dp.has(key)) return dp.get(key);

    const pickA = dfs(idx + 1, aTrace + info[idx][0], bTrace);
    const pickB = dfs(idx + 1, aTrace, bTrace + info[idx][1]);

    const min = Math.min(pickA, pickB);
    dp.set(key, min);
    return min;
  };

  answer = dfs(0, 0, 0);

  return answer !== Infinity ? answer : -1;
}
