# Vitest Unit Testing Guide

A simple educational reference for writing **unit tests using Vitest**.

Vitest is a fast test framework designed for **Vite projects** and has an API very similar to Jest.

---

# Core Testing Functions

## Common test utilities you'll use

| Function | Purpose |
|--------|--------|
| `describe()` | Groups related tests |
| `it()` | Defines a single test |
| `test()` | Same as `it()` |
| `expect()` | Creates an assertion |
| `it.each()` | Runs a test with multiple inputs |

Example:

```js
describe('math example', () => {

    it('adds numbers correctly', () => {
        expect(2 + 2).toBe(4);
    });

});
```

---

# Common Matchers

## Frequently used Vitest assertions

| Matcher | Purpose |
|--------|--------|
| `toBe()` | Strict equality |
| `toEqual()` | Deep equality |
| `toThrow()` | Expect an error |
| `toHaveLength()` | Check array/string length |
| `toHaveProperty()` | Check object property |
| `toBeInstanceOf()` | Check object type |
| `.resolves` | Promise resolves |
| `.rejects` | Promise rejects |

---

# Test Structure

Most tests follow the **AAA pattern**.

| Step | Meaning |
|----|----|
| Arrange | Prepare data |
| Act | Run the function |
| Assert | Verify the result |

Example:

```js
it('returns the longest string', () => {

    const result = longestString('a', 'abc'); // Act

    expect(result).toBe('abc'); // Assert

});
```

---

# Testing Simple Functions

## Example Function

```js
export function longestString(str1, str2) {

    if (str1.trim().length >= str2.trim().length) return str1;

    return str2;

}
```

## Example Tests

```js
describe('example.longestString', () => {

    it('returns the longest string', () => {
        expect(longestString('a', 'abc')).toBe('abc');
    });

    it('returns the first string if both are equal', () => {
        expect(longestString('abc', '123')).toBe('abc');
    });

    it('handles empty strings', () => {
        expect(longestString('', 'abc')).toBe('abc');
        expect(longestString('abc', '')).toBe('abc');
        expect(longestString('', '')).toBe('');
    });

});
```

---

# Testing Errors

Some functions should **throw errors when input is invalid**.

## Example Function

```js
export function isPrime(num) {

    if (typeof num !== 'number')
        throw new Error('Input must be a number');

}
```

## Testing Errors

```js
it('throws error if input is not a number', () => {

    const badCall = () => isPrime('not number input');

    expect(badCall).toThrow();

});
```

### Important Rule

`toThrow()` only works if the function call is wrapped.

Incorrect:

```js
expect(isPrime('bad')).toThrow();
```

Correct:

```js
expect(() => isPrime('bad')).toThrow();
```

---

# Testing Boolean Logic

Example tests for a prime number function.

```js
it('false if number <= 1', () => {

    expect(isPrime(1)).toBe(false);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(-1)).toBe(false);

});

it('true for prime numbers', () => {

    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);

});
```

---

# Table Driven Tests

Vitest allows testing multiple inputs using `it.each()`.

## Example

```js
it.each([
    { weight: 0.2, expected: 3.99 },
    { weight: 5, expected: 5.99 },
    { weight: 15, expected: 8.99 }
])('returns correct shipping cost for weight %f', ({ weight, expected }) => {

    expect(shippingCost(weight)).toBe(expected);

});
```

Benefits:

- avoids repeated test code
- easier to extend
- clearer test cases

---

# Testing Arrays

## Example Function

```js
export function createCards({ suits, values }) {

    let cards = [];

    for (const suit of suits) {
        for (const value of values) {

            cards.push({ suit, value });

        }
    }

    return cards;

}
```

## Tests

```js
it('returns an array', () => {

    const cards = createCards({ suits, values });

    expect(Array.isArray(cards)).toBe(true);

});

it('creates a deck of 52 cards', () => {

    const cards = createCards({ suits, values });

    expect(cards).toHaveLength(52);

});
```

---

# Testing Input Validation

Functions should also validate incorrect input.

```js
it('throws error if suits or values are wrong length', () => {

    expect(() => createCards({ suits: ['Hearts'], values })).toThrow();

});

it('throws error if inputs are not arrays', () => {

    expect(() => createCards({ suits: 'Hearts', values })).toThrow();

});
```

---

# Testing Async Functions

Some functions return **Promises**.

## Example Function

```js
export function loadDeck(id = 'standard') {

    return new Promise((resolve, reject) => {

        const deck = DECKS[id];

        if (!deck) {
            reject(new Error('deck not found with that id'));
            return;
        }

        resolve(deck);

    });

}
```

---

# Testing Promise Resolution

```js
it('returns a Promise that resolves', async () => {

    const result = loadDeck();

    expect(result).toBeInstanceOf(Promise);

    await expect(result).resolves.toBeDefined();

});
```

---

# Testing Returned Objects

```js
it('resolves a deck object', async () => {

    const deck = await loadDeck();

    expect(deck).toHaveProperty('suits');
    expect(deck).toHaveProperty('values');

    expect(deck.suits).toHaveLength(4);
    expect(deck.values).toHaveLength(13);

});
```

---

# Testing Promise Rejection

```js
it('rejects for unknown deck id', async () => {

    const deck = loadDeck('wrong id');

    await expect(deck).rejects.toThrow();

});
```

---

# Best Practices

Good unit tests should:

- test **one behaviour per test**
- use **clear test names**
- test **valid inputs**
- test **invalid inputs**
- test **edge cases**
- test **async behaviour**

Examples of good test names:

```
returns the longest string
throws error if input is invalid
creates a deck of 52 cards
rejects with error for unknown deck
```

---

# Summary

Vitest helps you test:

| Type | Example |
|----|----|
| Simple functions | `longestString()` |
| Validation | `isPrime()` |
| Arrays | `createCards()` |
| Business logic | `shippingCost()` |
| Async code | `loadDeck()` |

Core workflow:

```
describe → group tests
it/test → define behaviour
expect → verify result
```

Unit testing ensures functions behave correctly and prevents bugs as projects grow.