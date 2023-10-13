function solution(n, words) {
  var answer = [];

  for (let i = 1; i < words.length; i++) {
    if (words[i].length < 2) {
      answer.push((i % n) + 1);
      answer.push(parseInt(i / n) + 1);
      break;
    }

    if (words[i - 1].charAt(words[i - 1].length - 1) !== words[i].charAt(0)) {
      answer.push((i % n) + 1);
      answer.push(parseInt(i / n) + 1);
      break;
    }

    if (words.findIndex((v) => v === words[i]) !== i) {
      answer.push((i % n) + 1);
      answer.push(parseInt(i / n) + 1);
      break;
    }

    if (i === words.length - 1) {
      answer = [0, 0];
    }
  }

  return answer;
}
