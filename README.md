# Code Challenge - Crispy Dollop

### Problem:

Create a function that returns the next bigger number using the same digits from a given number. Return -1 if the digits can't be rearranged to form a bigger number.

### Solution:

- written in javascript.

First, split the number into 2 parts, left and right. The right start from including the last 2 digits of the number.

Then, check if the right is the biggest number possible by comparing the first 2 digits of the right. (this is enough as we are using recursion here, the remaining digits has already been compared.) If yes, include more digits. If no, keep the first digit and sort the remaining digits in ascending, then swap the first digit with the next bigger number.

At the end, concatenate the right with the left.

```
const nextNumber = (num) => {
  // split the number into left side and right side. The size of right side start with 2 digits.
  const [left, right] = splitNum(String(num).split(""), 2);

  // if left doesn't exist, return -1
  if (!left) return -1;

  return Number(left.concat(processRight(right)).join(""));
};

const splitNum = (digits, rightSize) => {
  // if the size required is bigger than the digits length, return []
  if (rightSize > digits.length) return [];

  // the right includes the last right size digits
  const right = digits.slice(-rightSize);

  // if the first digit of right is smaller than the second digit, return the left side digits and right side digits
  if (right[0] < right[1]) return [digits.slice(0, -rightSize), right];

  //if none of the above works, splitNum again with bigger rightSize
  return splitNum(digits, rightSize + 1);
};

const processRight = (right) => {
  const firstDigit = right[0];

  // remove the first digit and sort the remaining digits from smallest to largest
  const rest = right.slice(1).sort();

  // find the index of the first digit that is bigger than first digit.
  const i = rest.findIndex((n) => n > firstDigit);

  // swap the position of the number with first digit
  const firstBiggerDigit = rest[i];
  rest[i] = firstDigit;
  return [firstBiggerDigit].concat(rest);
};
```
