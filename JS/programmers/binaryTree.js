function solution(numbers) {
  var answer = [];

  const convertBiTreeLen = (binary) => {
    const len = binary.length;
    let num = 1,
      bi = 2;

    while (num < len) {
      num += bi;
      bi *= 2;
    }

    if (num === len) return binary;

    return (
      Array(num - len)
        .fill(0)
        .join("") + binary
    );
  };

  const checkBTree = (tree, start, end) => {
    const mid = parseInt((start + end) / 2);
    const left = parseInt((start + mid - 1) / 2);
    const right = parseInt((mid + 1 + end) / 2);

    if (start === end) {
      return true;
    }

    if (tree[mid] === "0" && (tree[left] === "1" || tree[right] === "1")) {
      return false;
    }

    if (!checkBTree(tree, start, mid - 1)) return false;
    if (!checkBTree(tree, mid + 1, end)) return false;

    return true;
  };

  for (const num of numbers) {
    const tree = convertBiTreeLen(num.toString(2)).split("");

    answer.push(checkBTree(tree, 0, tree.length - 1) ? 1 : 0);
  }

  return answer;
}
