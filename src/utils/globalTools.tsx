// * 重写打印日志
const originalLog = console.log;
console.log = function(...args) {
  // 在原始消息前加上时间戳，并设置样式
  // const timestamp = new Date().toISOString();
  // originalLog('\x1b[36m%s\x1b[0m', timestamp, ...args);
  originalLog('%c Hello World!', 'color: red; font-size: 20px;', ...args);
  
};