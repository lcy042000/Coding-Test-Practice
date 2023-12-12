function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}

function solution(numbers) {
  var answer = 0;

  const arr = [];
  const nums = numbers.split("");
  const stack = [];

  for (let i = 0; i < nums.length; i++) {
    const isVisited = Array(nums.length).fill(false);
    isVisited[i] = true;
    stack.push([nums[i], isVisited]);
  }

  while (stack.length) {
    const [value, isVisited] = stack.pop();

    arr.push(Number(value));

    for (let i = 0; i < nums.length; i++) {
      if (!isVisited[i]) {
        const newVisited = isVisited.slice();
        newVisited[i] = true;
        stack.push([value + nums[i], newVisited]);
      }
    }
  }

  const set = new Set(arr);

  set.forEach((v) => {
    if (isPrime(v)) answer++;
  });

  return answer;
}
