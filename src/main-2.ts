import { Observable } from 'rxjs/internal/Observable';
import { ajax } from "rxjs/ajax";

///////////////////////////////////////////////////////////////////////////////////////////////
//                  Types of observables - Hot vs Cold
///////////////////////////////////////////////////////////////////////////////////////////////

// // 1. Cold Oberservable - provides new response for each subscription(each ajax$.subscribe will log different first name)
        // Uses - Set of values, HTTP Request, Timer/Interval

        //ajax returns an observable to subscribe to

// const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name');

// ajax$.subscribe(
//     data => console.log('Sub 1:', data.response.first_name)
// );

// ajax$.subscribe(
//     data => console.log('Sub 2:', data.response.first_name)
// );

// ajax$.subscribe(
//     data => console.log('Sub 3:', data.response.first_name)
// );

// 2. Hot observables - All subscriptions share the same source(ex observable is connecting to DOM click x/y location, so DOM is already emitting and the hot observable is just connecting to this different changing source)
        // Uses - DOM Events, State, Subjects(rxjs)

const helloButton = document.querySelector('button#hello');

const helloClick$ = new Observable<MouseEvent>(subscriber => {
    helloButton.addEventListener('click', (event) => {
        subscriber.next(event);
    })
})

helloClick$.subscribe(
    event => console.log('Sub 1:', event.type, event.x, event.y)
);

setTimeout(() => {
    console.log('Subscription 2 starts');
    helloClick$.subscribe(
        event => console.log('Sub 2:', event.type, event.x, event.y)
    );
}, 5000);


