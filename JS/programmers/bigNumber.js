function solution(numbers) {
  var answer = "";

  const arr = numbers.map((v) => String(v));

  arr.sort((a, b) => {
    const newA = a + b;
    const newB = b + a;

    return newB - newA;
  });

  return arr.every((v) => v === "0") ? "0" : arr.join("");
}
