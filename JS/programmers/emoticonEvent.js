function solution(users, emoticons) {
  var answer = [];

  const emotiArr = emoticons.sort((a, b) => a - b);
  const emotiPriceP = Array.from(Array(emotiArr.length), () => Array(4));

  for (let i = 0; i < emotiArr.length; i++) {
    for (let j = 10; j <= 40; j += 10) {
      emotiPriceP[i][j / 10 - 1] = (emotiArr[i] / 100) * (100 - j);
    }
  }

  const emotiPArr = Array(emotiArr.length).fill(0);
  let [joinMaxCnt, saleMaxSum] = [-Infinity, -Infinity];

  function calc() {
    const arr = Array(users.length).fill(0);

    for (let i = 0; i < emotiPArr.length; i++) {
      const per = emotiPArr[i];

      for (let j = 0; j < users.length; j++) {
        if (users[j][0] > per) continue;
        if (arr[j] === -1) continue;

        arr[j] += emotiPriceP[i][per / 10 - 1];

        if (arr[j] >= users[j][1]) arr[j] = -1;
      }
    }

    return [
      arr.filter((v) => v < 0).length,
      arr.filter((v) => v > 0).reduce((acc, cur) => (acc += cur), 0),
    ];
  }

  function makeArr(idx) {
    if (idx === emoticons.length) {
      const [re1, re2] = calc();

      if (joinMaxCnt < re1) {
        joinMaxCnt = re1;
        saleMaxSum = re2;
      } else if (joinMaxCnt === re1 && saleMaxSum < re2) {
        saleMaxSum = re2;
      }

      return;
    }

    for (let i = 40; i >= 10; i -= 10) {
      emotiPArr[idx] = i;
      makeArr(idx + 1);
      emotiPArr[idx] = 0;
    }
  }

  makeArr(0);

  return [joinMaxCnt, saleMaxSum];
}
