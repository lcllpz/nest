function before(fn, beforeFn) {
  return function (...args) {
    beforeFn(...args); // 执行增强逻辑（例如：日志、验证等）
    return fn(...args); // 执行原函数
  };
}

function after(fn, afterFn) {
  return function (...args) {
    const result = fn(...args); // 执行原函数
    afterFn(result, ...args); // 执行增强逻辑（例如：修改结果、日志等）
    return result;
  };
}

function around(fn, aroundFn) {
  return function (...args) {
    return aroundFn(fn, args); // 在原函数执行前后插入逻辑
  };
}

// 原始函数
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Hello, ${name}!`;
}

// 增强：在函数执行前输出日志
const greetWithBefore = before(greet, (name) => {
  console.log(`About to greet: ${name}`);
});

// 增强：在函数执行后输出日志
const greetWithAfter = after(greet, (result, name) => {
  console.log(`Greeted ${name} with result: ${result}`);
});

// 增强：围绕函数执行进行操作（例如修改参数、修改返回值等）
const greetWithAround = around(greet, (fn, args) => {
  console.log('Around before');
  const result = fn(...args); // 执行原始函数
  console.log('Around after');
  return result;
});

// 执行
greetWithBefore('jack');
console.log("---------------------------")
greetWithAfter('rose');
console.log("---------------------------")
greetWithAround('bob');