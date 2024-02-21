bring "./handlers" as handlers;
bring cloud;

let greetingHandler = new handlers.Greeting();
let makeGreetingFunction = new cloud.Function(greetingHandler);


// let makeGreeting = new cloud.Function(inflight (name: str?): str => {
//     log("Received name: {name}");
//     let greeting = "Hello, {name}";
//     log("returned: {greeting}");
//     return greeting;
// });

bring expect;

test "It will return 'Hello, <name>'" {
    expect.equal("Hello, Winglang", makeGreetingFunction.invoke("Winglang"));
}   