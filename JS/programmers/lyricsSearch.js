class Node {
  constructor() {
    this.count = 0;
    this.child = new Map();
  }

  cntUp = () => (this.count += 1);
  cntDown = () => (this.count -= 1);
}

class Trie {
  constructor() {
    this.root = new Map();
  }

  addNode = (word) => {
    if (!this.root.has(word.length)) this.root.set(word.length, new Node());

    let node = this.root.get(word.length);

    for (const ch of word) {
      if (!node.child.has(ch)) {
        node.child.set(ch, new Node());
      }

      node.cntUp();
      node = node.child.get(ch);
    }
  };

  findCnt = (word) => {
    if (!this.root.has(word.length)) return 0;

    let node = this.root.get(word.length);

    for (const ch of word) {
      if (ch === "?") return node.count;

      if (!node.child.has(ch)) return 0;

      node = node.child.get(ch);
    }
  };
}

function solution(words, queries) {
  var answer = [];

  const trie = new Trie();
  const backTrie = new Trie();

  words.forEach((word) => {
    trie.addNode(word);
    backTrie.addNode(word.split("").reverse().join(""));
  });

  queries.forEach((query) => {
    if (query[0] === "?") {
      answer.push(backTrie.findCnt(query.split("").reverse().join("")));
    } else {
      answer.push(trie.findCnt(query));
    }
  });

  return answer;
}
