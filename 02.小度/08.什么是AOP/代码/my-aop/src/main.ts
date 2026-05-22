import { Before, After, Around } from "./aop";

class ExampleService {
  // @Before((name: string) => {
  //   console.log(`Before method execution: preparing to greet ${name}`);
  // })
  // @After((result: string, name: string) => {
  //   console.log(
  //     `After method execution: greeted ${name} with result "${result}"`
  //   );
  // })
  @Around((fn: Function, args: any[]) => {
    console.log("Around before method execution");
    const result = fn(...args); // 执行原始方法
    console.log("Around after method execution");
    return result;
  })
  greet(name: string): string {
    console.log(`Hello, ${name}!`);
    return `Hello, ${name}!`;
  }
}

const exampleService = new ExampleService();
const result = exampleService.greet("jack");
// console.log(result);
