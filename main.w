/**
* Main code. The Program entry.
*/
bring "./handlers" as handlers;
bring "./ports" as ports;
bring "./adapters" as adapters;

let greetingHandler = new handlers.Greeting();
let greetingStringAdapter = new adapters.GreetingApiAdapter(greetingHandler);
let makeGreetingService = new ports.GreetingApi(greetingStringAdapter);

bring expect;

test "It will return 'Hello, <name>'" {
    expect.equal("Hello, Winglang", makeGreetingService.invoke("Winglang"));
}   