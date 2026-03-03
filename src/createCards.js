export function createCards({ suits, values }) {
    if (!Array.isArray(suits) || !Array.isArray(values)) {
        throw new TypeError('');
    };

    if (suits.length !== 4 || values.length !== 13) {
        throw new RangeError('');
    };

    let cards = [];

    for (const suit of suits) {
        for (const value of values) {
            cards.push({ suit, value });
        }
    };

    return cards;
}
