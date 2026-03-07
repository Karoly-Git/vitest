import { describe, it, expect } from "vitest";
import { loadDeck } from "../src/loadDeck";

describe('loadDeck', () => {

    it('returns a Promise that resolves', async () => {
        const result = loadDeck();
        expect(result).toBeInstanceOf(Promise);
        await expect(result).resolves.toBeDefined();
    });

    it('resolves a { suits[4], values[13] } deck', () => {

    });

    it('supports another id, e.g. "pokemon"', () => {

    });

    it('rejects with an error for unknown ids', () => {

    });

});