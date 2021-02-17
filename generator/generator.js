/**
 * 例20-迭代器的遍历
 */
const s = new Set([1, 2, 3]);
const it = s.values();
console.log(it);

// 第一种：使用while循环
let val = null;
while (!(val = it.next()).done) {
  console.log(val);
}

// 第二种：使用拓展运算符-重点
const it2 = s.values();
console.log([...it2]);

// 第三种：使用for...of-重点
const it3 = s.values();
for (let val of it3) {
  console.log(val);
}

// 第四种：
let it4 = s.values();
let arr = Array.from(Array(3), it4.next, it4).map((v) => {
  return v.value;
});
console.log(arr);
/**
 *例21-生成器构造无穷斐波那契数列
 */
function* fibonacci() {
  let a = 1;
  let b = 1;
  yield a;
  yield b;
  while (true) {
    let t = b;
    b = a + b;
    a = t;
    yield b;
  }
}
const fIt = fibonacci();
let fArr = Array.from(Array(10), fIt.next, fIt).map((n) => {
  return n.value;
});
console.log("用迭代器生成斐波那契数列:", fArr);

/**
 * 例22-数组展平的生成器实现
 */

function* flatten(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      yield* flatten(arr[i]);
    } else {
      yield arr[i];
    }
  }
}
console.log(...flatten([1, 2, [3, 4, 5, [6, 7, 8]], 9]));

/**
 * 例23-Generator异步语法
 */
function request(url) {
  return (cb) => {
    setTimeout(() => {
      cb(Math.random());
    }, 1000);
  };
}

create_runner(function* () {
  const val1 = yield request("some url");
  const val2 = yield request("some url");
  console.log(val1, val2);
})();

function create_runner(genFunc) {
  const it = genFunc();
  function run(data) {
    const itVal = it.next(data); //{value: '', done: ''}
    if (!itVal.done) {
      itVal.value(run);
    }
  }
  return run;
}
/**
 * 原理总结：
 * 其实就是我们在外部收到生成器每一个yield后面的值，然后我们在通过next将这个值传递回生成器函数里面。
 * 注意：是从第二个next方法才开始往生成器里面传值的。
 */
