import React from 'react';

function Hello(){
    const sayHello = () =>{
        console.log("Hello");
    };

    return(
        <div>
            <h3>This is hello component</h3>
            <button onClick="sayHello()">Click here</button>
        </div>
    );
}
function sayHello(){
    return(
        <div>
            <h3>Xin chao</h3>
        </div>
    );
}

export default Hello;