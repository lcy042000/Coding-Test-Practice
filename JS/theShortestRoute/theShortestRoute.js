"use strict";

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().split("\n")
    : `5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6`.split("\n");

class Heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  peek = () => this.heap[0];

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

  enqueue = (priority, value) => this.insert(priority, value);
  dequeue = () => this.remove();
  isEmpty = () => this.heap.length <= 0;
}

const [V, E] = input[0].split(" ").map((v) => parseInt(v));
const start = parseInt(input[1]);

const graph = Array.from(Array(V + 1), () => []);
const arr = Array(V + 1).fill(Infinity);

arr[start] = 0;

for (let i = 2; i < E + 2; i++) {
  const [u, v, w] = input[i].split(" ").map((v) => parseInt(v));

  graph[u].push([v, w]);
}

const pq = new PriorityQueue();
pq.enqueue(start, 0);

while (!pq.isEmpty()) {
  const { key, value } = pq.dequeue();

  if (arr[key] < value) continue;

  for (let i = 0; i < graph[key].length; i++) {
    const [v, w] = graph[key][i];
    if (arr[v] > arr[key] + w) {
      arr[v] = arr[key] + w;
      pq.enqueue(v, arr[v]);
    }
  }
}

const result = [];

for (let i = 1; i < arr.length; i++) {
  if (arr[i] === Infinity) result.push("INF");
  else result.push(arr[i]);
}

console.log(result.join("\n"));
