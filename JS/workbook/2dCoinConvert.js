function solution(beginning, target) {
  var answer = Infinity;

  const n = beginning.length,
    m = beginning[0].length;
  const targetStr = target.map((v) => v.join("")).join("");

  for (let k = 0; k < 4; k++) {
    let cnt = 0;
    const arr = beginning.map((list) => [...list]);

    if (k < 2) {
      for (let i = 0; i < n; i++) {
        if (
          (k === 0 && arr[i][0] !== target[i][0]) ||
          (k === 1 && arr[i][0] === target[i][0])
        ) {
          cnt++;
          convertRow(arr, i);
        }
      }

      for (let j = 0; j < m; j++) {
        if (arr[0][j] !== target[0][j]) {
          cnt++;
          convertCol(arr, j);
        }
      }
    } else {
      for (let j = 0; j < m; j++) {
        if (
          (k === 2 && arr[0][j] !== target[0][j]) ||
          (k === 3 && arr[0][j] === target[0][j])
        ) {
          cnt++;
          convertCol(arr, j);
        }
      }

      for (let i = 0; i < n; i++) {
        if (arr[i][0] !== target[i][0]) {
          cnt++;
          convertRow(arr, i);
        }
      }
    }

    if (arr.map((v) => v.join("")).join("") === targetStr) {
      answer = Math.min(answer, cnt);
    }
  }

  return answer === Infinity ? -1 : answer;
}

const convertRow = (arr, row) => {
  for (let j = 0; j < arr[row].length; j++) {
    arr[row][j] = arr[row][j] ^ 1;
  }
};

const convertCol = (arr, col) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i][col] = arr[i][col] ^ 1;
  }
};
