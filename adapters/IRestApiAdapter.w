/**
Interface REAST API.
*/

bring cloud;

pub interface IRestApiAdapter {
    inflight handle(request: cloud.ApiRequest): cloud.ApiResponse;
}
