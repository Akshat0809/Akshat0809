const number = prompt("Enter a positive integer");
const numberOfDigits = number.length;
let sum = 0;

let temp = number;
while (temp > 0) {
    let remainder = temp % 10;
    sum += remainder ** numberOfDigits;
    temp = parseInt(temp / 10);
}

if (sum == number) {
    document.write(`${number} is an Armstrong number`);
}
else {
    document.write(`${number} is not an Armstrong number.`);
}