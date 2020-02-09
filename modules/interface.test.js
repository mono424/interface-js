const interface = require('./interface');
const { TYPE } = interface;

test('Fails on invalid type definition.', () => {
    const call = () => interface.create([
        ["test", TYPE.Any],
        ["test2", TYPE.Function],
        ["test3", "Wrong"]
    ]);
    expect(call).toThrow();
});

test('Should return constructor on valid call.', () => {
    expect(interface.create([
        "test",
        { name: "test2", type: TYPE.Any },
        ["test3", TYPE.Function]
    ])).toBeInstanceOf(Function);
});

test('Should fail on missing functions', () => {
    const con = interface.create([
        ["foo", TYPE.Function]
    ]);

    class Testy extends con {
        constructor() {
            super();
        }

        bar() {}
    }

    const init = () => (new Testy());
    expect(init).toThrow();
});

test('Should success on existing functions', () => {
    const con = interface.create([
        ["foo", TYPE.Function]
    ]);

    class Testy extends con {
        constructor() {
            super();
        }

        foo() {}

        bar() {}
    }

    const init = () => (new Testy());
    expect(init()).toBeInstanceOf(Testy);
});

test('Should success on valid complex structure', () => {
    const con = interface.create([
        ["foo", TYPE.Function],
        ["bar", TYPE.Any]
    ]);

    class Testy extends con {
        constructor() {
            super();
        }

        get bar() {
            return "testy";
        }

        foo() {}
    }

    const init = () => (new Testy());
    expect(init()).toBeInstanceOf(Testy);
});

test('Should fail on invalid complex structure', () => {
    const con = interface.create([
        ["foo", TYPE.Function],
        ["bar", TYPE.Function]
    ]);

    class Testy extends con {
        constructor() {
            super();
        }

        get bar() {
            return "testy";
        }

        foo() {}
    }

    const init = () => (new Testy());
    expect(init).toThrow();
});
