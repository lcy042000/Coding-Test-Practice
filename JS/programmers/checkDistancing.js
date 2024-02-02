function solution(places) {
  var answer = [-1, -1, -1, -1, -1];

  const graphes = places.map((place) => {
    return place.map((v) => v.split(""));
  });

  const squareX = [0, -1, 0, 1];
  const squareY = [-1, 0, 1, 0];

  const triX = [0, -1, 0, 2];
  const triY = [-1, 0, 2, 0];

  const starX = [-1, -1, 1, 1];
  const starY = [-1, 1, 1, -1];
  const starPartX = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  const starPartY = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  graphes.forEach((graph, idx) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (graph[i][j] !== "P") continue;

        for (let k = 0; k < 4; k++) {
          let nx = i + squareX[k];
          let ny = j + squareY[k];

          if (nx > -1 && nx < 5 && ny > -1 && ny < 5 && graph[nx][ny] === "P") {
            answer[idx] = 0;
            i = 5;
            j = 5;
            break;
          }

          nx = i + triX[k];
          ny = j + triY[k];

          if (
            nx > -1 &&
            nx < 5 &&
            ny > -1 &&
            ny < 5 &&
            graph[nx][ny] === "P" &&
            graph[i + squareX[k]][j + squareY[k]] !== "X"
          ) {
            answer[idx] = 0;
            i = 5;
            j = 5;
            break;
          }

          nx = i + starX[k];
          ny = j + starY[k];

          if (nx > -1 && nx < 5 && ny > -1 && ny < 5 && graph[nx][ny] === "P") {
            const [nx1, nx2] = starPartX[k].map((x) => x + i);
            const [ny1, ny2] = starPartY[k].map((y) => y + j);

            if (graph[nx1][ny1] !== "X" || graph[nx2][ny2] !== "X") {
              answer[idx] = 0;
              i = 5;
              j = 5;
              break;
            }
          }
        }
      }
    }

    if (answer[idx] === -1) answer[idx] = 1;
  });

  return answer;
}
