const point = {
  diamond: 25,
  iron: 5,
  stone: 1,
};

class Info {
  constructor(mineral) {
    this.mineral = mineral;
    this.sum = this.calc(mineral);
  }

  calc = (mineral) => {
    return mineral.reduce((acc, cur) => (acc += point[cur]), 0);
  };
}

function solution(picks, minerals) {
  var answer = 0;

  const infos = [];
  let cnt = 0;
  const len = picks.reduce((acc, cur) => (acc += cur), 0);

  for (let i = 0; i < minerals.length; i += 5) {
    if (cnt === len) break;
    cnt++;
    infos.push(new Info(minerals.slice(i, i + 5)));
  }

  infos.sort((a, b) => {
    if (a.sum === b.sum) return b.mineral.length - a.mineral.length;

    return b.sum - a.sum;
  });
  const arr = {
    0: {
      diamond: 1,
      iron: 1,
      stone: 1,
    },
    1: {
      diamond: 5,
      iron: 1,
      stone: 1,
    },
    2: {
      diamond: 25,
      iron: 5,
      stone: 1,
    },
  };

  for (let i = 0; i < infos.length; i++) {
    const { mineral } = infos[i];
    let idx = 0;

    if (idx === 0 && picks[0] === 0) idx = 1;
    if (idx === 1 && picks[1] === 0) idx = 2;
    if (idx === 2 && picks[2] === 0) break;

    answer += mineral.reduce((acc, cur) => (acc += arr[idx][cur]), 0);
    picks[idx] -= 1;
  }

  return answer;
}
