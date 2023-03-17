class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * @description 插入节点。和根节点比较，小于根节点往左边插入节点，大于根节点往右边插入节点。
   */
  insert(key) {
    var newNode = new Node(key);
    // 判断根节点是否为空，为空则直接插入
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /**
   * @description 递归比较根节点与要插入的节点。
   * @param root 
   * @param node 
   */
  insertNode(root, node) {
    if (root.key > node.key) { // 往左边查找插入的位置
      if (root.left !== null) {
        this.insertNode(root.left, node);
      } else {
        root.left = node;
      }
    } else { // 往右边查找插入的位置
      if (root.right !== null) {
        this.insertNode(root.right, node);
      } else {
        root.right = node;
      }
    }
  }

  /**
   * @description 先序遍历，根左右
   */
  preorderTraversal() {
    let result = [];
    this.preorderTraversalNode(this.root, result);
    return result;
  }

  preorderTraversalNode(node, result) {
    if (node === null) {
      return result;
    }
    result.push(node.key)
    this.preorderTraversalNode(node.left, result);
    this.preorderTraversalNode(node.right, result);
  }

  /**
   * @description 中序遍历，左根右
   * @returns result 把遍历后的数据放到数组中返回
   */
  inorderTraversal() {
    let result = [];
    this.inorderTraversalNode(this.root, result);
    return result;
  }

  inorderTraversalNode(node, result) {
    if (node === null) return result;
    this.inorderTraversalNode(node.left, result);
    result.push(node.key)
    this.inorderTraversalNode(node.right, result);
  }

  /**
   * @description 后序遍历，左右根
   */
  postorderTraversal() {
    let result = [];
    this.postorderTraversalNode(this.root, result);
    return result;
  }

  postorderTraversalNode(node, result) {
    if (node === null) return result;
    this.postorderTraversalNode(node.left, result);
    this.postorderTraversalNode(node.right, result);
    result.push(node.key);
  }

  /**
   * @description 寻找最小值。因为插入的时候，小值往左边插入，所以最小值在左边
   */
  min() {
    if (this.root === null) return null;
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current.key;
  }

  /**
   * @description 寻找最大值。因为插入的时候，大值往右边插入，所以最大值在右边
   */
  max() {
    if (this.root === null) return null;
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current.key;
  }

  /**
   * @description 根据key寻找节点，递归实现
   * @returns 返回节点
   */
  search(key) {
    return this.searchNode(this.root, key);    
  }
  searchNode (node, key) {
    if (node === null) return false;
    if (node.key > key) {
      return this.searchNode(node.left, key);
    } else if (node.key < key) {
      return this.searchNode(node.right, key);
    } else {
      return node;
    }
  }

  /**
   * @description 根据key寻找节点，循环实现
   * @returns 返回节点
   */
  search2(key) {
    let current = this.root;
    while (current !== null) {
      if (current.key > key) {
        current = current.left;
      } else if (current.key < key) {
        current = current.right;
      } else {
        return current;
      }
    }
    return false;
  }

  /**
   * @description 根据给定的key值删除节点
   */
  remove(key) {
    let parentNode = null;
    let currentNode = this.root;
    let isLeftChild = true;

    // 找到要删除的节点
    while(currentNode.key !== key) {
      parentNode = currentNode;
      if (currentNode.key > key) {
        isLeftChild = true;
        currentNode = currentNode.left;
      } else if (currentNode.key < key) {
        isLeftChild = false;
        currentNode = currentNode.right;
      }

      // 找到最后都没有找到相等的节点，返回false
      if (currentNode === null) {
        return false;
      }
    }

    // 删除的节点是叶子节点
    if (currentNode.left === null && currentNode.right === null) {
      // 判断是否为根节点
      if (currentNode === this.root) {
        this.root = null
      }

      if (isLeftChild) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
      return true;
    } 

    // 删除节点只有一个子节点，并且只有一个左子节点
    else if (currentNode.right === null) {
      if (currentNode === this.root) {
        this.root = currentNode.left;
      }
      if (isLeftChild) {
        parentNode.left = currentNode.left;
      } else {
        parentNode.right = currentNode.left;
      }
      return true;
    }

    // 删除节点只有一个子节点，并且只有一个右子节点
    else if (currentNode.left === null) {
      if (currentNode === this.root) {
        this.root = currentNode.right;
      }

      if (isLeftChild) {
        parentNode.left = currentNode.right;
      } else {
        parentNode.right = currentNode.right;
      }
      return true;
    }

    // 删除节点有两个子节点
    else {
      let successor = this.getSuccessor(currentNode);
      if (currentNode === this.root) {
        this.root = successor;
      } else if (isLeftChild) {
        parentNode.left = successor;
      } else {
        parentNode.right = successor;
      }
      successor.left = currentNode.left;
      return true;
    }
  }

  /**
   * @description 寻找后继节点，往左子树找到最大值替换delNode，或者往右子树找到最小值替换delNode
   * @param {*} delNode 
   */
  getSuccessor(delNode) {
    let successor = delNode;
    let successorParent = delNode;
    let current = delNode.right; // 往右找

    while (current) {
      successorParent = successor;
      successor = current;
      current = current.left;
    }

    // 判断找到的节点是否是要删除节点的直接右节点
    if (successor !== delNode.right) {
      successorParent.left = successor.right;
      successor.right = delNode.right;
    }

    return successor;
  }
}