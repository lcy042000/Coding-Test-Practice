function solution(n, cores) {
  var answer = 0;

  let work = n - cores.length;
  let start = 1,
    end = parseInt((Math.max(...cores) * work) / cores.length);

  while (start < end) {
    const mid = parseInt((start + end) / 2);
    let cnt = 0;

    for (const core of cores) {
      cnt += parseInt(mid / core);
    }

    if (cnt >= work) {
      end = mid;
    } else start = mid + 1;
  }

  for (const core of cores) {
    work -= parseInt((end - 1) / core);
  }

  for (let i = 0; i < cores.length; i++) {
    if (end % cores[i] > 0) continue;

    work--;

    if (!work) {
      answer = i + 1;
      break;
    }
  }

  return answer;
}
