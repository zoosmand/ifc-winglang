/**
* Test Core Greeting.
*/

import { expect, it, describe } from '@jest/globals';
import { makeGreeting } from './makeGreeting';

describe('makeGreeting', () => {
    it('Should return a greeting with the provided name', () => {
        const name = "World";
        const expected = 'Hello, World!';
        const result = makeGreeting(name);
        expect(result).toBe(expected);
    });
});
