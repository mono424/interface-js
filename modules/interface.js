const TYPE = {
    Any: "any",
    Function: "function"
};

function isFunction(fn) {
    return fn && {}.toString.call(fn) === '[object Function]';
}

const create = (interface = []) => {
    // Check for interface array
    if (!interface || !Array.isArray(interface)) {
        throw new Error('Please provide an array as interface for the constructor.');
    }

    // Normalize interface array
    interface = interface.map((item) => {
        if (Array.isArray(item)) {
            const [name, type] = item;
            return [name, type]
        } else if(item && item.name) {
            const { name, type = TYPE.Any } = item;
            return [name, type]
        } else {
            return [item, TYPE.Any];
        }
    });
    
    // Check if types are okay
    if (!interface.every(([_, type]) => Object.values(TYPE).includes(type))) {
        throw new Error(`Please only use supported types.`);
    }

    // Check Prop functions called in constructor to check a single prop for existence and type
    const checkProp = (item, self) => {
        const [name, type] = item;
        if (typeof self[name] === 'undefined') {
            return new Error(`Property('${name}') not found in class.`);
        }

        switch (type) {
            case TYPE.Function:
                if (!isFunction(self[name])) {
                    return new Error(`Property('${name}') is not a function.`);
                } else {
                    return null;
                }
            case TYPE.Any:
            default:
                return null;
        }
    };

    const constructor = function() {
        const errs = interface.map((item) => checkProp(item, this)).filter(x => x);
        if (errs.length > 0) {
            throw errs[0];
        }
    };

    return constructor;
};

exports.TYPE = TYPE;
exports.create = create;
