/**
 *
 * @param {要排序的属数组} nums
 * @param {桶的数量} k
 * @param {每个桶的容量} s
 * 1.将每个元素放入桶中
 * 2.排序每个桶
 * 3.取出桶中的元素
 */
function bucket_sort(nums, k, s) {
  const buckets = Array.from({ length: k }, () => []);
  //   将每个元素放入桶中
  nums.forEach((num) => {
    let index = ~~(num / s);
    buckets[index].push(num) ;
  });
  //   给每个桶中的元素排序-使用插入排序（因为插入排序的空间复杂度是O(1)）
  buckets.forEach((bucket) => {
    insertion_sort(bucket);
  });
  return [].concat(...buckets);
}
function insertion_sort(A) {
  for (let i = 1; i < A.length; i++) {
    let p = i - 1;
    let x = A[i];
    while (p >= 0 && x < A[p]) {
      A[p + 1] = A[p];
      p--;
    }
    A[p + 1] = x;
  }
}

const A = [29, 25, 3, 49, 9, 37, 21, 43];
console.log(bucket_sort(A, 5, 10));
