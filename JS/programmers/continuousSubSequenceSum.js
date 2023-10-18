function solution(elements) {
  var answer = 0;
  const arr = [...elements];

  for (let i = 0; i < elements.length - 1; i++) {
    arr.push(elements[i]);
  }
  const obj = {};

  for (let i = 1; i <= elements.length; i++) {
    for (let j = 0; j < elements.length; j++) {
      const array = arr.slice(j, j + i);
      obj[array.reduce((cur, val) => (cur += val), 0)] = 0;
    }
  }

  answer = Object.keys(obj).length;

  return answer;
}
