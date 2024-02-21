/**
* Handlers
*/
bring cloud;
bring "../core" as core;

pub class Greeting impl cloud.IFunctionHandler {
    pub inflight handle(name: str?): str {
        log("Received name: {name}");
        let greeting = core.Greeting.makeGreeting(name);
        log("returned: {greeting}");
        return greeting;
    }
}


