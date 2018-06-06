
class Bitmask {
    constructor(){
        this.permissions = {
            init: 1
        }
        this.masks = {}
        this.numOfMasks = 0;
    }

    addPermission(name){
        var permissions = Object.keys(this.permissions);
        console.log(permissions);
        this.permissions[name] = this.permissions[permissions[permissions.length - 1]] << 1
        console.log(`New Permissions: ${JSON.stringify(this.permissions)}`);
    }

    addMask(name, permissions){
        this.masks[name] = permissions.reduce((x,y)=> {return x | y}, 0);
        this.numOfMasks = this.masks.length;
        console.log(`New Masks: ${JSON.stringify(this.masks)}`);
    }

    
    hasPermission(permissionsToCheck, permission){
        console.log(`permissionsToCheck: ${permissionsToCheck.toString(2)} || permission: ${permission.toString(2)}`);
        return permissionsToCheck & permission;
    }
}

class User{
    constructor(name, permissions){
        this.name = name;
        this.permissions = permissions
    }
}


// Functions that check permissions
function canRead(user){
    if(test.hasPermission(user.permissions, test.permissions.read)){
        console.log(`${user.name}: I can do read Stuff!`);
    } else {
        console.log(`${user.name}: I can't do read Stuff :(`);
    }
}

function canWrite(user){
    if(test.hasPermission(user.permissions, test.permissions.write)){
        console.log(`${user.name}: I can do write Stuff!`);
    } else {
        console.log(`${user.name}: I can't do write Stuff :(`);
    }
}

function canDelete(user){
    if(test.hasPermission(user.permissions, test.permissions.delete)){
        console.log(`${user.name}: I can do delete Stuff!`);
    } else {
        console.log(`${user.name}: I can't do delete Stuff :(`);
    }
}


// Setup Bitmasks
var test = new Bitmask();
test.addPermission("read");
test.addPermission("write");
test.addPermission("delete");

test.addMask("admin", [test.permissions.read, test.permissions.write, test.permissions.delete]);
test.addMask("reviewer", [test.permissions.read, test.permissions.write]);
test.addMask("viewer", [test.permissions.read]);


// Setup Users
var imaAdministrator = new User("imaAdministrator", test.masks.admin);
var imaReviewer = new User("imaReviewer", test.masks.reviewer);
var imaViewer = new User("imaViewer", test.masks.viewer);

console.log(JSON.stringify(imaAdministrator));
console.log(JSON.stringify(imaReviewer));
console.log(JSON.stringify(imaViewer));

canRead(imaAdministrator);
canRead(imaReviewer);
canRead(imaViewer);
canWrite(imaAdministrator);
canWrite(imaReviewer);
canWrite(imaViewer);
canDelete(imaAdministrator);
canDelete(imaReviewer);
canDelete(imaViewer);


console.log("END");