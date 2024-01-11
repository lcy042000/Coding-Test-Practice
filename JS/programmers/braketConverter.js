function isCorrect(word) {
  const chars = word.split("");
  const stack = [];
  let idx = 0;

  while (chars.length > idx) {
    const c = chars[idx++];

    if (c === "(") {
      stack.push(c);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") return false;

      stack.pop();
    }
  }

  return stack.length === 0;
}

function solution(p) {
  var answer = "";
  let left = 0;
  let right = 0;

  if (p === "") return "";

  for (let i = 0; i < p.length; i++) {
    p[i] === "(" ? left++ : right++;

    if (left === right) {
      if (isCorrect(p.slice(0, i + 1))) {
        answer = p.slice(0, i + 1) + solution(p.slice(i + 1));
        return answer;
      } else {
        answer = "(" + solution(p.slice(i + 1)) + ")";

        for (let j = 1; j < i; j++) {
          if (p[j] === "(") {
            answer += ")";
          } else answer += "(";
        }

        return answer;
      }
    }
  }
  return answer;
}
