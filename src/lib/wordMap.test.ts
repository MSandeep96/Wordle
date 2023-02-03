import { getRandomWord, isWord, wordMap } from "./wordMap";

describe("Word Map", () => {
  describe("Word set", () => {
    it("should not be empty", () => {
      expect(wordMap.size).toBeGreaterThan(0);
    });

    it("should contain 'hello'", () => {
      expect(wordMap.has("hello")).toBeTruthy();
    });

    it("should contain 'world'", () => {
      expect(wordMap.has("world")).toBeTruthy();
    });

    it("should not contain 'hellooo'", () => {
      expect(wordMap.has("hellooo")).toBeFalsy();
    });
  });

  describe("Random word", () => {
    it("should be a word", () => {
      const randomWord = getRandomWord();
      expect(wordMap.has(randomWord)).toBeTruthy();
    });
  });

  describe("isWord", () => {
    it("should return true for 'hello'", () => {
      expect(isWord("hello")).toBeTruthy();
    });

    it("should return false for 'hellooo'", () => {
      expect(isWord("hellooo")).toBeFalsy();
    });
  });
});
