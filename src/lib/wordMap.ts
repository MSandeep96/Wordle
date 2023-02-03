import { words } from "./words";

export const wordMap = new Set<string>(words);

export const isWord = (word: string) => wordMap.has(word);

export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
};
