function solution(arr1, arr2) {
  var answer = Array.from(Array(arr1.length), () => []);

  const newArr2 = Array.from(Array(arr2[0].length), () => Array(arr2.length));

  for (let j = 0; j < arr2[0].length; j++) {
    for (let i = 0; i < arr2.length; i++) {
      newArr2[j][i] = arr2[i][j];
    }
  }

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < newArr2.length; j++) {
      let sum = 0;

      arr1[i].forEach((v, idx) => {
        sum += v * newArr2[j][idx];
      });

      answer[i].push(sum);
    }
  }

  return answer;
}
