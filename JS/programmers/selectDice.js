function solution(dice) {
  var answer = [];

  const keySet = new Set();
  const len = parseInt(dice.length / 2);
  const isVisited = Array(dice.length).fill(false);

  const dfs = (list, idx) => {
    if (len === list.length) {
      keySet.add(list.join("/"));
      return;
    }

    for (let i = idx; i < dice.length; i++) {
      isVisited[i] = true;
      dfs([...list, i], i + 1);
      isVisited[i] = false;
    }
  };

  dfs([], 0);

  const map = new Map();

  const makeSumList = (key) => {
    const sumList = [];
    const idxs = key.split("/");

    const calcSum = (idx, curSum) => {
      if (len <= idx) {
        sumList.push(curSum);
        return;
      }

      for (let i = 0; i < 6; i++) {
        calcSum(idx + 1, curSum + dice[idxs[idx]][i]);
      }
    };

    calcSum(0, 0);
    map.set(
      key,
      sumList.sort((a, b) => a - b)
    );
  };

  for (const key of keySet) {
    makeSumList(key);
  }

  let max = -Infinity;

  for (const key of keySet) {
    const keys = new Set(key.split("/").map(Number));
    let otherKey = [];

    for (let i = 0; i < dice.length; i++) {
      if (!keys.has(i)) otherKey.push(i);
    }

    otherKey = otherKey.join("/");
    const [value, otherValue] = [map.get(key), map.get(otherKey)];
    let cnt = 0,
      pointer = 0;

    for (const v of value) {
      let idx = pointer;

      for (let j = pointer; j < otherValue.length; j++) {
        if (v <= otherValue[j]) {
          pointer = j;
          break;
        }

        idx++;
      }

      cnt += idx;
    }

    if (max < cnt) {
      max = cnt;
      answer = key.split("/").map((v) => Number(v) + 1);
    }
  }

  return answer;
}
