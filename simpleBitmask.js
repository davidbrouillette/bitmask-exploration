
class Bitmask {
    constructor(){
        this.permissions = {
            init: 1
        }
        this.masks = {}
    }

    addPermission(name){
        var permissions = Object.keys(this.permissions);
        console.log(permissions);
        this.permissions[name] = this.permissions[permissions[permissions.length - 1]] << 1
        console.log(`New Permissions: ${JSON.stringify(this.permissions)}`);
    }

    addMask(name, permissions){
        this.masks[name] = permissions.reduce((x,y)=> {return x | y}, 0);
        console.log(`New Masks: ${JSON.stringify(this.masks)}`);
    }

}


var test = new Bitmask();
test.addPermission("p1");
test.addPermission("p2");
test.addPermission("p3");

test.addMask("m1", [test.permissions.p1]);
test.addMask("m2", [test.permissions.p2]);
test.addMask("m3", [test.permissions.p1, test.permissions.p3]);

console.log("END");