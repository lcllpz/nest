import { subscribe } from 'diagnostics_channel';
import { concatMap, filter, forkJoin, from, map, Observable, of } from 'rxjs';

// // 创建一个简单的Observable
// const observable = new Observable((subscriber) => {
//   subscriber.next('hello');
//   subscriber.next('world');
//   subscriber.complete();
// });

// // 订阅Observable
// observable.subscribe({
//   next: (x) => console.log("x-->",x),
//   complete: () => console.log('complete!-->'),
// });

// --------------------------------------
// of 用来创建一个 Observable，并按顺序同步发出你传入的每一个值，发完后自动 complete。
// const observable = of(1, 2, 3, 4, 5);
// 用已有数据快速造一条「发几个数就结束」的 Observable
// 手里已经是一个个要发的值，直接包成流
// const observable = of([1, 2, 3, 4, 5]);
// observable.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log('complete!');
//   },
// });
// --------------------------------------

// const promise = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('hello world!');
//   }, 1000);
// });

// const observable = from(promise);

// observable.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log('complete!');
//   },
// });

// --------------------------------------

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello');
  }, 500);
});

const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('world');
  }, 2000);
});

const promise3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('!');
  }, 1500);
});

const promises = [promise1, promise2, promise3];
// from 你手里是 Promise、数组、类数组、Iterable、Observable 等，先适配成流再发。
// from = 把 Promise、数组等「可转成序列/单次结果」的来源适配成 Observable
// from(promises)
// of(...promises)
//   .pipe(concatMap((promise) => from(promise)))
//   .subscribe({
//     next(value) {
//       console.log(value);
//     },
//     complete() {
//       console.log('complete!');
//     },
//   });

// forkJoin 用来并行等待多个 Observable（或 Promise）全部完成，最后只发出一次结果（通常是数组或对象），然后 complete。
forkJoin(promises).subscribe({
  next(value) {
    console.log(value);
  },
  complete() {
    console.log('complete!');
  },
});

// of(1, 2, 3, 4, 5)
//   .pipe(map((value) => value * value))
//   .pipe(filter((value) => value % 2 !== 0))
//   .subscribe((value) => console.log(value));
