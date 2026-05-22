// import { Observable } from 'rxjs';

import { subscribe } from 'diagnostics_channel';
import { concatMap, filter, forkJoin, from, map, of } from 'rxjs';

// // 创建一个简单的Observable
// const observable = new Observable((subscriber) => {
//   subscriber.next('hello');
//   subscriber.next('world');
//   subscriber.complete();
// });

// // 订阅Observable
// observable.subscribe({
//   next: (x) => console.log(x),
//   complete: () => console.log('complete!'),
// });

// --------------------------------------
// const observable = of(1, 2, 3, 4, 5);
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

// from(promises)
//   .pipe(concatMap((promise) => from(promise)))
//   .subscribe({
//     next(value) {
//       console.log(value);
//     },
//     complete() {
//       console.log('complete!');
//     },
//   });

// forkJoin(promises).subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log('complete!');
//   },
// });

of(1, 2, 3, 4, 5)
  .pipe(map((value) => value * value))
  .pipe(filter((value) => value % 2 !== 0))
  .subscribe((value) => console.log(value));
