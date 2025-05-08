function solution(n, l, r) {
  var answer = 0;

  const isOne = (num) => {
    if (num < 5 && num !== 2) return true;
    if (!((num - 2) % 5)) return false;

    return isOne(Math.floor(num / 5));
  };

  for (let i = l - 1; i < r; i++) {
    if (isOne(i)) answer++;
  }

  return answer;
}
