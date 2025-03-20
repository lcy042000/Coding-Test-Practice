function solution(n, q, ans) {
  var answer = 0;

  const isAnswer = (arr) => {
    const set = new Set(arr);

    for (let i = 0; i < q.length; i++) {
      let cnt = 0;
      const quest = q[i];

      for (let j = 0; j < 5; j++) {
        if (set.has(quest[j])) cnt++;
      }

      if (cnt !== ans[i]) return false;
    }

    return true;
  };

  const dfs = (arr) => {
    if (arr.length === 5) {
      if (isAnswer(arr)) answer++;

      return;
    }

    const lastNum = arr.length ? arr[arr.length - 1] : 0;

    for (let num = lastNum + 1; num <= n; num++) {
      arr.push(num);
      dfs(arr);
      arr.pop(num);
    }
  };

  dfs([]);

  return answer;
}
