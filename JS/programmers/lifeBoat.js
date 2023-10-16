function solution(people, limit) {
  var answer = 0;
  let cnt = 0;

  people.sort((a, b) => b - a);
  let idx = 0;
  while (people.length > idx) {
    if (people.length === 1) {
      cnt++;
      break;
    }

    if (people[idx] + people[people.length - 1] <= limit) {
      cnt++;
      people.pop();
      idx++;
    } else {
      cnt++;
      idx++;
    }
  }

  answer = cnt;
  return answer;
}
