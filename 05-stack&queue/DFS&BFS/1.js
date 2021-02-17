/**
 * 数组展平------
 */
let arr = [1, 2, 3, [4, [5, [6]]]];
// 使用递归
function flattern(arr) {
  return [].concat(
    ...arr.map((item) => {
      if (item.constructor === Array) {
        return flattern(item);
      } else {
        return item;
      }
    })
  );
}
console.log(flattern(arr));
// 使用栈
function flattern2(arr) {
  let stack = [];
  let ret = [];
  stack = arr.slice();
  while (stack.length) {
    let item = stack.shift();
    if (item.constructor === Array) {
      stack = stack.concat(item);
    } else {
      ret.push(item);
    }
  }
  return ret;
}
console.log(flattern2(arr));
// 使用Generator
function* flatternG(arr) {
    let stack = [];
    stack = arr.slice();
    while (stack.length) {
      let item = stack.shift();
      if (item.constructor === Array) {
        stack = stack.concat(item);
      } else {
          yield item;
      }
    }
  }
  const it = flatternG(arr)
  console.log([...it]);
