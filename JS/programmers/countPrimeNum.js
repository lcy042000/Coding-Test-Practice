function convert(number, k) {
  const arr = [];
  let num = number;

  while (num >= k) {
    arr.push(num % k);

    num = parseInt(num / k);
  }

  arr.push(num);

  return Number(arr.reverse().join(""));
}

function isPrime(number) {
  let num = number;

  if (number < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

function solution(n, k) {
  var answer = 0;

  const num = String(convert(n, k)).split("");
  const len = num.length;

  for (let i = 1; i < len; i++) {
    for (let j = 0; j <= len - i; j++) {
      const splitNum = num.slice(j, j + i);

      if (splitNum.includes("0") || !isPrime(Number(splitNum.join(""))))
        continue;

      if (j > 0 && num[j - 1] === "0" && j + i < len && num[j + i] === "0") {
        answer++;
      } else if (j === 0 && j + i < len && num[j + i] === "0") {
        answer++;
      } else if (j > 0 && num[j - 1] === "0" && j + i >= len) {
        answer++;
      }
    }
  }

  if (!num.includes("0") && isPrime(Number(num.join("")))) answer++;

  return answer;
}
