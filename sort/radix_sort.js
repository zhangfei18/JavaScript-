/**
 *
 * @param {*} nums
 * 解题关键： 如何求多位数的每一位
 * 方法： 求个位数 ~~（n % 10 / 1） ~~为向下取整的意思
 * 方法： 求十位数 ~~ （n % 100 / 10）
 * 方法： 求百位数 ~~（ n % 1000 / 100）
 */
function radix_sort(nums) {
  let max = Math.max(...nums);
  let counts = Array.from({ length: 10 }, () => []);
  let m = 1;
  while (m < max) {
    nums.forEach((number) => {
      let digit = ~~((number % (m * 10)) / m);
      counts[digit].push(number);
    });
    let j = 0;
    counts.forEach((count) => {
      while (count.length) {
        nums[j++] = count.shift();
      }
    });
    m *= 10;
  }
}
let nums = [100, 44, 555, 66, 768, 990];
radix_sort(nums);
console.log(nums);
