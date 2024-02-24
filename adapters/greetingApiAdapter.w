/**
* Interface REST API Greeting.
*/
bring cloud;
bring "./IRestApiAdapter.w" as restApiAdapter;
bring "../core" as core;
// bring ;


pub class GreetingApiAdapter impl restApiAdapter.IRestApiAdapter {
    _h: cloud.IFunctionHandler;

    new(handler: cloud.IFunctionHandler) {
        this._h = handler;
    }

    inflight static _textPlain(greeting: str): str {
        return greeting;
    }

    inflight static _applicationJson(greeting: str): str {
        let responseBody = Json {
            greeting: greeting
        };
        return Json.stringify(responseBody);
    }

    inflight _findContentType(formatters: Map<inflight (str): str>, headers: Map<str>): str {
        let var contentTypes: Array<str> = {};
        if (headers.has("accept")) {
            contentTypes = (headers.tryGet("accept") ?? "").split((","));
        } elif (headers.has("Accept")) {
            contentTypes = (headers.tryGet("Accept") ?? "").split((","));
        } else {
            return "text/plain";
        }

        for ct in contentTypes {
            if formatters.has(ct) {
                return ct;
            }
        }
        return "text/plain";
    }

    inflight _buildOkResponse(headers: Map<str>, name: str): cloud.ApiResponse {
        let greeting = this._h.handle(name) ?? "";
        let formatters = {
            "text/plain" => GreetingApiAdapter._textPlain,
            "text/html" => core.Greeting.formatHtml,
            "application/json" => GreetingApiAdapter._applicationJson
        };
        let contentType = this._findContentType(formatters, headers);
        return cloud.ApiResponse {
            status: 200,
            body: formatters.get(contentType)(greeting),
            headers: {
                "Content-Type" => contentType
            }
        };
    }

    inflight pub handle(request: cloud.ApiRequest): cloud.ApiResponse {
        if let name = request.query.tryGet("name") {
            return this._buildOkResponse(request.headers ?? {}, name);
        } else {
            return cloud.ApiResponse {
                status: 400,
                body: "Query name=<name> is missing.",
                headers: {
                    "Content-Type" => "text/plain"
                }
            };
        }
    }
}

