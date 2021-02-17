class Tree {
  constructor(value = null, left, right) {
    this.val = value;
    this.left = left;
    this.right = right;
  }
}

/**
 *            40
 *           /  \
 *         39    10
 *        /  \   / \
 *       13  21  0
 */
// 最大堆
let t = new Tree(
  40,
  new Tree(39, new Tree(13), new Tree(21)),
  new Tree(10, new Tree(0))
);

class ProorityQueue {
  constructor() {
    this.data = [null];
    this.count = 0;
  }
  //   BFS遍历
  init(tree, queue = []) {
    // queue为辅助我们BFS的数据结构
    this.count === 0 ? queue.push(tree) : null;
    let temp = queue.shift();
    if (temp && temp.val !== null) {
      // 将遍历到的节点放入到data中
      this.data.push(temp.val);
      this.count++;
      queue.push(temp.left);
      queue.push(temp.right);
      this.init(temp, queue);
    }
  }
  // 插入值
  insert(item) {
    this.data[this.count + 1] = item;
    this.count++;
    this.siftUP(this.count);
  }
  // 返回最大值-堆顶元素
  extractMax() {
    let ret = this.data[1];
    this.swap(this.data, 1, this.count);
    this.count--;
    this.siftDown(1);
    return ret;
  }
  siftUP(k) {
    let temp = this.data[k]; //暂存最后一个新添加的元素
    while (k > 1 && this.data[Math.floor(k / 2)] < temp) {
      this.data[k] = this.data[Math.floor(k / 2)];
      k = Math.floor(k / 2);
    }
    this.data[k] = temp;
  }
  siftDown(k) {
    while (k * 2 <= this.count) {
      //如果左边有孩子---比较左孩子和右孩子，取大
      let h = 2 * k;
      if (h + 1 <= this.count && this.data[h + 1] > this.data[h]) {
        h = h + 1;
      }
      if (this.data[k] < this.data[h]) {
        this.swap(this.data, k, h);
      }
      //   更新下一轮的使用的变量
      k = k * 2;
    }
    this.data.splice(this.count + 1);
  }
  swap(q, l, r) {
    [q[l], q[r]] = [q[r], q[l]];
  }
}
let pQueue = new ProorityQueue();
pQueue.init(t);
console.log(pQueue.data, pQueue.count);
pQueue.insert(88);
// pQueue.insert(46);
// pQueue.insert(47);
// pQueue.insert(48);
// pQueue.insert(49);
console.log(pQueue.data, pQueue.count);
console.log(pQueue.extractMax());
console.log(pQueue.data, pQueue.count);
