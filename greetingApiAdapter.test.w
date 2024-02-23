/**
* Test Core Greeting.
*/


bring cloud;
bring expect;
bring "./adapters" as adapters;
bring "./handlers" as handlers;

let greetingHandler = new handlers.Greeting();
let greetingStringAdapter = new adapters.GreetingApiAdapter(greetingHandler);

test "it will return 200 and correct answer when name is specified" {
    let request = cloud.ApiRequest {
        method: cloud.HttpMethod.GET,
        path: "/greetings",
        query: { "name" => "Wing" },
        vars: {}
    };
    let response = greetingStringAdapter.handle(request);
    expect.equal(200, response.status);
    expect.equal("Hello, Wing", response.body);
}

test "it will return 400 and correct answer when name is specified" {
    let request = cloud.ApiRequest {
        method: cloud.HttpMethod.GET,
        path: "/greetings",
        query: { "somethingElse" => "Whatever" },
        vars: {}
    };
    let response = greetingStringAdapter.handle(request);
    expect.equal(400, response.status);
    expect.equal("Query name=<name> is missing.", response.body);
}


// import { expect, it, describe } from '@jest/globals';
// import { makeGreeting } from './core/makeGreeting';

// describe('makeGreeting', () => {
//     it('Should return a greeting with the provided name', () => {
//         const name = "World!";
//         const expected = 'Hello, World!';
//         const result = makeGreeting(name);
//         expect(result).toBe(expected);
//     });
// });
