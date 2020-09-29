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
