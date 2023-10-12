function solution(s) {
  var answer = [];

  let ze = 0;
  let cnt = 0;

  while (true) {
    const [zeroCnt, num] = zero(s);

    ze += zeroCnt;

    s = toBi(num);

    cnt++;

    if (s === "1") {
      answer = [cnt, ze];
      break;
    }
  }

  return answer;
}

function zero(bi) {
  let zeroCnt = 0;

  bi.split("").forEach((v) => !Number(v) && zeroCnt++);

  return [zeroCnt, bi.length - zeroCnt];
}

function toBi(num) {
  const arr = [];

  while (num > 0) {
    arr.push(num % 2);
    num = parseInt(num / 2);
  }

  return arr.reverse().join("");
}
