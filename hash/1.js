/**
 * 常用的散列函数：
 *  处理整数 k % M
 *  处理浮点数 binary_value(k) % M
 *  处理字符串
 */

//  求出 eat ate eta 是不是包含了相同的字母
function h_str(str, M) {
    return [...str].reduce((hash, v) => {
        return (31 * hash + v.charCodeAt(0)) % M;
    }, 0);
}

function binary_value(val) {
    const farr = new Float32Array(1);
    console.log(farr, "farr");
    farr[0] = val;
    const intBytes = new Int8Array(farr.buffer);
    console.log(intBytes, "intBytes");
    const view = new DataView(intBytes.buffer);
    console.log(view, "view");
    console.log(view.getUint32(), "getUint32");
    return view.getUint32();
}