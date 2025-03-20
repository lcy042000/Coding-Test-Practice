function solution(players, m, k) {
  var answer = 0;

  const server = Array(24).fill(0);

  for (let i = 0; i < 24; i++) {
    const p = players[i];
    const needServer = parseInt(p / m);

    if (server[i] < needServer) {
      const addServer = needServer - server[i];

      for (let j = i; j < i + k; j++) {
        if (24 <= j) break;

        server[j] += addServer;
      }

      answer += addServer;
    }
  }

  return answer;
}
