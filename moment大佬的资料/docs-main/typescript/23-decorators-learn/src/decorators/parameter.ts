export function logParameter(
  target: any,
  methodName: string,
  parameterIndex: number
) {
  console.log(
    `类 ${target.constructor.name} 的方法 ${methodName} 的第 ${parameterIndex} 个参数被装饰`
  );
}
