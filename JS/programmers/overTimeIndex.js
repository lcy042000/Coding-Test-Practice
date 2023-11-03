function findLastIndex(arr) {
  for (let i = arr.length - 1; i > -1; i--) {
    if (arr[i] > 0) {
      return i;
    }
  }

  return -1;
}

function solution(n, works) {
  var answer = 0;
  let time = n;
  const max = Math.max(...works);

  const arr = Array(max + 1).fill(0);

  for (let i = 0; i < works.length; i++) {
    arr[works[i]]++;
  }

  while (time > 0) {
    const idx = findLastIndex(arr);

    if (idx === -1) break;

    if (arr[idx] >= time) {
      if (idx - 1 < 0) {
        arr[idx] -= time;
        time = 0;
        break;
      }
      arr[idx - 1] += time;
      arr[idx] -= time;
      time = 0;
    } else {
      if (idx - 1 < 0) {
        arr[idx] = 0;
        break;
      }
      arr[idx - 1] += arr[idx];
      time -= arr[idx];
      arr[idx] = 0;
    }
  }

  answer = arr.reduce((value, cur, i) => (value += i ** 2 * cur), 0);

  return answer;
}
