const input = document.querySelector("input");
const numKey = document.querySelectorAll(".num--key");
const eqKey = document.querySelector(".eq--key");
const clear = document.querySelector(".op--key[op=clear]");
const negate = document.querySelector(".op--key[op=negate]");

// numKey.forEach((el) => {
//   el.onClick = () =>
//     ($input.value =
//       $input.value !== "0" ? $input.value + el.innerText : el.innerText);
// });

numKey.forEach((e) => {
  e.addEventListener("click", inputText);

  function inputText() {
    if (input.value !== "0") {
      input.value = input.value + e.innerText;
    } else {
      input.value = e.innerText;
    }
  }
});

const buffer = [];

const opCallback = (opName) => () => {
  let currentVal = parseFloat(input.value);

  if (opName === "percent") {
    currentVal *= 0.01;
    input.value = currentVal;
  } else {
    if (buffer && buffer.length) {
      buffer.push({ value: currentVal });

      const result = evaluate(buffer);

      buffer.push({ value: result });
      buffer.push({ value: opName });

      input.value = "";
    } else {
      buffer.push({ value: currentVal });
      buffer.push({ value: opName });
      input.value = "";
    }
  }
};

const evaluate = (buffer) => {
  const secondOperand = buffer.pop().value;
  const operator = buffer.pop().value;
  const firstOperand = buffer.pop().value;

  switch (operator) {
    case "add":
      return firstOperand + secondOperand;
      break;
    case "subtract":
      return firstOperand - secondOperand;
      break;
    case "multiply":
      return firstOperand * secondOperand;
      break;
    case "divide":
      return firstOperand / secondOperand;
      break;
    default:
      return secondOperand;
  }
};

for (const opName of ["add", "subtract", "multiply", "divide", "percent"]) {
  document
    .querySelector(`.op--key[op=${opName}]`)
    .addEventListener("click", opCallback(opName));
}

eqKey.addEventListener("click", () => {
  if (buffer && buffer.length) {
    buffer.push({ value: parseFloat(input.value) });
    input.value = evaluate(buffer);
    console.log(evaluate(buffer));
  }
});

clear.addEventListener("click", () => {
  input.value = 0;
  buffer.length = 0;
});

negate.addEventListener("click", () => {
  input.value = -parseFloat(input.value);
});
