/**
Interface REST API Greeting.
*/
bring cloud;
bring "./IRestApiAdapter.w" as restApiAdapter;


pub class GreetingApiAdapter impl restApiAdapter.IRestApiAdapter {
    _h: cloud.IFunctionHandler;
    new(handler: cloud.IFunctionHandler) {
        this._h = handler;
    }

    inflight pub handle(request: cloud.ApiRequest): cloud.ApiResponse {
        return cloud.ApiResponse {
            status: 200,
            body: this._h.handle(request.query.get("name"))
        };

    }
}

