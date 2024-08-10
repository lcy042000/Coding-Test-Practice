function solution(s) {
  var answer = [];

  const findInsert = (str, cnt) => {
    const repeat = "110".repeat(cnt);

    for (let i = str.length - 1; i > -1; i--) {
      if (str[i] === "0") {
        return str.slice(0, i + 1) + repeat + str.slice(i + 1);
      }
    }

    return repeat + str;
  };

  s.forEach((v) => {
    const stack = [];
    let cnt = 0;

    for (const char of v) {
      if (char === "0") {
        if (stack.length < 2) stack.push(char);
        else {
          const [char1, char2] = [stack.pop(), stack.pop()];

          char2 + char1 + char === "110"
            ? cnt++
            : stack.push(char2, char1, char);
        }
      } else {
        stack.push(char);
      }
    }

    answer.push(findInsert(stack.join(""), cnt));
  });

  return answer;
}
