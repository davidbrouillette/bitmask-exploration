
class Bitmask {
    constructor(){
        this.flags = {}
        this.masks = {}
    }

    addFlag(name){
        if(Object.keys(this.flags).length > 0){
            var flagKeys = Object.keys(this.flags);
            this.flags[name] = this.flags[flagKeys[flagKeys.length - 1]] << 1
        } else {
            this.flags[name] = 1;
        }
    }

    createMask(name, ...args){
        var flagsToAdd = Array.isArray(args[0])
            ? args = args[0]
            : args;

        this.masks[name] = flagsToAdd.reduce((x,y)=> {return x | y}, 0);
    }

    
    containsFlags(flagsToVerify, ...flags){
        let testMask = flags.reduce((x,y)=> {return x | y}, 0);
        return (flagsToVerify & testMask) ? true : false;
    }

    hasFlags(flagsToVerify, ...flags){
        let testMask = flags.reduce((x,y)=> {return x | y}, 0);
        return (flagsToVerify & testMask) === testMask ? true : false;
    }
}

var test = new Bitmask();

test.addFlag("read");
test.addFlag("write");
test.addFlag("delete");

test.createMask("admin", [test.flags.read, test.flags.write, test.flags.delete]);
test.createMask("reviewer", test.flags.read, test.flags.write);
test.createMask("viewer", test.flags.read);

console.log(`viewer || admin: ${test.hasFlags(test.masks.viewer, test.masks.admin)}`);

console.log(`admin || delete: ${test.hasFlags(test.masks.admin, test.flags.delete)}`);

console.log(`viewer || read,delete: ${test.hasFlags(test.masks.viewer, test.flags.read, test.flags.delete)}`);

console.log(`reviewer || reviewer: ${test.hasFlags(test.masks.reviewer, test.masks.reviewer)}`);

console.log(`reviewer || admin: ${test.hasFlags(test.masks.reviewer, test.masks.admin)}`);

console.log(`admin || reviewer,viewer: ${test.hasFlags(test.masks.admin, test.masks.reviewer, test.masks.viewer)}`);

console.log(`viewer || admin,reviewer: ${test.hasFlags(test.masks.viewer, test.masks.admin, test.masks.reviewer)}`);

