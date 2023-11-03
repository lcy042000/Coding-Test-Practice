function convert(n, number) {
  const obj = {
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F",
  };
  const arr = [];
  let num = number;

  while (num >= n) {
    let re = num % n;

    if (re > 9) {
      re = obj[re];
    }

    arr.push(re);
    num = parseInt(num / n);
  }

  if (num < n && num > 9) {
    num = obj[num];
  }

  arr.push(num);

  return arr.reverse().join("");
}

function solution(n, t, m, p) {
  var answer = "";

  let str = "";
  let len = p;
  let num = 0;

  for (let i = 1; i < t; i++) {
    len += m;
  }

  while (str.length < len) {
    str += convert(n, num);
    num++;
  }

  const strArr = str.split("");
  console.log(str);
  for (let i = p; i <= str.length; i += m) {
    answer += strArr[i - 1];

    if (answer.length === t) break;
  }

  return answer;
}
