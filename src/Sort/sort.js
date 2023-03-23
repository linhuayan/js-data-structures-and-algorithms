export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
};

export function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function swap(array, a, b) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

export default class ArrayList {
  constructor() {
    this.array = [];
  }

  insert(item) {
    this.array.push(item);
  }

  toString() {
    return this.array.join('-');
  }

  /**
   * 冒泡排序
   */
  bubbleSort() {
    // for(let i = 0; i < this.array.length - 1; i++) {
    //   for (let j = 0; j < this.array.length - i - 1; j++) {
    //     if (this.array[j] > this.array[j+1]) {
    //      this._swap(j, j+1);
    //     }
    //   }
    // }

    // 外层循环控制趟数，内层循环控制比较次数
    // 第一次： j = length - 1，比较到倒数第一个位置
    // 第二次： j = length - 2，比较到倒数第二个位置
    for (let j = this.array.length - 1; j >= 0; j--) {
      // 第一次进来： i = 0, 比较0和1位置的两个数据，如果0位置大于1位置的数据
      // 最后一次进来：i = length - 2, 比较length - 2 和 length - 1的两个数据
      for (let i = 0; i < j; i++) {
        if (this.array[i] > this.array[i+1]) {
          this._swap(i, i+1);
        }
      }
    }
  }

  /**
   * 选择排序
   */
  selectionSort() {
    let min = 0;
    // 外层循环：从0位置开始取数据
    for (let j = 0; j < this.array.length - 1; j++) {
      // 内层循环：从j+1位置开始，和后面的数据进行比较
      min = j;
      for (let i = j + 1; i < this.array.length; i++) {
        if (this.array[min] > this.array[i]) {
          min = i;
        }
      }
      this._swap(j, min);
    }
  }

  /**
   * 插入排序
   */
  insertSort() {
    // 外层循环：从第1个位置开始获取数据，向前面局部有序进行插入
    for (let i = 1; i < this.array.length; i++) {
      // 把i位置的元素拿出来
      let temp = this.array[i];
      let j = i;
      // 内层循环：获取i位置的元素，和前面的数据依次进行比较
      while(this.array[j - 1] < temp && j > 0) {
        this.array[j] = this.array[j - 1];
        j--;
      }
      // 当temp大于j-1的位置时，把temp放在j位置即可
      // 将j位置的数据，放置temp
      this.array[j] = temp;
    }
  }

  /**
   * 希尔排序 （错误）只是进行两两交换，并没有按照间隔分组比较
   */
  // shellSort() {
  //   let length = this.array.length;
  //   let gap = Math.floor(length / 2);
  //   while(gap >= 1) {
  //     for (let i = gap; i < length; i++) {
  //       while(this.array[i-gap] > this.array[i]) {
  //         this._swap(i-gap, i);
  //       }
  //     }
  //     console.log(this.toString())
  //     gap = Math.floor(gap / 2);
  //   } 
  // }

  /**
   * 希尔排序
   */
  // i+gap不是只排了每组的第一个元素，i++才是每一组每一个元素都排序。
  shellSort() {
    // 1.获取数组的长度
    let length = this.array.length;
    // 2.初始化的增量（gap -> 间隔/间隙）
    let gap = Math.floor(length / 2);
    // 3.while循环（gap不断减小）
    while(gap >= 1) {
      // 4.以gap作为间隔，进行分组，对分组进行插入排序
      for (let i = gap; i < length; i++) {
        let temp = this.array[i];
        let j = i;
        while(this.array[j - gap] > temp && j > gap - 1) {
          this.array[j] = this.array[j - gap];
          j -= gap;
        }
        // 5.将j位置的元素赋值temp
        this.array[j] = temp;
      }
      console.log(this.toString())
      gap = Math.floor(gap / 2);
    }
  }

  /**
   * 快速排序
   */
  // quickSort() {
  //   this._quick(0, this.array.length - 1);
  // }

  // _quick(left, right) {
  //   if (left >= right) {
  //     return
  //   }
  //   let pivot = this._median(left, right);
  //   console.log('pivot', pivot);
  //   let i = left;
  //   let j = right - 1;
  //   while(true) {
  //     while(this.array[++i] < pivot) {}
  //     while(this.array[j--] > pivot) {}
  //     if (i < j) {
  //       this._swap(i, j);
  //     } else {
  //       break;
  //     }
  //   }
  //   this._swap(i, right - 1);
  //   this._quick(left, i - 1);
  //   this._quick(i + 1, right);
  // }

  // _median(left, right) {
  //   let center = Math.floor((left + right) / 2);
  //   if (this.array[left] > this.array[center]) {
  //     this._swap(left, center);
  //   }
  //   if (this.array[left] > this.array[right]) {
  //     this._swap(left, right)
  //   }
  //   if (this.array[center] > this.array[right]) {
  //     this._swap(center, right);
  //   }

  //   this._swap(center, right - 1);
  //   return this.array[right - 1];
  // }

   quickSort(array = this.array, compareFn = defaultCompare) {
    return this.quick(array, 0, array.length -1, compareFn);
  };

  quick(array, left, right, compareFn) {
    let index; // {1}
    if (array.length > 1) { // {2}
      index = this.partition(array, left, right, compareFn); // {3}
      if (left < index -1) { // {4}
        this.quick(array, left, index -1, compareFn); // {5}
      }
      if (index < right) { // {6}
        this.quick(array, index, right, compareFn); // {7}
      }
    }
    return array;
  };

  partition(array, left, right, compareFn) {
    const pivot = array[Math.floor((right + left) / 2)]; // {8}
    let i = left; // {9}
    let j = right; // {10}

    while (i <= j) { // {11}
      while (compareFn(array[i], pivot) === Compare.LESS_THAN) { // {12}
        i++;
      }
      while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) { // {13}
        j--;
      }
      if (i <= j) { // {14}
        swap(array, i, j); // {15}
        i++;
        j--;
      }
    }
    return i; // {16}
  }

  /**
   * 交换两个元素的位置
   */
  _swap(m, n) {
    let temp = this.array[n];
    this.array[n] = this.array[m];
    this.array[m] = temp;
  }
}