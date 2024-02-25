/**
* Ports. Greeting API.
*/
bring cloud;
bring http;
bring "../adapters/IRestApiAdapter.w" as restApiAdapter;


pub class GreetingApi {

    pub _apiUrl: str;
    pub _adapter: restApiAdapter.IRestApiAdapter;


    new(adapter: restApiAdapter.IRestApiAdapter) {
        let api = new cloud.Api();
        this._adapter = adapter;

        api.get("/greetings", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
            return this._adapter.handle(request);
        });

        this._apiUrl = api.url;
    }

    pub inflight invoke(name: str?): str? {
        let result = http.get("{this._apiUrl}/greetings?name={name}");
        assert(200 == result.status);
        return result.body;
    }
}