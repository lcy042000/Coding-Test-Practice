function solution(number, k) {
  var answer = "";

  const stack = [];

  const nums = number.split("").map(Number);
  let count = k;
  let peek = -1;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];

    if (peek < 0) {
      stack.push(num);
      peek++;
      continue;
    }

    while (count > 0 && peek > -1 && stack[peek] < num) {
      stack.pop();
      peek--;
      count--;
    }

    stack.push(num);
    peek++;
  }

  return stack.slice(0, number.length - k).join("");
}
