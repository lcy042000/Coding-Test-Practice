function charCount(word1, word2) {
  let cnt = 0;

  for (let i = 0; i < word1.length; i++) {
    if (word1.charAt(i) !== word2.charAt(i)) cnt++;
  }

  return cnt;
}

function solution(begin, target, words) {
  var answer = 0;

  const hash = {};

  for (let i = 0; i < words.length; i++) {
    hash[words[i]] = [];

    for (let j = 0; j < words.length; j++) {
      if (i !== j) {
        const cnt = charCount(words[i], words[j]);

        if (cnt === 1) {
          hash[words[i]].push(words[j]);
        }
      }
    }
  }

  hash[begin] = [];

  for (let j = 0; j < words.length; j++) {
    const cnt = charCount(begin, words[j]);

    if (cnt === 1) {
      hash[begin].push(words[j]);
    }
  }

  const queue = [[begin, 0]];

  while (queue.length) {
    const [word, cnt] = queue.shift();

    const possible = hash[word];

    if (!possible) continue;

    for (let i = 0; i < possible.length; i++) {
      if (possible[i] === target) return cnt + 1;

      queue.push([possible[i], cnt + 1]);
    }

    hash[word] = [];
  }

  return answer;
}
