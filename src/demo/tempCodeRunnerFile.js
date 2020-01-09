// console.log(Object.prototype.toString.call([1,2]))
let a = {
    toString(){
        console.log('toString')
        return '2'
    },
    // valueOf(){
    //     console.log('valueOf')
    //     return 2
    // },
    // [Symbol.toPrimitive](){
    //     return 3
    // }
}
console.log(a+'1')