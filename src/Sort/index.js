import ArrayList from "./sort";

const list = new ArrayList();
list.insert(81)
list.insert(94)
list.insert(11)
list.insert(96)
list.insert(12)
list.insert(35)
list.insert(17)
list.insert(95)
list.insert(28)
list.insert(58)
list.insert(41)
list.insert(45)

// console.log(list.bubbleSort())
// console.log(list.selectionSort())
// console.log(list.shellSort())
console.log(list.quickSort())
console.log(list.toString())
