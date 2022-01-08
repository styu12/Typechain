"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Human {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const Han = new Human("Seungoh", 26, "male");
const sayHi = (person) => {
    return `Hi, ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
};
console.log(sayHi(Han));
//# sourceMappingURL=index.js.map