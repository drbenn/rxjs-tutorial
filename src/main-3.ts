import { combineLatest, forkJoin, from, fromEvent, interval, Observable, of, timer } from "rxjs";
import { ajax } from "rxjs/ajax";

///////////////////////////////////////////////////////////////////////////////////////////////
//                  Creation Functions
///////////////////////////////////////////////////////////////////////////////////////////////


// // 1. of - allows observable to emit a set of values and then complete

// // 1 Liner
// of('Alice', 'Ben', 'Charlie').subscribe(value => console.log(value));

// // Detailed
// // of('Alice', 'Ben', 'Charlie').subscribe({
// //     next: value => console.log(value),
// //     complete: () => console.log('Completed')
// // });




// // 2. from - converts other types to an observable

// // //a. convert array to observable
// // from(['Alice','Ben','Charlie']).subscribe({
// //     next: value => console.log(value),
// //     complete: () => console.log('Completed')
// // })

// // b. convert promise to observable
// const somePromise = new Promise((resolve, reject) => {
//     // resolve('Resolved!'); // uncomment for resolve to work instead of defaulting to reject -> error
//     reject('Rejected')
// })

// const observableFromPromise$ = from(somePromise);

// observableFromPromise$.subscribe({
//     next: value => console.log(value),
//     error: err => console.log('Error', err),    
//     complete: () => console.log('Completed')
// })




// // 3. from - creates observable from other event sources (DOM EventTarget, Node.js EventEmitter, jQuery Events)

// const triggerButton = document.querySelector('button#trigger');

// fromEvent<MouseEvent>(triggerButton, 'click').subscribe(
//   event => console.log(event.type, event.x, event.y)
// );


// // 4. timer - like setTimeout, but creates new timer(single timout) for each subscription

// console.log('App Started');

// timer(2000).subscribe({
//     next: value => console.log(value),  
//     complete: () => console.log('Completed')
// })

// // 5. interval- like timer, but creates repeating interval, not single timeout

// console.log('App started');

// const timer$ = new Observable<number>(subscriber => {
//   const timeoutId = setTimeout(() => {
//     console.log('Timeout!');
//     subscriber.next(0);
//     subscriber.complete();
//   }, 2000);

//   return () => clearTimeout(timeoutId);
// });

// const subscription = interval(1000).subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });


// setTimeout(() => {
//     subscription.unsubscribe();
//     console.log('Unsubscribe');
//   }, 5000);



// // 6. forkJoin - accepts other observables as the source, as an array, once all observables complete, will emit responses as single array

// const randomName$ = ajax('https://random-data-api.com/api/name/random_name');
// const randomNation$ = ajax('https://random-data-api.com/api/nation/random_nation');
// const randomFood$ = ajax('https://random-data-api.com/api/food/random_food');

// // basic ajax API Fetch
// // randomName$.subscribe(ajaxResponse => console.log(ajaxResponse.response.first_name));
// // randomNation$.subscribe(ajaxResponse => console.log(ajaxResponse.response.capital));
// // randomFood$.subscribe(ajaxResponse => console.log(ajaxResponse.response.dish));

// // forkJoin!!!
// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//     ([nameAjax, nationAjax, foodAjax]) => console.log(`${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}.`)
//   );




// 7. combineLatest - similar to forkJoin, but will emit data new combined data each time one of the sources changes to something new

const temperatureInput = document.getElementById('temperature-input');
const conversionDropdown = document.getElementById('conversion-dropdown');
const resultText = document.getElementById('result-text');

const temperatureInputEvent$ = fromEvent(temperatureInput, 'input');
const conversionInputEvent$ = fromEvent(conversionDropdown, 'input');

combineLatest([temperatureInputEvent$, conversionInputEvent$]).subscribe(
  ([temperatureInputEvent, conversionInputEvent]) => {
    const temperature = Number(temperatureInputEvent.target['value']);
    const conversion = conversionInputEvent.target['value'];

    let result: number;
    if (conversion === 'f-to-c') {
      result = (temperature - 32) * 5/9;
    } else if (conversion === 'c-to-f') {
      result = temperature * 9/5 + 32;
    }

    resultText.innerText = String(result);
  }
);