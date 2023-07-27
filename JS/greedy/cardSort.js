"use strict";

class heap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  length = () => this.heap.length;

  peek = () => this.heap[0];

  insert = (value) => {
    this.heap.push(value);

    this.heapifyUp();
  };

  heapifyUp = () => {
    let index = this.heap.length - 1;

    while (
      this.getParentIndex(index) >= 0 &&
      this.heap[this.getParentIndex(index)] > this.heap[index]
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
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

    while (
      this.getLeftChildIndex(index) < this.heap.length &&
      (this.heap[this.getLeftChildIndex(index)] < this.heap[index] ||
        this.heap[this.getRightChildIndex(index)] < this.heap[index])
    ) {
      const smallerChildIndex =
        this.getRightChildIndex(index) < this.heap.length &&
        this.heap[this.getRightChildIndex(index)] <
          this.heap[this.getLeftChildIndex(index)]
          ? this.getRightChildIndex(index)
          : this.getLeftChildIndex(index);

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  };

  swap = (a, b) => {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  };
}

const fs = require("fs");

const input =
  process.platform === "linux"
    ? fs.readFileSync("dev/stdin").toString().trim().split("\n")
    : `4
10
10
10
10`.split("\n");

const n = Number(input[0]);
const arr = new heap();

input.slice(1).forEach((e) => arr.insert(Number(e)));

let result = 0;

while (arr.length() > 1) {
  let a = arr.remove();
  let b = arr.remove();

  result += a + b;
  arr.insert(a + b);
}

console.log(result);
