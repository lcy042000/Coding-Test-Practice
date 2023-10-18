function solution(s) {
  var answer = 0;

  const arr = s.split("");

  for (let i = 0; i < s.length; i++) {
    const word = arr.shift();
    arr.push(word);

    if (isCorrect(arr.join(""))) answer++;
  }

  return answer;
}

function isCorrect(s) {
  const queue = s.split("");
  const stack = [];

  while (queue.length) {
    const st = queue.shift();

    if (st === "[" || st === "{" || st === "(") {
      stack.push(st);
      continue;
    }

    if (stack.length > 0) {
      const braket = stack.pop();

      switch (st) {
        case "]":
          if (braket === "[") {
            break;
          } else {
            return false;
          }
        case "}":
          if (braket === "{") {
            break;
          } else {
            return false;
          }
        case ")":
          if (braket === "(") {
            break;
          } else {
            return false;
          }
      }
    } else {
      if (st === "]" || st === "}" || st === ")") return false;
    }
  }

  return stack.length ? false : true;
}
