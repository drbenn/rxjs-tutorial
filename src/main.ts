import { Observable } from 'rxjs/internal/Observable';
import {
  name$,
  storeDataOnServer,
  storeDataOnServerError
} from './external';

// of changes items to observable, thus able to subscribe and receive values from name$ as observable
// name$.subscribe(value => console.log(value))


// functions returns observable, which must be subscribed to, but basic, with no error handling
// storeDataOnServer('a value').subscribe(value => console.log(value))

// rxjs 7 basic subscribe with error handling
storeDataOnServerError('a value').subscribe({
  next:value => console.log(value),
  error: err => console.log('Error when saving:', err.message)
  })

// What is an Obervable - once observable executed, it can emit some notifications in the form of 
// 1. next 2. error or 3. complete through the callback function, where the observable will call next on the subscriber twice
const observable$ = new Observable(subscriber => {
  subscriber.next('Alice');
  subscriber.next("Ben")
})


// Observer object
// the next function in the observer provides the behavior for the next notification emitted by the observable
const observer = {
  next: value => console.log(value)  
};

// Subscription object
// Subscription executes the observable, it runs the callback inside of the observable, and passes  the observer object to it
observable$.subscribe(observer)

// subscribe method called => new subscription made, which means callback in observable is run(subscriber => subscriber.next...), with the provided observer, converted into a subscriber object. Each time next is used on the subscriber a next value is emitted, and the next handler of our observer is called with an emitted value

// to sum up - each new subscription runs the observable with the provided observer, and each emitted value by the observable will call the observers next handler of the provided value...and our observer will just console log the emitted value in this example