function solution(n, build_frame) {
  var answer = [];

  function checkPillar(arr, x, y) {
    if (y === 0) return true;
    if (
      arr.find(
        ([curX, curY, curFr]) => curX === x && curY === y - 1 && curFr === 0
      )
    )
      return true;
    if (
      arr.find(
        ([curX, curY, curFr]) => curX === x - 1 && curY === y && curFr === 1
      ) ||
      arr.find(([curX, curY, curFr]) => curX === x && curY === y && curFr === 1)
    )
      return true;

    return false;
  }

  function checkPlate(arr, x, y) {
    if (
      arr.find(
        ([curX, curY, curFr]) => curX === x && curY === y - 1 && curFr === 0
      )
    )
      return true;
    if (
      arr.find(
        ([curX, curY, curFr]) => curX === x + 1 && curY === y - 1 && curFr === 0
      )
    )
      return true;
    if (
      arr.find(
        ([curX, curY, curFr]) => curX === x - 1 && curY === y && curFr === 1
      ) &&
      arr.find(
        ([curX, curY, curFr]) => curX === x + 1 && curY === y && curFr === 1
      )
    )
      return true;

    return false;
  }

  function buildFrame(x, y, frame) {
    if (frame) {
      if (checkPlate(answer, x, y)) answer.push([x, y, frame]);
    } else {
      if (checkPillar(answer, x, y)) answer.push([x, y, frame]);
    }
  }

  function deleteFrame(x, y, frame) {
    const deletedArr = answer.filter(
      ([a, b, fr]) => a !== x || b !== y || fr !== frame
    );

    for (const [a, b, fr] of deletedArr) {
      if (fr && !checkPlate(deletedArr, a, b)) {
        return;
      }

      if (!fr && !checkPillar(deletedArr, a, b)) return;
    }

    answer = deletedArr;
  }

  build_frame.forEach((v) => {
    const [x, y, frame, bool] = v;

    if (bool) {
      buildFrame(x, y, frame);
    } else {
      deleteFrame(x, y, frame);
    }
  });

  answer.sort((a, b) => {
    const [ax, ay, aFrame, aBool] = a,
      [bx, by, bFrame, bBool] = b;

    if (ax === bx) {
      if (ay === by) {
        return aFrame - bFrame;
      }

      return ay - by;
    }

    return ax - bx;
  });

  return answer;
}
