// program to count down numbers to 1
function countDown(number) {
    console.log(number);
    const newNumber = number - 1;
    if (newNumber > 0) {
        countDown(newNumber);
    }
}
let n=+prompt("Enter the value of n");
countDown(n);

// program to find the factorial of a number
function fact(x) {
    if (x === 0) {
        return 1;
    }
    else {
        return x * fact(x - 1);
    }
}

let num=+prompt("Enter the value of num: ");
if (num > 0) {
    let result = fact(num);
    console.log(`The factorial of ${num} is ${result}`);
}

//Program to find the sum of n numbers
function sum(n) {
    if (n <= 1) {
      return n;
    }
    return n + sum(n - 1);
  }
  let digit=+prompt("Enter the value of n: ");
  sum(digit);

//Program of linear sum of even numbers

function sumEven(number) {
    if (number===0) {
        return 0;
    } else if (number%2 !== 0) {
        return sumEven(number-1);
    }
    return number + sumEven(number-1);
}

let even=+prompt("Enter the number: ");
sumEven(even);

//program of number exponent

function pow(number, power) {
    if (power===1) {
        return number;
    }
    return number * pow(number, power-1);
}

pow(2,2);