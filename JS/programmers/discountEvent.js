function solution(want, number, discount) {
  var answer = 0;

  for (let i = 0; i <= discount.length - 10; i++) {
    if (isDiscount(want, number, discount.slice(i, i + 10))) answer++;
  }

  return answer;
}

function isDiscount(want, number, discount) {
  const copy = number.slice();

  while (discount.length) {
    const item = discount.pop();

    const idx = want.indexOf(item);

    if (idx > -1) {
      copy[idx] -= 1;
    }
  }

  if (copy.every((v) => v <= 0)) return true;
  else return false;
}
