function solution(n, info) {
  var answer = [-1];
  let maxScore = 0;

  function findWin(usedRow, curRound, scoreList) {
    if (usedRow > n || curRound > 11) return;

    if (usedRow === n) {
      const ryan = [],
        appeach = [];

      for (let i = 0; i < 11; i++) {
        if (scoreList[i] > info[i]) ryan.push(10 - i);
        else if (scoreList[i] === 0 && info[i] === 0) continue;
        else appeach.push(10 - i);
      }

      const scoreDiff =
        ryan.reduce((acc, cur) => (acc += cur), 0) -
        appeach.reduce((acc, cur) => (acc += cur), 0);

      if (scoreDiff <= 0) return;

      if (maxScore < scoreDiff) {
        answer = scoreList;
        maxScore = scoreDiff;
      } else if (maxScore === scoreDiff) {
        if (answer.length === 1) {
          answer = scoreList;
        } else {
          for (let i = 10; i > -1; i--) {
            if (scoreList[i] > answer[i]) {
              answer = scoreList;
              return;
            } else if (scoreList[i] === answer[i]) {
              continue;
            } else {
              return;
            }
          }
        }
      } else return;
    } else {
      for (let i = 0; i < n - usedRow + 1; i++) {
        const newList = [...scoreList];
        newList[curRound] = i;
        findWin(usedRow + i, curRound + 1, newList);
      }
    }
  }

  findWin(0, 0, Array(11).fill(0));

  return answer;
}
