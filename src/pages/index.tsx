import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { KeyboardComp } from "../components/KeyboardComp";
import { WordGrid } from "../components/WordGrid";
import { GuessWord } from "../ctx/GuessWord";
import { getRandomWord, isWord } from "../lib/wordMap";

const initLetterMap: Record<string, number> = {};
[
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
].map((l) => (initLetterMap[l] = 0));

export default function Home() {
  const [guessWord, setGuessWord] = useState<string>(getRandomWord());
  const [entries, setEntries] = useState<string[]>([]);
  const [currEntry, setCurrEntry] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [letterMap, setLetterMap] =
    useState<Record<string, number>>(initLetterMap);

  const newGame = useCallback(() => {
    setGuessWord(getRandomWord());
    setEntries([]);
    setCurrEntry("");
    setIsGameOver(false);
    setLetterMap(initLetterMap);
  }, []);

  const handleKeyPress = useCallback(
    ({ key }: { key: string }) => {
      if (entries.length === 6) return;
      if (isGameOver) return;
      if (key === "Backspace") {
        setCurrEntry(currEntry.slice(0, -1));
      } else if (key === "Enter") {
        if (currEntry.length !== 5) return;
        if (isWord(currEntry)) {
          let lmCopy = { ...letterMap };
          currEntry.split("").map((l, i) => {
            let temp = lmCopy[l];
            if (guessWord.includes(l)) {
              temp = Math.max(temp, 1);
              if (guessWord[i] === l) {
                temp = 2;
              }
            } else {
              temp = -1;
            }
            lmCopy[l] = temp;
          });
          setLetterMap(lmCopy);
          setEntries([...entries, currEntry]);
          setCurrEntry("");
        }
        if (currEntry === guessWord) {
          setIsGameOver(true);
          return;
        }
      } else if (key.length === 1 && key.match(/[a-z]/i)) {
        if (currEntry.length === 5) return;
        setCurrEntry(currEntry + key);
      }
    },
    [currEntry, guessWord, isGameOver, entries]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <GuessWord.Provider value={guessWord}>
      <div className="flex flex-col h-screen text-white bg-black w-screen">
        <Header newGame={newGame} />
        <main className="flex flex-col flex-grow mt-4 items-center text-white">
          <WordGrid entries={entries} currEntry={currEntry} />
          {isGameOver && (
            <div className="bg-green-600 rounded-lg text-xs mt-4 px-2">
              Game Over
            </div>
          )}
          {entries.length === 6 && !isGameOver && (
            <div className="bg-red-600 rounded-lg text-xs mt-4 px-2">
              You Suck
            </div>
          )}
          <KeyboardComp handleKeyPress={handleKeyPress} letterMap={letterMap} />
        </main>
      </div>
    </GuessWord.Provider>
  );
}
