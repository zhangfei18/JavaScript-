V8运行环境如果发现数据组是稀疏的，会用一个散列结构去存储数组， 如果发现数组是连续的就会使用连续的内存处理。