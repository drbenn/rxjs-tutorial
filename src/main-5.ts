import { Observable, of, fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { concatMap, map } from "rxjs/operators";

////////////////////////////////////////////////////////////////////////////////////////////////
// Flattening Operators - act like catchError/fallbacks, but act on each emitted value
////////////////////////////////////////////////////////////////////////////////////////////////


// // 1. concatMap Operator - in this example, concatMap creates an inner observable to source$, and for each next in source('A' & 'B') values 1 & 2 from the concatMap observable will be emitted, instead of the original outer values of ('A' & 'B').
// const source$ = new Observable(subscriber => {
//   setTimeout(() => subscriber.next('A'), 2000);
//   setTimeout(() => subscriber.next('B'), 5000);
// });

// console.log('App has started');
// source$.pipe(
//   concatMap(value => of(1, 2))
// ).subscribe(value => console.log(value));



// 2. concatMap Operator and chaining observables


// const endpointInput: HTMLInputElement = document.querySelector('input#endpoint');
// const fetchButton = document.querySelector('button#fetch');

// fromEvent(fetchButton, 'click').pipe(
//   map(() => endpointInput.value),
//   concatMap(value =>
//     ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//   )
// ).subscribe(
//   value => console.log(value)
// );
