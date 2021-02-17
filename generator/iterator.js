/**
 * 生成器
 * yeild：终端生成器的执行
 * yeild*：执行另一个生成器
 * .next(value)： 执行下一个yeild
 *  *生成器可以通过yield接收next()的输入。这意味着您可以在新数据以异步方式到达时唤醒生成器，并且对生成器来说，它感觉像是以同步方式接收数据*
 * .return(value)：结束生成器的执行，返回的对象的value就是传入的参数。
 *
 * 协程：
 *  yeild就是挂起协程
 *  next就是唤醒协程
 */
function* generator1() {
  yield 1;
  yield 2;
}
function* generator2() {
  yield 3;
  yield 4;
  yield* generator1();
}

let i2 = generator2();
console.log(i2.next());
console.log(i2.next());
console.log(i2.return("888"));
console.log(i2.next());
console.log(i2.next());

/**
 * 应用：
 * generator3: 手动调用
 * generator4: 自动调用
 */
console.log("------generator3------");
function* generator3() {
  // 假的发送请求的方法
  function fetch(num) {
    setTimeout(() => {
      console.log(num);
      g3.next(num);
    }, num);
  }
  let r1 = yield fetch(1000);
  console.log("r1", r1);
  let r2 = yield fetch(2000);
  console.log("r2", r2);
}
let g3 = generator3();
g3.next();

console.log("------generator4------");
function* generator4() {
  let y1 = yield Promise.resolve(1);
  console.log(y1);
  let y2 = yield Promise.resolve(2);
  console.log(y2);
  let y3 = yield Promise.resolve(3);
  console.log(y3);
}
function run(generator) {
  let i = generator();
  function go(data) {
    let ret = i.next(data);
    if (ret.done) {
      return ret.value;
    }
    ret.value.then((val) => {
      go(val);
    });
  }
  go();
}

run(generator4);
