import { describe, it, expect, test } from "vitest"; // Note: it and test functions are the same 
import { longestString, isPrime, shippingCost } from "../src/examples";

// Test Suite: groups related tests for one function or module
describe('example.longestString', () => {

    // Test Case: tests one specific behaviour of the function
    it('returns the longest string', () => {

        // Act: run the function being tested
        const result = longestString('a', 'abc');

        // Assertion: check that the result is what we expect
        expect(result).toBe('abc');
    });

    it('returns the first string if both length are equal', () => {
        expect(longestString('abc', '123')).toBe('abc');
    });

    it('handles empty string', () => {
        expect(longestString('', 'abc')).toBe('abc');
        expect(longestString('abc', '')).toBe('abc');
        expect(longestString('', '')).toBe('');
    });

    test('ignores head/tail whitespace', () => {
        expect(longestString('   a', 'abc')).toBe('abc');
        expect(longestString('a   ', 'abc')).toBe('abc');
        expect(longestString('   a   ', 'abc')).toBe('abc');
    });
});


describe('examples.isPrime', () => {
    // toThrow can only catch errors that happen inside a function it executes!!!
    it('throw error if num is not a number', () => {
        const badCall = () => isPrime('not number input');
        expect(badCall).toThrow();

        // Error message can be also added, optional:
        expect(badCall).toThrow('Input must be a number');
    });

    it('false if num is less or equal to 1', () => {
        expect(isPrime(1)).toBe(false);
        expect(isPrime(0)).toBe(false);
        expect(isPrime(-1)).toBe(false);
    });

    it('false if num > 2 but not a prime', () => {
        expect(isPrime(4)).toBe(false);
        expect(isPrime(6)).toBe(false);
    });

    it('true if num >= 2 and a prime', () => {
        expect(isPrime(2)).toBe(true);
        expect(isPrime(3)).toBe(true);
        expect(isPrime(5)).toBe(true);
    });

    it('false for non integers', () => {
        expect(isPrime(3.25)).toBe(false);
    });
});

describe('examples.shippingCost', () => {
    it('wrong weight input', () => {
        const badWeigtCall = () => shippingCost("wrong weigh");
        expect(badWeigtCall).toThrow();
    });

    it.each([
        { weight: 0.2, expected: 3.99 },
        { weight: 5, expected: 5.99 },
        { weight: 15, expected: 8.99 },
    ])('shipping cost', ({ weight, expected }) => {
        expect(shippingCost(weight)).toBe(expected);
    });
});