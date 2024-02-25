/**
* Core Greeting.
*/

pub inflight class Greeting {
    pub extern "../core/makeGreeting.ts" static inflight makeGreeting(name: str?): str;
    pub extern "../core/makeGreeting.ts" static inflight formatHtml(fgreeting: str?): str;
}
