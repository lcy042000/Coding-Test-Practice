function solution(line) {
  var answer = [];

  const calcCrossPoint = (a, b, e, c, d, f) => {
    const adbc = a * d - b * c;

    const xy = [(b * f - e * d) / adbc, (e * c - a * f) / adbc];

    return xy;
  };

  const isInteger = (xy) => {
    if (Number.isInteger(xy[0]) && Number.isInteger(xy[1])) return true;

    return false;
  };

  const list = [];

  for (let i = 0; i < line.length - 1; i++) {
    const [a1, b1, c1] = line[i];

    for (let j = i + 1; j < line.length; j++) {
      const [a2, b2, c2] = line[j];
      const xy = calcCrossPoint(a1, b1, c1, a2, b2, c2);

      if (isInteger(xy)) list.push(xy);
    }
  }

  let maxX = -Infinity,
    maxY = -Infinity,
    minX = Infinity,
    minY = Infinity;

  for (const [x, y] of list) {
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
  }

  const arr = Array.from(Array(maxY - minY + 1), () =>
    Array(maxX - minX + 1).fill(".")
  );

  for (const [x, y] of list) {
    arr[maxY - y][x - minX] = "*";
  }

  return arr.map((v) => v.join(""));
}
