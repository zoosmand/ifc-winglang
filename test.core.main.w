/**
* Main Testing.
*/
bring "./core" as core;
bring expect;


test "It will return 'Hello, <name>'" {
    expect.equal("Hello, Winglang", core.Greeting.makeGreeting("Winglang"));
}   