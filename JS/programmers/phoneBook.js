function solution(phone_book) {
  var answer = true;

  const arr = phone_book.sort();

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1].slice(0, arr[i].length)) return false;
  }

  return answer;
}
