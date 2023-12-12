function solution(genres, plays) {
  var answer = [];
  const n = genres.length;
  const obj = {};

  for (let i = 0; i < n; i++) {
    const genre = genres[i];
    const play = plays[i];

    if (genre in obj) {
      obj[genre].queue.push([play, i]);
      obj[genre].size += play;
    } else {
      obj[genre] = {
        queue: [],
        size: 0,
      };

      obj[genre].queue.push([play, i]);
      obj[genre].size += play;
    }
  }

  const values = Object.values(obj).sort((a, b) => b.size - a.size);

  values.forEach((v) => {
    for (let i = 0; i < 2; i++) {
      v.queue.sort((a, b) => {
        if (a[0] !== b[0]) {
          return a[0] - b[0];
        } else {
          return b[1] - a[1];
        }
      });

      if (v.queue.length > 0) {
        const value = v.queue.pop();
        answer.push(value[1]);
      }
    }
  });

  return answer;
}
