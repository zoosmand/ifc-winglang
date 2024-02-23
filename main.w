/**
* Main code. The Program entry.
*/
bring "./handlers" as handlers;
bring cloud;

let greetingHandler = new handlers.Greeting();
let makeGreetingFunction = new cloud.Function(greetingHandler);

bring expect;

test "It will return 'Hello, <name>'" {
    expect.equal("Hello, Winglang", makeGreetingFunction.invoke("Winglang"));
}   