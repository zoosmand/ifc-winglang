/**
* Test Core Greeting.
*/

import { expect, it, describe } from '@jest/globals';
import { formatHtml } from './makeGreeting';

describe('formatHtml', () => {
    it('Should return a properly formatted HTML greeting page.', () => {
        const greeting = "Hello, World!";
        const result = formatHtml(greeting);
        expect(result).toContain(greeting);
    });
});
