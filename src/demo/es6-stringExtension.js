let total = 10;
let msg = passthru`The total is ${total} (${total * 1.5} with tax)`

// function passthru(literals) {
//   let result = '';
//   let i = 0;

//   while (i < literals.length) {
//     result +=literals[i++]
//     if (i < arguments.length) {
//       result +=arguments[i]
//     }
//   }

//   return result
// }

function passthru(literals, ...values) {
  let output = '';
  let index;
  
  for (index = 0; index < values.length; index++){
    output += literals[index] + values[index];
  }

  output += literals[index];
  return output;
}


console.log(msg)


