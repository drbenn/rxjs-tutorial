import { Observable, forkJoin, of, fromEvent, EMPTY } from "rxjs";
import { filter, map, tap, debounceTime, catchError } from "rxjs/operators";
import { ajax } from "rxjs/ajax";



///////////////////////////////////////////////////////////////////////////////////////////////
//                  Pipeable Operators
///////////////////////////////////////////////////////////////////////////////////////////////

// Pipes which are an operator, take a source observable as input, and returns a newly created observable, extended with the logic of the pipe operator. Kind of like map, creating a new object/new pointer(?)

// each time the source observable emits information the operator transforms the data, and then that transformed data will hit the observer



// // 1. filter - if value emitted by the source, the filter operator will pass data through or not to the observable based on the filter conditions

// interface NewsItem {
//   category: 'Business' | 'Sports';
//   content: string;
// }

// const newsFeed$ = new Observable<NewsItem>(subscriber => {
//   setTimeout(() => 
//     subscriber.next({ category: 'Business', content: 'A' }), 1000);
//   setTimeout(() => 
//     subscriber.next({ category: 'Sports', content: 'B' }), 3000);
//   setTimeout(() => 
//     subscriber.next({ category: 'Business', content: 'C' }), 4000);
//   setTimeout(() => 
//     subscriber.next({ category: 'Sports', content: 'D' }), 6000);
//   setTimeout(() => 
//     subscriber.next({ category: 'Business', content: 'E' }), 7000);
// });

// // // pipeless/filterless subscriber - outputting all newsFeed emitted data
// // newsFeed$.subscribe(
// //   item => console.log(item)
// // );

// // filter pipe as new observable const to subscribe to
// const sportsNewsFeed$ = newsFeed$.pipe(
//   filter(item => item.category === 'Sports')
// );

// // piped/filtered subscriber - filtering newsFeed emitted data to sports category only
// sportsNewsFeed$.subscribe(
//   item => console.log(item)
// );




// // 2. map - for each emitted value, the map operator can provide a new value. The new value can be calculated by the output emitted by the source or just a new unrelated value.

// // Mike is from New Delhi and likes to eat pasta.

// const randomFirstName$ = ajax<any>('https://random-data-api.com/api/name/random_name').pipe(
//   map(ajaxResponse => ajaxResponse.response.first_name)
// );

// const randomCapital$ = ajax<any>('https://random-data-api.com/api/nation/random_nation').pipe(
//   map(ajaxResponse => ajaxResponse.response.capital)
// );

// const randomDish$ = ajax<any>('https://random-data-api.com/api/food/random_food').pipe(
//   map(ajaxResponse => ajaxResponse.response.dish)
// );

// forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
//   ([firstName, capital, dish]) =>
//     console.log(`${firstName} is from ${capital} and likes to eat ${dish}.`)
// );





// // 3. tap - acts as a spy, and is able to cause some side effects, without messing with the emitted notifications

// of(1, 7, 3, 6, 2).pipe(
//   filter(value => value > 5),
//   tap(value => console.log('1stSpy:', value)),
//   map(value => value * 2),
//   tap({
//     next: value => console.log('2ndSpy:', value)
//   }),
// ).subscribe(value => console.log('Output:', value));





// // 4. debounceTime = if designated 2sec debounce time and 3 responses were rapidly emitted, if no more data emitted for 2sec the 3rd(last/latest) data would be emitted - this is used to steady constantly updating values/excessive calculation logic.

// // as shown below, debounce emits value only after 2 seconds of not using the slider, where the slider is providing rapid data while being moved...which could be too taxing on connected http requests/calculations

// const sliderInput = document.querySelector('input#slider');

// fromEvent(sliderInput, 'input').pipe(
//   debounceTime(2000),
//   map(event => event.target['value'])
// ).subscribe(value => console.log(value));


// // 5. catchError - will not stop code, just tosses error for review

// const failingHttpRequest$ = new Observable(subscriber => {
//   setTimeout(() => {
//     subscriber.error(new Error('Timeout'));
//   }, 3000);
// });

// console.log('App started');

// failingHttpRequest$.pipe(
//   // catchError(error => EMPTY) //hides error from logging
//   catchError(error => of('Fallback value'))
// ).subscribe({
//   next: value => console.log(value),
//   complete: () => console.log('Completed')
// });


