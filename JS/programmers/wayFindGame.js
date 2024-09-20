class Tree {
  constructor() {
    this.tree = null;
  }

  addNode = (node) => {
    if (!this.tree) {
      this.tree = node;
      this.tree.push(null);
      this.tree.push(null);
    } else {
      this.exploreTree(node, this.tree);
    }
  };

  exploreTree = (node, curNode) => {
    if (curNode[1] > node[1]) {
      if (!curNode[3]) curNode[3] = node;
      else this.exploreTree(node, curNode[3]);
    } else {
      if (!curNode[4]) curNode[4] = node;
      else this.exploreTree(node, curNode[4]);
    }
  };

  preOrder = () => {
    const arr = [];
    const stack = [this.tree];

    while (stack.length) {
      const node = stack.pop();
      arr.push(node[0]);
      node[4] && stack.push(node[4]);
      node[3] && stack.push(node[3]);
    }

    return arr;
  };

  postOrder = () => {
    const arr = [];
    this.downTree(this.tree, arr);
    return arr;
  };

  downTree = (node, arr) => {
    if (node[3]) this.downTree(node[3], arr);
    if (node[4]) this.downTree(node[4], arr);
    arr.push(node[0]);
  };
}

function solution(nodeinfo) {
  var answer = [];

  const sortedList = nodeinfo
    .map((v, i) => [i + 1, ...v])
    .sort((a, b) => {
      if (a[2] !== b[2]) return b[2] - a[2];
      else return a[1] - b[1];
    });

  const tree = new Tree();

  sortedList.forEach((v) => tree.addNode(v));
  answer.push(tree.preOrder());
  answer.push(tree.postOrder());

  return answer;
}
