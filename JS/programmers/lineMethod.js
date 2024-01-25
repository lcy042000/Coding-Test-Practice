function factorial(num) {
  let result = 1;

  for (let i = 2; i < num + 1; i++) {
    result *= i;
  }

  return result;
}

function solution(n, k) {
  var answer = [];
  const nums = [];

  for (let i = 1; i < n + 1; i++) {
    nums.push(i);
  }

  let num = k;
  let cnt = 1;
  let fac = factorial(n - cnt);

  while (num > 1) {
    let i = 1;
    while (fac * i < num) {
      i++;
    }

    answer.push(nums[i - 1]);
    nums.splice(i - 1, 1);
    num -= fac * (i - 1);
    cnt++;
    fac = factorial(n - cnt);
  }

  if (num === 1) answer = [...answer, ...nums];

  return answer;
}
