function solution(name) {
  var answer = 0;
  let min = name.length - 1;

  [...name].forEach((v, i) => {
    answer += Math.min(v.charCodeAt() - 65, 91 - v.charCodeAt());
    let idx = i + 1;

    while (idx < name.length && name[idx] === "A") idx++;

    min = Math.min(min, i * 2 + name.length - idx, i + 2 * (name.length - idx));
  });

  return answer + min;
}
