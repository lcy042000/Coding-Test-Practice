function Node(value) {
  this.prev = null;
  this.value = value;
  this.next = null;
}

class List {
  constructor(n, k) {
    this.length = 0;
    this.curNode = null;
    this.trash = [];

    this.init(n, k);
  }

  init(n, k) {
    const newNode = new Node(0);
    let prevNode = newNode;
    this.length++;

    if (k === 0) {
      this.curNode = newNode;
    }

    for (let i = 1; i < n; i++) {
      const node = new Node(i);

      prevNode.next = node;
      node.prev = prevNode;

      prevNode = node;

      this.length++;

      if (i === k) {
        this.curNode = node;
      }
    }
  }

  moveUp(x) {
    for (let i = 0; i < x; i++) {
      this.curNode = this.curNode.prev;
    }
  }

  moveDown(x) {
    for (let i = 0; i < x; i++) {
      this.curNode = this.curNode.next;
    }
  }

  delete() {
    const next = this.curNode.next;
    const prev = this.curNode.prev;
    const temp = this.curNode;

    this.curNode = next ? next : prev;

    if (next && prev) {
      next.prev = prev;
      prev.next = next;
    } else if (next) {
      next.prev = null;
    } else if (prev) {
      prev.next = null;
    }

    this.length--;
    this.trash.push(temp);
  }

  restore() {
    const node = this.trash.pop();

    const prev = node.prev;
    const next = node.next;

    this.length++;

    if (prev && next) {
      prev.next = node;
      next.prev = node;
    } else if (prev) {
      prev.next = node;
    } else if (next) {
      next.prev = node;
    }
  }

  print(n) {
    const arr = Array(n).fill(true);

    this.trash.forEach((v) => {
      arr[v.value] = false;
    });

    return arr.map((v) => (v ? "O" : "X")).join("");
  }
}

function solution(n, k, cmd) {
  var answer = "";

  const list = new List(n, k);

  cmd.forEach((v) => {
    const [c, x] = v.split(" ");

    switch (c) {
      case "D":
        list.moveDown(Number(x));
        break;
      case "U":
        list.moveUp(Number(x));
        break;
      case "C":
        list.delete();
        break;
      case "Z":
        list.restore();
        break;
    }
  });

  return list.print(n);
}
