/**
 * 
 * @param {*} nums 
 * 计数排序很骚啊，借用一个数组空间很完美的将无序的数组，改为有序的了！
 */
function cSort(nums) {
  if (nums.length < 2) return nums;
  let counts = Array(Math.max(...nums) + 1).fill(0); //[0,0,0,0,0,0,0]
  for (let i = 0; i < nums.length; i++) {
    counts[nums[i]]++;
  }
  //counts => [0,1,1,1,1,1,1]
  let dIndex = 0;
  let ret = [];
  for (let i = 0; i < counts.length; i++) {
    let count = counts[i];
    if (count > 0) {
      ret[dIndex++] = i;
    }
    count--;
  }
  return ret;
}

console.log(cSort([6, 4, 3, 5, 2, 1]));
