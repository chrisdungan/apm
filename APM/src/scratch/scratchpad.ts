// import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
// import { mergeMap, map } from 'rxjs/operators';


// class Person {
//     id: number;
//     name: string;
//     age: number;
// }

// const people: Person[] = [
//     { 'id': 1, 'name': 'Todd Motto', age: 25 },
//     { 'id': 2, 'name': 'Chris Dungan', age: 58 },
//     { 'id': 3, 'name': 'Jack', age: 39 },
//     { 'id': 4, 'name': 'Joe', age: 48 },
//     { 'id': 5, 'name': 'Jim', age: 45 },
//     { 'id': 6, 'name': 'John', age: 42 }
// ];

// const report = (id, name) => `id: ${id} name: ${name}`;

// const result = people.filter(person => {
//     return (person.age >= 58);
// }).map(person => {
//     return report( person.id, person.name);
// });

// console.log(result);

// // let peopleCopy = [...people];
// // let peopleCopy = people.slice(0);
// // let peopleCopy = [].concat(people);
// // let peopleCopy = deepCopy(people);

// function deepCopy (arr) {
//     const out = [];
//     for (let i = 0, len = arr.length; i < len; i++) {
//         const item = arr[i];
//         const obj = {};
//         for (const key in item) {
//             if (item.hasOwnProperty(key)) {
//                 obj[key] = item[key];
//             }
//         }
//         out.push(obj);
//     }
//     return out;
// }

// const peopleCopy = people.map(person => ({...person}));

// // console.log(peopleCopy);
//  peopleCopy.find(p => (p.name === 'John')).age = 22;
// // console.log(peopleCopy);
// // console.log(people);

// // const personStream = from(peopleCopy);
// // const myPeople = personStream.subscribe(myDataHandler);
// // let myPeople1 = personStream.subscribe(person => console.log(person));


// const peepNotifier = new Subject<Person>(); // could be defined in one file
// const mypeep = peepNotifier.subscribe(myDataHandler); // could be subscibed to in another file

// // and yet a third file could notify via next()...
// for (const p of people) {
//     peepNotifier.next(p);
// }

// peepNotifier.next({ 'id': 9, 'name': 'Timmy', age: 18 });


// const peepsNotifier = new Subject<Person[]>();
// const mypeeps = peepsNotifier.subscribe(myDataHandler);
// peepsNotifier.next(people);
// peepsNotifier.next(peopleCopy);


// function myDataHandler( data ) {
//     console.log('received data:', data);
// }
