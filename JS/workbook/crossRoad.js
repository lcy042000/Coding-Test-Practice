"use strict";

class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  enqueue(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];

    while (index > 0) {
      const parentIndex = this.getParentIndex(index);

      if (this.heap[parentIndex][1] > lastInsertedNode[1]) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }

    this.heap[index] = lastInsertedNode;
  }

  dequeue() {
    const count = this.heap.length;
    const rootNode = this.heap[0];

    if (count <= 0) return undefined;
    if (count === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop();
      this.heapifyDown();
    }

    return rootNode;
  }

  heapifyDown() {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      const smallerChildIndex =
        rightChildIndex < count &&
        this.heap[rightChildIndex][1] < this.heap[leftChildIndex][1]
          ? rightChildIndex
          : leftChildIndex;

      if (this.heap[smallerChildIndex][1] <= rootNode[1]) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;

      this.heap[index] = rootNode;
    }
  }
}

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `3 3 3
2 2 2 3
3 3 3 2
3 3 2 3
3 3
2 2
2 3`.split("\n");

const [n, k, r] = input[0].split(" ").map((v) => +v);
const graph = Array.from(Array(Math.pow(n, 2)), () => []);

const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

const road = Array.from(Array(n * n), () => []);

for (let i = 1; i <= r; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map((v) => +v - 1);

  road[x1 * n + y1].push(x2 * n + y2);
  road[x2 * n + y2].push(x1 * n + y1);
}

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    for (let k = 0; k < 4; k++) {
      const nx = i + dx[k];
      const ny = j + dy[k];

      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

      if (road[i * n + j].includes(nx * n + ny)) {
        graph[i * n + j].push([[nx, ny], 1]);
      } else {
        graph[i * n + j].push([[nx, ny], 0]);
      }
    }
  }
}

const horses = [];

for (let i = r + 1; i < r + k + 1; i++) {
  const [x, y] = input[i].split(" ").map((v) => +v - 1);

  horses.push([x, y]);
}

let cnt = 0;

horses.forEach((v, idx) => {
  const [x, y] = v;
  const start = x * n + y;

  const pq = new PriorityQueue();

  pq.enqueue([start, 0]);

  const dist = Array(n * n).fill(Infinity);
  dist[start] = 0;

  while (pq.heap.length > 0) {
    const [cur, cost] = pq.dequeue();

    if (dist[cur] < cost) continue;

    for (let i = 0; i < graph[cur].length; i++) {
      const [next, nextCost] = graph[cur][i];
      const node = next[0] * n + next[1];

      if (dist[node] > nextCost + cost) {
        dist[node] = nextCost + cost;
        pq.enqueue([node, dist[node]]);
      }
    }
  }

  for (let i = idx + 1; i < horses.length; i++) {
    const [otherX, otherY] = horses[i];

    if (dist[otherX * n + otherY] > 0) {
      cnt++;
    }
  }
});

console.log(cnt);
