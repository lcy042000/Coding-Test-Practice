function solution(fees, records) {
  var answer = [];

  const basicTime = fees[0];
  const basicCost = fees[1];
  const perTime = fees[2];
  const perCost = fees[3];

  const inCar = records.filter((v) => {
    const [time, num, enter] = v.split(" ");

    return enter === "IN";
  });
  const outCar = records.filter((v) => {
    const [time, num, enter] = v.split(" ");

    return enter === "OUT";
  });
  let info = records.map((v) => {
    const [time, num, enter] = v.split(" ");

    return [num, 0];
  });

  info = info.filter(
    (v, i) => info.findIndex((value) => value[0] === v[0]) === i
  );

  for (let i = 0; i < inCar.length; i++) {
    const [time, num, enter] = inCar[i].split(" ");
    const inIdx = info.findIndex((v) => v[0] === num);

    const outIdx = outCar.findIndex((v) => {
      const [oTime, oNum, oEnter] = v.split(" ");

      return num === oNum;
    });

    if (outIdx === -1) {
      const [hour, min] = time.split(":");
      const calc = (23 - hour) * 60 + (59 - min);
      info[inIdx][1] += calc;
    } else {
      const [inHour, inMin] = time.split(":");
      const [outHour, outMin] = outCar[outIdx].split(" ")[0].split(":");

      const calc = (outHour - inHour) * 60 + (outMin - inMin);
      info[inIdx][1] += calc;
      outCar.splice(outIdx, 1);
    }
  }

  info.sort((a, b) => a[0] - b[0]);

  for (let i = 0; i < info.length; i++) {
    const time = info[i][1];

    if (time <= basicTime) {
      info[i][1] = basicCost;
      continue;
    }

    info[i][1] = basicCost + Math.ceil((time - basicTime) / perTime) * perCost;
  }

  answer = info.map((v) => v[1]);

  return answer;
}
