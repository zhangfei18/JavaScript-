/**
 * 使用栈实现DFS和BFS
 */

//  DFS
function depth_first_search(node) {
  let stack = [node];
  let ret = [];
  while (stack.length) {
    let item = stack.shift();
    ret.push(item.tagName);
    if (item.children) {
      for (let i = item.children.length - 1; i >= 0; i--) {
        stack.unshift(item.children[i]);
      }
    }
  }
  return ret;
}
console.log(depth_first_search(document.querySelector(".root")));
// 使用Generator
function* depth_first_search_g(node) {
  let stack = [node];
  while (stack.length) {
    let item = stack.shift();
    yield item.tagName;
    if (item.children) {
      for (let i = item.children.length - 1; i >= 0; i--) {
        stack.unshift(item.children[i]);
      }
    }
  }
}
console.log([...depth_first_search_g(document.querySelector(".root"))]);

//   BFS---用队列
function breadth_first_search(node) {
  let queue = [node];
  let ret = [];
  while (queue.length) {
    let item = queue.shift();
    ret.push(item.tagName);
    if (item.children) {
      for (let i = 0; i <= item.children.length - 1; i++) {
        queue.push(item.children[i]);
      }
    }
  }
  return ret;
}
console.log(breadth_first_search(document.querySelector(".root")));

// BFS-Generator
function* breadth_first_search_g(node) {
  let queue = [node];
  let ret = [];
  while (queue.length) {
    let item = queue.shift();
    yield item.tagName
    if (item.children) {
      for (let i = 0; i <= item.children.length - 1; i++) {
        queue.push(item.children[i]);
      }
    }
  }
}

console.log([...breadth_first_search_g(document.querySelector(".root"))])
