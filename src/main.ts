import { Observable } from 'rxjs/internal/Observable';
import {
  name$,
  storeDataOnServer,
  storeDataOnServerError
} from './external';



///////////////////////////////////////////////////////////////////////////////////////////////
//                             PART 1 - BASICS
//////////////////////////////////////////////////////////////////////////////////////////////


// // of changes items to observable, thus able to subscribe and receive values from name$ as observable
// name$.subscribe(value => console.log(value))


// // function returns observable, which must be subscribed to, but basic, with no error handling
// storeDataOnServer('a value').subscribe(value => console.log(value))

// rxjs 7 basic subscribe with error handling
// storeDataOnServerError('a value').subscribe({
//   next:value => console.log(value),
//   error: err => console.log('Error when saving:', err.message)
//   })

// What is an Obervable - once observable executed, it can emit some notifications in the form of 
// 1. next 2. error or 3. complete through the callback function, where the observable will call next on the subscriber twice
// const observable$ = new Observable<string>(subscriber => {
//   subscriber.next('Alice');
//   subscriber.next("Ben");
//   subscriber.next("Charlie");
// })


// // Observer object
// // the next function in the observer provides the behavior for the next notification emitted by the observable
// const observer = {
//   next: value => console.log(value)  
// };

// // Subscription object
// // Subscription executes the observable, it runs the callback inside of the observable, and passes  the observer object to it
// observable$.subscribe(observer)

    // // in the observer is simple, with only a next notification, can use 1 line in subscription instead of long-winded observer variable
    // observable$.subscribe(value => console.log(value));

// when subscribe method is called => a new subscription is made, which means the callback in the observable is run(subscriber => subscriber.next...), with the provided observer, converted into a subscriber object. Each time next is used on the subscriber a next value is emitted, and the next handler of our observer is called with an emitted value

// *****************to sum up ************* Each new subscription runs the observable with the provided observer, and each emitted value by the observable will call the observers next handler of the provided value...and our observer will just console log the emitted value in this example





// Basic unsubscribe using setTimeout - unsubscribe kicks in before 3rd next

// const observable$ = new Observable<string>(subscriber => {
//   console.log('Observable executed');  
//   subscriber.next('Alice');
//   setTimeout(() => subscriber.next("Ben"), 2000);
//   setTimeout(() => subscriber.next("Charlie"), 4000);
// })

// const subscription = observable$.subscribe(value => console.log(value));

// setTimeout(() => {
//   console.log('Unsubscribe');
//   subscription.unsubscribe();
// }, 3000);
  


// Multiple subscriptions - each subscription is a seperate execution of the observable, so the executions of subscriptions run independently and concurrently

// const observable$ = new Observable<string>(subscriber => {
//   console.log('Observable executed');  
//   subscriber.next('Alice');
//   setTimeout(() => subscriber.next("Ben"), 2000);
//   setTimeout(() => subscriber.next("Charlie"), 4000);
// })

// console.log('Subscription 1 starts');
// observable$.subscribe(value => console.log('Subscription 1:', value));

// setTimeout(() => {
//   console.log('Subscription 2 starts');
//   observable$.subscribe(value => console.log('Subscription 2:', value));
// }, 1000);


///////////////////////////////////////////////////////////////////////////////////////////////
//                             PART 2
//////////////////////////////////////////////////////////////////////////////////////////////

// // Basic observable timing/order
// const observable$ = new Observable(subscriber => {
//   console.log('Observable executed-2');  // logs 2nd
//   })
// console.log('Before Subscribe-1'); // logs 1st
// observable$.subscribe();
// console.log('After Subscribe-3'); // logs 3rd

// Basic observable timing/order
const observable$ = new Observable(subscriber => {
  console.log('Observable executed-2');  // logs 2nd
  })
console.log('Before Subscribe-1'); // logs 1st
observable$.subscribe();
console.log('After Subscribe-3'); // logs 3rd

