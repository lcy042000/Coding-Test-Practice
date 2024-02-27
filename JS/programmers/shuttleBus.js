function solution(n, t, m, timetable) {
  var answer = "";

  const crews = timetable
    .map((v) => v.split(":"))
    .sort((a, b) => {
      if (a[0] === b[0]) return b[1] - a[1];

      return b[0] - a[0];
    });

  const timeTable = [];
  let [hour, minute] = [9, 0];

  for (let i = 0; i < n; i++) {
    let [curHour, curMin] = [hour, minute];

    if (curMin >= 60) {
      curHour++;
      curMin -= 60;
      hour++;
      minute -= 60;
    }

    if (curHour < 10) curHour = `0${curHour}`;
    if (curMin < 10) curMin = `0${curMin}`;

    timeTable.push(`${curHour}:${curMin}`);

    minute += t;
  }

  for (let i = 0; i < timeTable.length - 1; i++) {
    if (!crews.length) break;

    const [curHour, curMin] = timeTable[i].split(":").map(Number);
    let cnt = 0;

    while (crews.length && cnt < m) {
      const [arriveHour, arriveMin] = crews[crews.length - 1].map(Number);

      if (
        curHour < arriveHour ||
        (curHour === arriveHour && curMin < arriveMin)
      )
        break;

      crews.pop();
      cnt++;
    }
  }

  const list = [];
  let [lastHour, lastMin] = timeTable[timeTable.length - 1]
    .split(":")
    .map(Number);

  for (let i = crews.length - 1; i > -1; i--) {
    if (list.length === m) break;

    const [hour, min] = crews[i].map(Number);

    if (lastHour <= hour && lastMin < min) break;

    list.push([hour, min]);
  }

  if (list.length < m) {
    if (lastHour < 10) lastHour = `0${lastHour}`;
    if (lastMin < 10) lastMin = `0${lastMin}`;

    answer = `${lastHour}:${lastMin}`;
  } else {
    let [hour, min] = list.pop();

    min -= 1;

    if (min < 0) {
      hour -= 1;
      min += 60;
    }

    if (hour < 10) hour = `0${hour}`;
    if (min < 10) min = `0${min}`;

    answer = `${hour}:${min}`;
  }

  return answer;
}
