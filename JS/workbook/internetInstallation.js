"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `5 7 1
1 2 5
3 1 4
2 4 8
3 2 3
5 2 9
3 4 7
4 5 6`.split("\n");

class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  peek = () => this.heap[0];

  insert = (index, value) => {
    const node = { index, value };
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].value > lastInsertedNode.value) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  };

  remove = () => {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    if (count <= 0) return undefined;
    if (count === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }

    return rootNode;
  };

  heapifyDown = () => {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex < count &&
        this.heap[rightChildIndex].value < this.heap[leftChildIndex].value
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].value <= rootNode.value) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;

      this.heap[index] = rootNode;
    }
  };
}
class PriorityQueue extends Heap {
  constructor() {
    super();
  }

  push = (index, value) => {
    this.insert(index, value);
  };
  pop = () => this.remove();
  isEmpty = () => this.heap.length === 0;
}

const [n, p, k] = input[0].split(" ").map((v) => +v);
const graph = Array.from(Array(n + 1), () => []);
let maxValue = -1;

for (let i = 1; i <= p; i++) {
  const [a, b, v] = input[i].split(" ").map((v) => +v);
  graph[a].push([b, v]);
  graph[b].push([a, v]);

  maxValue = Math.max(maxValue, v);
}

const dist = Array(n + 1).fill(Infinity);

const dijkstra = (d) => {
  const priorityQueue = new PriorityQueue();
  dist.forEach((v, i) => (dist[i] = Infinity));

  dist[1] = 0;
  priorityQueue.push(1, 0);

  while (!priorityQueue.isEmpty()) {
    const { index, value } = priorityQueue.pop();

    if (dist[index] < value) continue;

    graph[index].forEach((v) => {
      let next = v[0];
      let nextValue = value;

      if (v[1] > d) nextValue++;

      if (nextValue < dist[next]) {
        dist[next] = nextValue;
        priorityQueue.push(next, nextValue);
      }
    });
  }

  return dist[n] <= k;
};

let start = 0;
let end = 1000000;
let result = -1;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  if (dijkstra(mid)) {
    result = mid;
    end = mid - 1;
  } else {
    start = mid + 1;
  }
}

console.log(result);
