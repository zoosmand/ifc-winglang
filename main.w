/**
* Main code. The Program entry.
*/
bring "./handlers" as handlers;
bring "./ports" as ports;

let greetingHandler = new handlers.Greeting();
// let makeGreetingFunction = new ports.GreetingFunction(greetingHandler);
let makeGreetingService = new ports.GreetingApi(greetingHandler);

bring expect;

test "It will return 'Hello, <name>'" {
    expect.equal("Hello, Winglang", makeGreetingService.invoke("Winglang"));
}   