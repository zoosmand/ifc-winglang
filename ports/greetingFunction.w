/**
* Ports. Greeting function.
*/
bring cloud;

pub class GreetingFunction {
    _f: cloud.Function;
    new(handler: cloud.IFunctionHandler) {
        this._f = new cloud.Function(handler);
    }

    pub inflight invoke(name: str?): str? {
        return this._f.invoke(name);
    }
}