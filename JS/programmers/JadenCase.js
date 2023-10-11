function solution(s) {
  var answer = "";

  const words = s.split(" ");
  words.map((v, i) => {
    let word = v.split("");

    if (word.length > 0) {
      if (
        "a".charAt(0) <= word[0].charAt(0) &&
        word[0].charAt(0) <= "z".charAt(0)
      ) {
        word[0] = word[0].toUpperCase();
      }

      for (let j = 1; j < word.length; j++) {
        if (
          "A".charAt(0) <= word[j].charAt(0) &&
          word[j].charAt(0) <= "Z".charAt(0)
        ) {
          word[j] = word[j].toLowerCase();
        }
      }

      words[i] = word.join("");
    } else {
      word.push(" ", i);
    }
  });

  answer = words.join(" ");
  return answer;
}
