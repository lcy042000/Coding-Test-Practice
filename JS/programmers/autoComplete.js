class Node {
  constructor(word) {
    this.word = word;
    this.children = new Map();
    this.count = 0;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert = (word) => {
    let curNode = this.root;
    curNode.count += 1;

    for (const char of word) {
      if (!curNode.children.has(char)) {
        curNode.children.set(char, new Node(curNode.word + char));
      }

      curNode = curNode.children.get(char);
      curNode.count++;
    }
  };

  getCount = (word) => {
    let cnt = 0;
    let curNode = this.root;

    for (const char of word) {
      cnt++;

      curNode = curNode.children.get(char);
      if (curNode.count === 1) break;
    }

    return cnt;
  };
}

function solution(words) {
  var answer = 0;

  const trie = new Trie();

  for (const word of words) {
    trie.insert(word);
  }

  for (const word of words) {
    answer += trie.getCount(word);
  }

  return answer;
}
