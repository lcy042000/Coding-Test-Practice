function solution(play_time, adv_time, logs) {
  var answer = "";

  const convertTime = (time) => {
    const arr = time.split(":").map(Number);

    return arr[0] * 3600 + arr[1] * 60 + arr[2];
  };

  const printTime = (time) => {
    let hour = (time / 3600) >> 0;
    let min = ((time / 60) >> 0) % 60;
    let sec = time % 60;

    hour = hour > 9 ? hour : "0" + hour;
    min = min > 9 ? min : "0" + min;
    sec = sec > 9 ? sec : "0" + sec;

    return hour + ":" + min + ":" + sec;
  };

  const playTime = convertTime(play_time);
  const advTime = convertTime(adv_time);

  const timeArr = Array(playTime).fill(0);

  logs.forEach((v) => {
    const [start, end] = v.split("-").map((v) => convertTime(v));

    timeArr[start]++;
    timeArr[end]--;
  });

  for (let i = 1; i < playTime; i++) {
    timeArr[i] += timeArr[i - 1];
  }

  for (let i = 1; i < playTime; i++) {
    timeArr[i] += timeArr[i - 1];
  }

  let max = timeArr[advTime - 1] - timeArr[0];
  let idx = 0;

  for (let i = advTime; i < playTime; i++) {
    if (max < timeArr[i] - timeArr[i - advTime]) {
      max = timeArr[i] - timeArr[i - advTime];
      idx = i - advTime + 1;
    }
  }

  return printTime(idx);
}
