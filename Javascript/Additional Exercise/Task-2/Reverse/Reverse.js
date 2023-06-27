let number = +prompt("Enter a number")
let result = 0;
while(number>0){
    rightmost = number%10;
    result = result*10 + rightmost;
    number = Math.floor(number/10);
}
console.log("Reversed number is : " + result)
