// import { delay } from 'https://deno.land/std@0.202.0/async/delay.ts';

// interface IRequest {
//   url: string;
//   promise: Promise<any>;
//   resolve: (value: any) => void;
// }

// const _queue: IRequest[] = [];

// const request = (url: string) => {
//   let promise = undefined as unknown as Promise<any>;
//   promise = new Promise((resolve) => {
//     _queue.push({
//       promise,
//       url,
//       resolve,
//     });
//   });

//   return promise;
// };

// const loop = async (interval: number) => {
//   console.log('start loop');
//   while (true) {
//     const req = _queue.shift();
//     if (!req) {
//       await delay(interval);
//       continue;
//     }

//     try {
//       const response = await fetch(req.url);
//       req.resolve(response);
//     } catch (error) {
//       req.resolve({ error: error.message });
//     }

//     await delay(interval);
//   }
// };

// loop(1000);

// for (let i = 100; i--;) {
//   request(`https://jsonplaceholder.typicode.com/todos/${i}`).then(
//     async (data) => {
//       console.log(await data.json());
//     },
//   );
// }
