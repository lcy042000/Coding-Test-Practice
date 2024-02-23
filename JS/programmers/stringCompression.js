function solution(s) {
  let compression = s;
  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    let target;
    let count = 0;
    const result = [];
    for (let j = 0; j < s.length; j += i) {
      const matched = s.slice(j, j + i);
      if (!target) {
        target = matched;
        count = 1;
      } else {
        if (matched === target) {
          count++;
        } else {
          result.push(count > 1 ? `${count}${target}` : target);
          target = matched;
          count = 1;
        }
      }
    }
    result.push(count > 1 ? `${count}${target}` : target);
    const curCompression = result.join("");
    if (compression.length > curCompression.length) {
      compression = curCompression;
    }
  }
  return compression.length;
}
