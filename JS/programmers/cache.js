function solution(cacheSize, cities) {
  var answer = 0;

  const cache = [];
  let time = 0;

  cities.forEach((v) => {
    const idx = cache.findIndex((city) => city === v.toLowerCase());

    if (idx > -1) {
      time++;
      cache.push(...cache.splice(idx, 1));
    } else {
      cache.push(v.toLowerCase());
      if (cache.length > cacheSize) {
        cache.shift();
      }
      time += 5;
    }
  });

  answer = time;
  return answer;
}
