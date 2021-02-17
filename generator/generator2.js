/**
 * generator种类：
 */
// function* genFunc() {
//   //...
// }
// const genFunc = function* () {
//   //...
// };
// const obj = {
//   genFunc() {
//     //...
//   },
// };
// class Myclass {
//   genFunc() {
//     //...
//   }
// }
/**
 * 使用：
 */
// 迭代器
// function* objectEntries(obj) {
//   const propKeys = Reflect.ownKeys(obj);
//   for (const propKey of propKeys) {
//     yield [propKey, obj[propKey]];
//   }
// }
// const web = { js: "闭包", vue: "响应式", es6: "generator" };
// for (const [key, value] of objectEntries(web)) {
//   console.log(`${key}: ${value}`);
// }

// 更简单的异步代码

/**
 * 一、生成器作为迭代器（数据生产者）
 */
// 可迭代的三种方式
// function* genFunc() {
//   yield "a";
//   yield "b";
// }
// //  for...of
// for (const x of genFunc()) {
//   console.log(x);
// }
// // ... spread
// [...genFunc()];
// // 结构
// const [a, b] = genFunc();

// 从内部return
// function* genFuncWithReturn() {
//     yield 'a';
//     yield 'b';
//     return 'result';
// }

/**
 * 从生成器引发异常
 * 总结：
 *  .next()可以产生三种不同的结果：
 *      对于迭代序列中的项目x, 它返回{value: x, done: false}
 *      对于返回值z的迭代序列，它返回{value:z, done: true}
 *      对于生成器函数内部抛出的异常： 它返回异常
 */

function* genFunc() {
  //   throw new Error("出错了");
}
const it = genFunc();
it.next(); // Uncaught Error: 出错了

// 迭代属性

// yield* 其后面不必是一个生成器对象，可以使任何可迭代的对象
function* bar() {
  yield "a";
  yield* ["b", "c"];
  yield "d";
}
const arr = [...bar()]; //["a", "b", "c", "d"]

// 迭代树

class BinaryTree {
  constructor(v, left, right) {
    this.value = v;
    this.left = left;
    this.right = right;
  }
  *[Symbol.iterator]() {
    yield this.value;
    if (this.left) {
      yield* this.left;
    }
    if (this.right) {
      yield* this.right;
    }
  }
}
/**
 *       a
 *      / \
 *     b   e
 *    / \
 *   c   d
 */
const btree = new BinaryTree(
  "a",
  new BinaryTree("b", new BinaryTree("c"), new BinaryTree("d")),
  new BinaryTree("e")
);
for (const x of btree) {
  console.log("在树中遍历", x);
}

/**
 * 生成器作为观察者（消耗数据）
 */

//  1、通过next()发送值
// 注意：当使用生成器作为观察者时，需要注意的是，第一次调用next（）的唯一目的是启动观察者。它只为以后的输入做好准备，因为第一次调用会将执行提前到第一次。因此，通过first next（）发送的任何输入都将被忽略：
function* dataComsumer() {
  console.log("start");
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return "result";
}
const genObj = dataComsumer();
console.log(genObj.next()); //第一次只是为了启动
console.log(genObj.next(1));
console.log(genObj.next(2));

//  2、通过return()终止生成器