import { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { KeyboardComp } from "../components/KeyboardComp";
import { WordGrid } from "../components/WordGrid";
import { GuessWord } from "../ctx/GuessWord";
import { getRandomWord, isWord } from "../lib/wordMap";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import Image from "next/image";

const initLetterMap: Record<string, number> = {};
"abcdefghijklmnopqrstuvwxyz".split("").map((l) => (initLetterMap[l] = 0));

export default function Home() {
  const [guessWord, setGuessWord] = useState<string>(getRandomWord());
  const [entries, setEntries] = useState<string[]>([]);
  const [currEntry, setCurrEntry] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [letterMap, setLetterMap] =
    useState<Record<string, number>>(initLetterMap);
  const [isError, setIsError] = useState<boolean>(false);

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
        if (!isWord(currEntry)) {
          setIsError(true);
          setTimeout(() => setIsError(false), 1000);
          return;
        }
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
        if (currEntry === guessWord) {
          setIsGameOver(true);
          return;
        }
      } else if (key.length === 1 && key.match(/[a-z]/i)) {
        if (currEntry.length === 5) return;
        setCurrEntry(currEntry + key);
      }
    },
    [currEntry, guessWord, isGameOver, entries, letterMap]
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
          <KeyboardComp handleKeyPress={handleKeyPress} letterMap={letterMap} />
          <AlertDialog.Root open={entries.length === 6 || isGameOver}>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-black bg-opacity-30 fixed inset-0" />
              <AlertDialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6">
                <AlertDialog.Title className="font-bold text-lg">
                  {"You "}
                  {isGameOver ? (
                    <span className="text-green-400">Win!</span>
                  ) : (
                    <span className="text-red-400">Suck!</span>
                  )}
                </AlertDialog.Title>
                <AlertDialog.Description className="font-thin mt-2">
                  The word was{" "}
                  <span className="font-bold uppercase">{`"${guessWord}"`}</span>
                </AlertDialog.Description>
                <div className="flex justify-center mt-4">
                  <button
                    className="bg-yellow-400 outline-none py-2 px-4 rounded-md hover:bg-yellow-500"
                    onClick={newGame}
                  >
                    Ok
                  </button>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
          <div
            className={
              `bg-black bg-opacity-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md ` +
              (!isError ? "hidden" : "")
            }
          >
            <img
              src="https://media.tenor.com/RUJokzj0C2gAAAAC/speak-english-pulp-fiction.gif"
              alt="Invalid word"
            />
          </div>
        </main>
      </div>
    </GuessWord.Provider>
  );
}
