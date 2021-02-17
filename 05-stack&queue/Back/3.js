/**
 *
 * @param {二维数组} grid
 * 本题的灵魂是利用DFS取数组里面尽心搜索，将搜索到的"1", 全部赋值"0",
 * 这样就可以一次性将一个岛夷为平地，从未算出全部的岛屿数量。
 */
function numIslands(grid) {
    let rows = grid.length;
    let cols = grid[0].length;
    let ret = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === "1") {
                helper(grid, i, j, rows, cols);
                ret++;
            }
        }
    }
    return ret;
}

function helper(grid, row, col, rows, cols) {
    if (row < 0 || row >= rows) return;
    if (col < 0 || col >= cols) return;
    if (grid[row][col] === "0") return;
    grid[row][col] = "0"; //将遍历过的陆地都移为平地
    helper(grid, row + 1, col, rows, cols);
    helper(grid, row - 1, col, rows, cols);
    helper(grid, row, col + 1, rows, cols);
    helper(grid, row, col - 1, rows, cols);
}
console.log(
    numIslands([
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
    ])
);