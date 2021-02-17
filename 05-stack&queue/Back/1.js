/**
 *全排列
 */
function fullPermutation(nums) {
    let len = nums.length;
    let ret = [];
    if (len <= 1) return ret;
    dfs(nums, 0, [], [], ret);

    function dfs(nums, depth, path, used, ret) {
        if (len === depth) {
            ret.push(path.slice());
            return;
        }
        for (let i = 0; i < len; i++) {
            if (used[i]) continue;
            path.push(nums[i]);
            used[i] = true;
            dfs(nums, depth + 1, path, used, ret);
            //当某一分支遍历到底部的时候，也就是递归开始出栈的时候，开始吧状态重置回上一次的状态，为下一个分支左准备
            used[i] = false;
            path.pop();
        }
    }
    return ret;
}
console.log(fullPermutation([1, 2, 3]));

/**
 * 括号生成：
 *
 */

function generateParenthesis(n) {
    let ret = [];
    if (n === 0) return ret;
    dfs("", n, n, ret);
    /**
     *
     *
     * @param {*} curStr 当前路径组拼接后的字符串
     * @param {*} left 左括号剩余的数量
     * @param {*} right 有括号剩余的数量
     * @param {*} ret 存放结果的数组
     * @return {*}
     */
    function dfs(curStr, left, right, ret) {
        if (left === 0 && right === 0) {
            ret.push(curStr);
            return;
        }
        // 直接剪枝
        if (left > right) return;
        // 因为一共就两个分支， 所以就不需要循环递归了
        if (left > 0) {
            dfs(curStr + "(", left - 1, right, ret);
        }
        if (right > 0) {
            dfs(curStr + ")", left, right - 1, ret);
        }
    }
    return ret;
}

console.log(generateParenthesis(3));

/**
 * 电话号码：
 */
function phone_numbers(digits) {
    if (!digits.length) return [];
    let len = digits.length;
    let mp = new Map();
    mp.set("2", "abc");
    mp.set("3", "def");
    mp.set("4", "ghi");
    mp.set("5", "jkl");
    mp.set("6", "mno");
    mp.set("7", "pqrs");
    mp.set("8", "tuv");
    mp.set("9", "wxyz");
    let ret = [];

    function dfs(depth, curStr) {
        console.log(depth);
        if (depth >= len) {
            ret.push(curStr);
            return;
        }
        let temp = mp.get(String(digits[depth]));
        console.log(temp);

        for (let i = 0; i < temp.length; i++) {
            dfs(depth + 1, curStr + temp[i]);
            // 如果需要回溯就需要进行状态回溯，
            // 如果上面的递归调用dfs的时候使用的是dfs(++depth), 那么就需要状态回溯，
            // 如果是dfs(depth+1), 那么就不需要状态回溯
        }
    }
    dfs(0, "");
    return ret;
}
console.log(phone_numbers([2, 3]));
/**
 * 字母大小写
 * 树中的每一层都和递归调用栈的每一层是对应的，
 * 每一个分支代表该层要调用几次递归函数
 */
function b_m_string(str) {
    let strArray = str.split("");
    let len = strArray.length;
    let ret = [];
    dfs(0, "");

    function dfs(i, curStr) {
        if (i === len) {
            ret.push(curStr);
            return;
        }
        if (isNaN(strArray[i])) {
            //当前字符是 字符串
            // 因为是字符串， 必定会产生两个分支
            // 分支①
            dfs(i + 1, curStr + strArray[i]);
            // 分支②
            strArray[i].charCodeAt() < 97 ?
                dfs(i + 1, curStr + strArray[i].toLocaleLowerCase()) :
                dfs(i + 1, curStr + strArray[i].toLocaleUpperCase());
        } else {
            //当前字符是 数字
            dfs(i + 1, curStr + strArray[i]);
        }
    }
    return ret;
}

console.log(b_m_string("1a2b"));