function solution(s) {
  var answer = [];

  const arr = [];
  const queue = s.split("}");
  const stack = [];

  for (let i = 0; i < queue.length - 1; i++) {
    const nums = queue[i]
      .replaceAll("{", "")
      .split(",")
      .filter((v) => v > 0);

    nums.length > 0 && arr.push(nums);
  }

  arr.sort((a, b) => a.length - b.length);

  arr.forEach((v) => {
    v.forEach((num) => {
      if (!answer.includes(parseInt(num))) answer.push(parseInt(num));
    });
  });

  return answer;
}
