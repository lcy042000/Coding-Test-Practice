function solution(routes) {
  var answer = 0;

  routes.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }

    return a[1] - b[1];
  });

  let out = routes[0][1];

  for (let i = 1; i < routes.length; i++) {
    console.log(out);
    if (out < routes[i][0]) {
      answer++;
      out = routes[i][1];
    }

    if (out > routes[i][1]) {
      out = routes[i][1];
    }
  }

  return answer + 1;
}
