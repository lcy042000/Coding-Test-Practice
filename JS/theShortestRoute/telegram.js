"use strict";

class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  insert = (key, value) => {
    const node = { key, value };
    this.heap.push(node);
    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex].key > lastInsertedNode.key) {
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
    else if (count === 1) {
      this.heap = [];
      return rootNode;
    } else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();

      return rootNode;
    }
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
        this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }

    this.heap[index] = rootNode;
  };
}

class PriorityQueue extends Heap {
  constructor() {
    super();
  }

  enqueue = (priority, value) => this.insert(priority, value);
  dequeue = () => this.remove();
  isEmpty = () => this.heap.length <= 0;
}

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `3 2 1
1 2 4
1 3 2`.split("\n");

const [N, M, start] = input[0].split(" ").map((v) => parseInt(v));
const graph = Array.from(Array(N + 1), () => Array());
const distance = Array(N + 1).fill(Infinity);

for (let i = 1; i < M + 1; i++) {
  const [a, b, c] = input[i].split(" ").map((v) => parseInt(v));

  graph[a].push({ node: b, distance: c });
}

const queue = new PriorityQueue();

queue.enqueue(0, start);
distance[start] = 0;

while (!queue.isEmpty()) {
  const { key, value } = queue.dequeue();
  const dist = key;
  const now = value;

  if (distance[now] < dist) {
    continue;
  }

  for (const i of graph[now]) {
    const cost = dist + i.distance;

    if (cost < distance[i.node]) {
      distance[i.node] = cost;
      queue.enqueue(cost, i.node);
    }
  }
}

let city = 0;
let time = 0;

for (let i = 1; i < N + 1; i++) {
  if (distance[i] !== Infinity && i !== start) {
    city++;
    time = Math.max(time, distance[i]);
  }
}

console.log(city, time);
