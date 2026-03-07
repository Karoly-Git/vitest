Here is the **entire `UNIT_TEST_VITE.md` as one single copy-paste block**.

````markdown
# UNIT_TEST_VITE.md

## Unit Testing with Vitest

This document explains the basics of **unit testing with Vitest** using practical examples.

Vitest is a fast testing framework designed for **Vite-based projects**. It provides a simple API similar to Jest and is commonly used in modern JavaScript and TypeScript projects.

Main testing functions:

```javascript
describe();
it();
test();
expect();
```

These functions help structure tests and verify behaviour.

---

# 1. Test Structure

A typical test consists of three parts:

1. **Arrange** – prepare the data  
2. **Act** – run the function being tested  
3. **Assert** – check the result  

Example:

```javascript
it('returns the longest string', () => {
    const result = longestString('a', 'abc');
    expect(result).toBe('abc');
});
```

Structure:

```
describe()  -> groups tests
   it()     -> single test case
      expect() -> assertion
```

---

# 2. Test Suites

`describe()` groups related tests together.

Example:

```javascript
describe('example.longestString', () => {

    it('returns the longest string', () => {
        const result = longestString('a', 'abc');
        expect(result).toBe('abc');
    });

});
```

Benefits:

- Organizes tests
- Improves readability
- Groups tests by function or module

---

# 3. Testing a Simple Function

Example function:

```javascript
export function longestString(str1, str2) {
    if (str1.trim().length >= str2.trim().length) return str1;
    return str2;
}
```

Test cases:

```javascript
describe('example.longestString', () => {

    it('returns the longest string', () => {
        expect(longestString('a', 'abc')).toBe('abc');
    });

    it('returns the first string if both length are equal', () => {
        expect(longestString('abc', '123')).toBe('abc');
    });

    it('handles empty string', () => {
        expect(longestString('', 'abc')).toBe('abc');
        expect(longestString('abc', '')).toBe('abc');
        expect(longestString('', '')).toBe('');
    });

});
```

Matchers used:

```
toBe()
```

`toBe()` checks strict equality.

---

# 4. Testing Errors

Some functions should throw errors when given invalid input.

Example function:

```javascript
export function isPrime(num) {
    if (typeof num !== 'number') throw new Error('Input must be a number');
}
```

Testing thrown errors:

```javascript
it('throw error if num is not a number', () => {
    const badCall = () => isPrime('not number input');
    expect(badCall).toThrow();
});
```

Important rule:

`toThrow()` **only catches errors thrown inside a function wrapper**.

Incorrect:

```javascript
expect(isPrime('bad')).toThrow();
```

Correct:

```javascript
expect(() => isPrime('bad')).toThrow();
```

You can also check the error message:

```javascript
expect(badCall).toThrow('Input must be a number');
```

---

# 5. Testing Boolean Logic

Example test cases for a prime number function:

```javascript
it('false if num <= 1', () => {
    expect(isPrime(1)).toBe(false);
    expect(isPrime(0)).toBe(false);
    expect(isPrime(-1)).toBe(false);
});

it('true for prime numbers', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
});
```

Matcher used:

```
toBe(true)
toBe(false)
```

---

# 6. Table Driven Tests (it.each)

Vitest allows testing multiple inputs with one test.

Example:

```javascript
it.each([
    { weight: 0.2, expected: 3.99 },
    { weight: 5, expected: 5.99 },
    { weight: 15, expected: 8.99 },
])('returns correct shipping cost for weight %f', ({ weight, expected }) => {
    expect(shippingCost(weight)).toBe(expected);
});
```

Benefits:

- Reduces repeated test code
- Easy to add more test cases
- Improves readability

---

# 7. Testing Functions That Throw Validation Errors

Example:

```javascript
it('bad weight input', () => {
    const badWeightCall = () => shippingCost("bad weigh");
    expect(badWeightCall).toThrow();
});
```

Also validating ranges:

```javascript
it('weight <= 0 throws error', () => {
    expect(() => shippingCost(0)).toThrow();
    expect(() => shippingCost(-0.25)).toThrow();
});
```

---

# 8. Testing Array Results

Example function creates playing cards.

```javascript
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

Tests:

```javascript
it('returns an array', () => {
    const cards = createCards({ suits, values });
    expect(Array.isArray(cards)).toBe(true);
});

it('creates a deck of 52 cards', () => {
    const cards = createCards({ suits, values });
    expect(cards).toHaveLength(52);
});
```

Matchers used:

```
toHaveLength()
Array.isArray()
```

---

# 9. Testing Input Validation

Testing incorrect inputs:

```javascript
it('throw error if suits or values are not standard lengths', () => {
    expect(() => { createCards({ suits: ['Hearts'], values }) }).toThrow();
});

it('throw error if suits or values are not array', () => {
    expect(() => { createCards({ suits: 'Hearts', values }) }).toThrow();
});
```

This ensures the function validates input properly.

---

# 10. Testing Asynchronous Code

Example async function:

```javascript
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

## Testing Promise Resolution

```javascript
it('returns a Promise that resolves', async () => {
    const result = loadDeck();

    expect(result).toBeInstanceOf(Promise);

    await expect(result).resolves.toBeDefined();
});
```

Matchers used:

```
resolves
toBeInstanceOf()
```

---

## Testing Returned Object

```javascript
it('resolves a deck object', async () => {
    const deck = await loadDeck();

    expect(deck).toHaveProperty('suits');
    expect(deck).toHaveProperty('values');

    expect(deck.suits).toHaveLength(4);
    expect(deck.values).toHaveLength(13);
});
```

Matchers used:

```
toHaveProperty()
toHaveLength()
```

---

## Testing Promise Rejection

```javascript
it('rejects with an error for unknown ids', async () => {
    const deck = loadDeck('wrong id');

    await expect(deck).rejects.toThrow();
});
```

Matcher:

```
rejects
```

Used when a **Promise should fail**.

---

# 11. Common Matchers

Frequently used Vitest matchers:

```
toBe()
toEqual()
toThrow()
toHaveLength()
toHaveProperty()
toBeInstanceOf()
resolves
rejects
```

---

# 12. Best Practices

Good unit tests should:

✔ Test one behaviour per test  
✔ Have clear test names  
✔ Cover valid and invalid inputs  
✔ Test edge cases  
✔ Test errors  
✔ Test async behaviour when needed  

Example of good naming:

```
returns the longest string
throws error if input is invalid
creates a deck of 52 cards
rejects with error for unknown deck
```

---

# Summary

Vitest allows you to test:

- simple functions
- validation errors
- arrays and objects
- async functions
- edge cases

Core workflow:

```
describe -> group tests
it/test  -> define behaviour
expect   -> verify results
```

Unit testing ensures your functions behave correctly and helps prevent bugs when your application grows.
````
