let somePromise = new Promise ( (resolve, reject) => {  
    setTimeout( () => {
        resolve("my promise is resolved");
    }, 3000);
    reject("my promise has beeen rejected");
});

somePromise.then( (message) => {
    console.log(message);
}, (errorMessage) => {
    console.log(errorMessage);
});

let asyncAdd = (a, b) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a+b); 
            } else {
                reject("Aruguments passed should be of number type.");
            }
        },3000);
    });

};
//chaining of promises
asyncAdd("blah", 1).then( (result) => {
    console.log("Sum =" ,result);
    return asyncAdd(result, 2);
}).then( (result) => {
    console.log(result);
}). catch( (errorMsg) => {
    console.log(errorMsg);
});