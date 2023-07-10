"use restrict";

class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(item) {
    this.queue.push(item);
  }
  dequeue() {
    return this.queue.shift();
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString().split("\n")
    : `5
10 -1
10 1 -1
4 1 -1
4 3 1 -1
3 3 -1`.split("\n");

const n = parseInt(input[0]);
const indegree = Array(n + 1).fill(0);
const graph = Array.from(Array(n + 1), () => []);
const time = Array(n + 1).fill(0);

for (let i = 1; i < n + 1; i++) {
  const data = input[i].split(" ").map((v) => parseInt(v));

  time[i] = data[0];

  for (const x of data.slice(1, data.length - 1)) {
    indegree[i] += 1;
    graph[x].push(i);
  }
}

const result = time.slice();
const queue = new Queue();

for (let i = 1; i < n + 1; i++) {
  if (indegree[i] === 0) queue.enqueue(i);
}

while (!queue.isEmpty()) {
  const now = queue.dequeue();

  for (const i of graph[now]) {
    result[i] = Math.max(result[i], result[now] + time[i]);
    indegree[i] -= 1;

    if (indegree[i] === 0) queue.enqueue(i);
  }
}

for (let i = 1; i < n + 1; i++) {
  console.log(result[i]);
}
