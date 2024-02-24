/**
* Test Core Greeting.
*/

bring cloud;
bring expect;
bring "./adapters" as adapters;
bring "./handlers" as handlers;

let greetingHandler = new handlers.Greeting();
let greetingStringAdapter = new adapters.GreetingApiAdapter(greetingHandler);

test "it will return 200 and plain text answer when name is specified without headers" {
    let request = cloud.ApiRequest {
        method: cloud.HttpMethod.GET,
        path: "/greetings",
        query: { "name" => "Wing" },
        vars: {}
    };
    let response = greetingStringAdapter.handle(request);
    expect.equal(200, response.status);
    expect.equal("Hello, Wing!", response.body);
    expect.equal("text/plain", response.headers?.get("Content-Type"));
}

test "it will return 200 and json answer when name is specified with the header 'Accept: application/json'" {
    let request = cloud.ApiRequest {
        method: cloud.HttpMethod.GET,
        path: "/greetings",
        query: { "name" => "Wing" },
        headers: {
            "Accept" => "application/json"
        },
        vars: {}
    };
    let response = greetingStringAdapter.handle(request);
    expect.equal(200, response.status);
    expect.equal("application/json", response.headers?.get("Content-Type"));
    let data = Json.tryParse(response.body);
    let expected = Json.stringify(Json {
        greeting: "Hello, Wing!"
    });
    expect.equal(expected, response.body);
}

test "it will return 200 and html answer when name is specified the header 'Accept: text/html'" {
    let request = cloud.ApiRequest {
        method: cloud.HttpMethod.GET,
        path: "/greetings",
        query: { "name" => "Wing" },
        headers: {
            "Accept" => "text/html"
        },
        vars: {}
    };
    let response = greetingStringAdapter.handle(request);
    expect.equal(200, response.status);
    expect.equal("text/html", response.headers?.get("Content-Type"));
    let body = response.body ?? "";
    assert(body.contains("Hello, Wing!"));
}

test "it will return 400 and error message when name is not specified" {
    let request = cloud.ApiRequest {
        method: cloud.HttpMethod.GET,
        path: "/greetings",
        query: { "somethingElse" => "Whatever" },
        vars: {}
    };
    let response = greetingStringAdapter.handle(request);
    expect.equal(400, response.status);
    expect.equal("Query name=<name> is missing.", response.body);
    expect.equal("text/plain", response.headers?.get("Content-Type"));
}

