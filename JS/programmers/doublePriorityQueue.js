class Queue {
  constructor() {
    this.queue = [];
  }

  insert(num) {
    if (this.queue.length === 0) {
      this.queue.push(num);
    } else {
      const idx = this.findIndex(num);

      this.queue.splice(idx, 0, num);
    }
  }

  findIndex(num) {
    let max = this.queue.length - 1;
    let min = 0;

    while (min <= max) {
      const mid = parseInt(min + max);

      if (this.queue[mid] < num) {
        max = mid - 1;
      } else if (this.queue[mid] === num) {
        return mid;
      } else {
        min = mid + 1;
      }
    }

    return min;
  }

  maxPop() {
    return this.queue.shift();
  }

  minPop() {
    return this.queue.pop();
  }

  peekMax() {
    return this.queue[0];
  }

  peekMin() {
    return this.queue[this.queue.length - 1];
  }
}

function solution(operations) {
  var answer = [];

  let insert = 0;
  let d = 0;

  const queue = new Queue();

  operations.forEach((v) => {
    const [oper, num] = v.split(" ");

    if (oper === "I") {
      insert++;

      queue.insert(Number(num));
    } else {
      d++;

      num > 0 ? queue.maxPop() : queue.minPop();
    }
  });

  if (insert <= d) return [0, 0];

  answer = [queue.peekMax(), queue.peekMin()];

  return answer;
}
