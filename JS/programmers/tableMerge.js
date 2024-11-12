function solution(commands) {
  var answer = [];

  const map = new Map();
  const list = Array(2552)
    .fill(-1)
    .map((_, i) => i);
  let groupNum = 2553;

  const update1 = (num, value) => {
    const idx = list[num];

    map.set(idx, value);
  };

  const update2 = (value1, value2) => {
    const keys = map.keys();

    for (const key of keys) {
      if (map.get(key) === value1) {
        map.set(key, value2);
      }
    }
  };

  const merge = (num1, num2) => {
    const idx1 = list[num1],
      idx2 = list[num2];

    if (idx1 < 2552 && idx2 < 2552 && idx1 === idx2) return;

    if (map.has(idx1) && !map.has(idx2)) {
      map.set(groupNum, map.get(idx1));
      map.delete(idx1);
      list[num1] = groupNum;
      list[num2] = groupNum;

      for (let i = 1; i < list.length; i++) {
        if (list[i] === idx1) {
          list[i] = groupNum;
        }
      }

      groupNum += 1;
    } else if (!map.has(idx1) && map.has(idx2)) {
      map.set(groupNum, map.get(idx2));
      map.delete(idx2);
      list[num1] = groupNum;
      list[num2] = groupNum;

      for (let i = 1; i < list.length; i++) {
        if (list[i] === idx2) {
          list[i] = groupNum;
        }
      }

      groupNum += 1;
    } else if (map.has(idx1) && map.has(idx2)) {
      map.set(
        groupNum,
        map.get(idx1) === "EMPTY" ? map.get(idx2) : map.get(idx1)
      );
      map.delete(idx1);
      map.delete(idx2);

      list[num1] = groupNum;
      list[num2] = groupNum;

      for (let i = 1; i < list.length; i++) {
        if (list[i] === idx1 || list[i] === idx2) {
          list[i] = groupNum;
        }
      }

      groupNum += 1;
    } else {
      map.set(groupNum, "EMPTY");

      list[num1] = groupNum;
      list[num2] = groupNum;

      groupNum++;
    }
  };

  const unmerge = (num) => {
    const idx = list[num];

    for (let i = 1; i < list.length; i++) {
      if (i !== num && list[i] === idx) {
        list[i] = i;
      }
    }
  };

  const print = (num) => {
    const idx = list[num];

    if (!map.has(idx)) return "EMPTY";

    return map.get(idx);
  };

  for (const cmd of commands) {
    const str = cmd.split(" ");

    if (str.length === 4) {
      update1(parseInt(str[1]) * 50 + parseInt(str[2]), str[3]);
    }

    if (str.length === 5) {
      const nums = str.slice(1).map(Number);

      merge(nums[0] * 50 + nums[1], nums[2] * 50 + nums[3]);
    }

    if (str.length === 3) {
      switch (str[0]) {
        case "UPDATE":
          update2(str[1], str[2]);
          break;
        case "UNMERGE":
          unmerge(parseInt(str[1]) * 50 + parseInt(str[2]));
          break;
        case "PRINT":
          answer.push(print(parseInt(str[1]) * 50 + parseInt(str[2])));
          break;
      }
    }
  }

  return answer;
}
