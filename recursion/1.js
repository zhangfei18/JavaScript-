/**
 * 树的递归：
 *
 */

//  例32- 树的递归表示
class Tree {
  constructor(v, children) {
    this.v = v;
    this.children = children || null;
  }
}

// 多叉树
/**
 *       10
 *      / | \
 *     5  3  2
 *       / \
 *      7  11
 */
let t = new Tree(10, [
  new Tree(5),
  new Tree(3, [new Tree(7), new Tree(11)]),
  new Tree(2),
]);

// 例33-树的遍历（先序）
function tree_transverse_f(tree) {
  console.log(tree.v);
  tree.children && tree.children.forEach(tree_transverse_f);
}

// 后序
function tree_transverse_l(tree) {
  tree.children && tree.children.forEach(tree_transverse_l);
  console.log(tree.v);
}

// 中序
function tree_transverse_m(tree, old = 0) {
  let transversed = false;
  if (!tree.children) {
    console.log(tree.v);
    return;
  }
  tree.children.forEach((child, i) => {
    // 该打印当前所有的child的父节点
    if (old === i) {
      console.log(tree.v);
    }
    // 继续遍历当前节点下的子节点们
    tree_transverse_m(child, old);
  });
  !transversed && console.log(tree.v);
}
// console.log("输的遍历log:", tree_transverse_m(t, 0));

// 例34-树的遍历-回调
function tree_transverse(tree, old = 0, callback) {
  let transversed = false;
  if (!tree.children) {
    callback(tree.v);
    return;
  }
  tree.children.forEach((child, i) => {
    if (old === i) {
      callback(tree.v);
    }
    tree_transverse(child, old);
  });
  !transversed && callback(tree.v);
}
// 例34-树的遍历-Iterator
function* tree_transverse_I(tree, old = 0) {
  let transversed = false;
  if (!tree.children) {
    yield tree;
    return;
  }
  for (let i = 0; i < tree.children.length; i++) {
    if (i === old) {
      transversed = true;
      yield tree;
    }
    yield* tree_transverse_I(tree.children[i], old);
  }
  if (!transversed) {
    yield tree;
  }
}
console.log(
  "输的遍历log:",
  [...tree_transverse_I(t, 0)].map((v) => v.v)
);

// 例36-树的查找---在树的遍历的基础上进行查找
function find(tree, prediction) {
  return [...tree_transverse_I(tree)].filter(prediction); //找出所有满足条件的元素
  // return [...tree_transverse_I(tree)].find(prediction);//找出第一个满足条件的元素
}
console.log(
  "树的查找：",
  find(t, (node) => {
    return node.v > 5;
  }).map((v) => {
    return v.v;
  })
);

// 例37-树的路径的查找---构造一个先序遍历的生成器，并返回路径
function* tree_transverse_path(tree, path = []) {
  yield { tree, path };
  if (tree.children) {
    for (let i = 0; i < tree.children.length; i++) {
      yield* tree_transverse_path(tree.children[i], [...path, i]);
    }
  }
}
function find_path(t, v) {
  for (let { tree, path } of tree_transverse_path(t)) {
    if (tree.v === v) {
      return path;
    }
  }
}
console.log("查找树的某个节点路径：", find_path(t, 11));

// 拓展：根据path查找某个节点
function find_by_path(tree, path) {
  return path.length === 0
    ? tree
    : find_by_path(tree.children[path[0]], path.slice(1));
}
console.log("根据路径查找节点:", find_by_path(t, [1, 1]).v);

// 例38-选择器
// 在例37的基础上增加了选择器解析： 如：[1, '[>5]']  -> [{child: 1}, {op: (x)=> x.v > 5}]

// 例39-css选择器

class DomTree {
  constructor(tag, className, children = [], val) {
    this.tag = tag;
    this.className = className;
    this.children = children;
    this.value = val;
  }
}
//创建一个树
let dT = new DomTree("div", "content", [
  new DomTree("table", "", [
    new DomTree("tr", "", [
      new DomTree("td", ""),
      new DomTree("td", ""),
      new DomTree("td", ""),
    ]),
  ]),
]);
function* transverse(node) {
  yield node;
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      yield* transverse(node.children[i]);
    }
  }
}

function find_by_className(node, className) {
  return [...transverse(node)].filter((node) => {
    return node.className === className;
  });
}
console.log("根据类名查找节点:", find_by_className(dT, "content"));

// 实现一个基于class和tag的简单的css选择器
// 表达式解析
function selection_expr_parse(expr) {
  return expr.split(" ").map((e) => {
    if (e[0] === ".") {
      return { className: e.substr(1) };
    } else {
      return {
        tagName: e,
      };
    }
  });
}
console.log("选择器解析器：", selection_expr_parse(".content tr td"));
