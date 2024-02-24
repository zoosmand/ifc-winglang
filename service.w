/**
* Service Greeting.
*/

bring "./handlers" as handlers;
bring "./ports" as ports;
bring "./adapters" as adapters;

pub class Greeting {
    pub api: ports.GreetingApi;

    new() {
        let greetingHandler = new handlers.Greeting();
        let greetingStringAdapter = new adapters.GreetingApiAdapter(greetingHandler);
        this.api = new ports.GreetingApi(greetingStringAdapter);
    }
}
