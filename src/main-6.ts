import { fromEvent, Subject, BehaviorSubject } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";


////////////////////////////////////////////////////////////////////////////////////////////////
//                                  SUBJECTS
////////////////////////////////////////////////////////////////////////////////////////////////


// Subjects are combinations of observable and observer. So you can...
//      1. subscribe to subject, just like a regular observable
//      2. You can also call next, error and complete on the subject to multicast the 
//         notifications to all active subscribers 


// BehaviorSubjects are similar, except they are Subjects with memory and an initial value


// // 1. Multicasting - Subject

// const emitButton = document.querySelector('button#emit');
// const inputElement: HTMLInputElement = document.querySelector('#value-input');
// const subscribeButton = document.querySelector('button#subscribe');

// const value$ = new Subject<string>();

// fromEvent(emitButton, 'click').pipe(
//   map(() => inputElement.value)
// ).subscribe(value$);

// fromEvent(subscribeButton, 'click').subscribe(
//   () => {
//     console.log('New Subscription');
//     value$.subscribe(value => console.log(value));
//   }
// );


// 2. BehaviorSubject - Stores a value for original emit, then emits values based on observable

const loggedInSpan: HTMLElement = document.querySelector('span#logged-in');
const loginButton: HTMLElement = document.querySelector('button#login');
const logoutButton: HTMLElement = document.querySelector('button#logout');
const printStateButton: HTMLElement = document.querySelector('button#print-state');

const isLoggedIn$ = new BehaviorSubject<boolean>(false);

fromEvent(loginButton, 'click').subscribe(() => isLoggedIn$.next(true));
fromEvent(logoutButton, 'click').subscribe(() => isLoggedIn$.next(false));

// Navigation bar
isLoggedIn$.subscribe(
  isLoggedIn => loggedInSpan.innerText = isLoggedIn.toString()
);

// Buttons
isLoggedIn$.subscribe(isLoggedIn => {
  logoutButton.style.display = isLoggedIn ? 'block' : 'none';
  loginButton.style.display = !isLoggedIn ? 'block' : 'none';
});

fromEvent(printStateButton, 'click').pipe(
  withLatestFrom(isLoggedIn$)
).subscribe(
  ([event, isLoggedIn]) => console.log('User is logged in:', isLoggedIn)
);


