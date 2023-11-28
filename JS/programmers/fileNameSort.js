function fileSplit(word) {
  const newWord = word.toLowerCase();
  let head = 0;

  while (
    "0".charAt(0) > newWord.charAt(head) ||
    newWord.charAt(head) > "9".charAt(0)
  ) {
    head++;
  }

  const headStr = newWord.slice(0, head);
  let num = head;

  while (
    "0".charAt(0) <= newWord.charAt(num) &&
    newWord.charAt(num) <= "9".charAt(0)
  ) {
    num++;
  }

  const numStr = newWord.slice(head, num);
  const tailStr = newWord.slice(num);

  return [headStr, numStr, tailStr];
}

function solution(files) {
  var answer = [];

  const arr = [];

  for (let i = 0; i < files.length; i++) {
    arr.push([fileSplit(files[i]), i]);
  }

  arr.sort((a, b) => {
    if (a[0][0] !== b[0][0]) {
      if (a[0][0] > b[0][0]) return 1;
      else if (a[0][0] < b[0][0]) return -1;
      else return a[0][1] - b[0][1];
    } else {
      return a[0][1] - b[0][1];
    }
  });

  arr
    .map((v) => [v[0].join(""), v[1]])
    .forEach((v) => {
      answer.push(files[v[1]]);
    });
  return answer;
}
