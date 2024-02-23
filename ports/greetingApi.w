/**
* Ports. Greeting API.
*/
bring cloud;
bring http;

pub class GreetingApi {

    pub apiUrl: str;

    new(handler: cloud.IFunctionHandler) {
        let api = new cloud.Api();

        api.get("/greetings", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
            return cloud.ApiResponse {
                status: 200,
                body: handler.handle(request.query.get("name"))
            };
        });

        this.apiUrl = api.url;
    }

    pub inflight invoke(name: str?): str? {
        let result = http.get("{this.apiUrl}/greetings?name={name}");
        assert(200 == result.status);
        return result.body;
    }
}