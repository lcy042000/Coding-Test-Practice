function solution(n, k, enemy) {
  if (enemy.length <= k) {
    return enemy.length;
  }

  class PriorityQueue {
    constructor() {
      this.heap = [];
    }

    push(value) {
      const heap = this.heap;
      heap.push(value);
      let index = heap.length - 1;
      let parent = Math.floor((index - 1) / 2);

      while (index > 0 && heap[index] < heap[parent]) {
        [heap[index], heap[parent]] = [heap[parent], heap[index]];
        index = parent;
        parent = Math.floor((index - 1) / 2);
      }
    }

    pop() {
      const heap = this.heap;
      if (heap.length <= 1) {
        return heap.pop();
      }

      const output = heap[0];
      heap[0] = heap.pop();
      let index = 0;

      while (index * 2 + 1 < heap.length) {
        let left = index * 2 + 1,
          right = index * 2 + 2,
          next = index;

        if (heap[next] > heap[left]) {
          next = left;
        }

        if (right < heap.length && heap[next] > heap[right]) {
          next = right;
        }

        if (next === index) {
          break;
        }

        [heap[index], heap[next]] = [heap[next], heap[index]];
        index = next;
      }

      return output;
    }
  }

  let sum = 0;
  const queue = new PriorityQueue();
  enemy.slice(0, k).forEach((v) => queue.push(v));

  for (let i = k; i < enemy.length; i++) {
    queue.push(enemy[i]);
    const min = queue.pop();
    if (sum + min > n) {
      return i;
    }
    sum += min;
  }

  return enemy.length;
}
