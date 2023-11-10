const vowel = ["A", "E", "I", "O", "U"];

const words = {};
let rank = 1;

function dfs(word) {
  words[word] = rank++;

  for (let i = 0; i < vowel.length; i++) {
    if ((word + vowel[i]).length === 6) continue;

    dfs(word + vowel[i]);
  }
}

function solution(word) {
  var answer = 0;

  dfs("A");
  const head = word.substring(0, 1);
  const tail = word.substring(1);

  const rank = words["A" + tail];
  const headRank = vowel.findIndex((v) => v === head);

  answer = 781 * headRank + rank;

  return answer;
}
