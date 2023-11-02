function solution(msg) {
  var answer = [];

  const diction = [];

  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    diction.push(String.fromCharCode(i));
  }

  for (let i = 0; i < msg.length; ) {
    let word = msg.slice(i, i + 1);
    let nextIndex = i + 1;

    while (diction.includes(word + msg.slice(i + 1, nextIndex + 1))) {
      nextIndex++;

      if (nextIndex >= msg.length) break;
    }

    word = msg.slice(i, nextIndex);

    const index = diction.findIndex((v) => v === word) + 1;
    if (index > 0) answer.push(index);
    diction.push(msg.slice(i, nextIndex + 1));

    i = nextIndex;
  }

  return answer;
}
