function swap(arr, l, r) {
  [arr[l], arr[r]] = [arr[r], arr[l]];
}
function partition(arr, lo, hi) {
  const povit = arr[hi - 1];
  let i = lo;
  let j = hi - 1;
  while (i !== j) {
    if (arr[i] <= povit) {
      i++;
    } else {
      swap(arr, i, --j);
    }
  }
  swap(arr, i, hi - 1);
  return i;
}

function qSort(arr, lo = 0, hi = arr.length) {
  if (hi - lo <= 1) return arr;
  let p = partition(arr, lo, hi);
  qSort(arr, lo, p);
  qSort(arr, p+1, hi);
}

let arr = [20, 30, 10, 80, 50, 60, 30];
qSort(arr, 0, arr.length);
console.log(arr);
