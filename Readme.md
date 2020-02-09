# InterfaceJs
Just a simple helper to create a self-checking constructor function

## Get started

```
const interface = require('./interface');

// Create a interface constructor
const PrintInterface = interface.create([
    ["print", interface.TYPE.Function]
]);

// Create Class implementing the interface
class Foo extends PrintInterface {
    constructor() {
        super();
    }
    
    print() {
        console.log("Bar");
    }
}

// If you create an Item of the class it will check it
const item = new Foo();
```