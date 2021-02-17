/**
 * 字符查找：
 */

function exist(board, word) {
    if (board.length === 0 || word.length === 0) {
        return false;
    }
    let rows = board.length;
    let cols = board[0].length;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // 从board数组中的每一个元素都出发一次寻找， 只要有一条路成功了，最后的结果返回的就是true
            if (DFS(board, word, i, j, 0, rows, cols)) {
                return true;
            }
        }
    }
    return false;
}

function DFS(board, word, row, col, cur, rows, cols) {
    // 边界检查
    if (row >= rows || row < 0) {
        return false;
    }
    if (col >= cols || col < 0) {
        return false;
    }

    let item = board[row][col];

    if (item !== word[cur]) {
        return false;
    }
    //  走到这说明一>探索到最后一个元素，如果相等，返回true
    if (cur + 1 === word.length) return true;
    //   将本次遍历过的元素赋值为空， 避免下次递归遍历再次查找这个元素，进行无限递归
    board[row][col] = null;
    let res =
        DFS(board, word, row + 1, col, cur + 1, rows, cols) ||
        DFS(board, word, row - 1, col, cur + 1, rows, cols) ||
        DFS(board, word, row, col + 1, cur + 1, rows, cols) ||
        DFS(board, word, row, col - 1, cur + 1, rows, cols);
    //   回溯（因为是引用数据类型，所以需要回溯）
    board[row][col] = item;
    return res;
}
console.log(
    exist(
        [
            ["z", "h", "a"],
            ["a", "b", "n"],
            ["f", "e", "g"],
        ],
        "zhang"
    )
);