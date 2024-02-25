/**
* Main Testing.
*/

bring "./service.w" as service;

let greetingSevice = new service.Greeting();

bring expect;

test "It will return 'Hello, <name>'" {
    expect.equal("Hello, Winglang!", greetingSevice.api.invoke("Winglang"));
}   
