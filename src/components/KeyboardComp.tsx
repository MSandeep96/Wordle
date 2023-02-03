import React, { ReactElement } from "react";
import { Pridi } from "@next/font/google";

const pridi = Pridi({ weight: "600", subsets: ["latin"] });

export const KeyboardComp = ({
  handleKeyPress,
}: {
  handleKeyPress: ({ key }: { key: string }) => void;
}): ReactElement => {
  const keyBoard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const getButton = (letter: string, stretch: boolean = false) => (
    <button
      className={
        "bg-gray-800 rounded-md text-sm basis-10 capitalize py-4" +
        (stretch ? " flex-auto" : "")
      }
      key={letter}
      onClick={() => handleKeyPress({ key: letter })}
    >
      {letter}
    </button>
  );

  return (
    <div className="grid grid-rows-3 gap-2 mt-4 px-2 w-full max-w-lg font-bold">
      <div className="flex flex-row gap-1 justify-center w-full">
        {keyBoard[0].map((letter) => getButton(letter, true))}
      </div>
      <div className="flex flex-row gap-1 justify-center">
        {keyBoard[1].map((letter) => getButton(letter))}
      </div>
      <div className="flex flex-row gap-1 justify-center">
        <button
          className="bg-gray-800 rounded-md text-sm basis-16 flex-auto capitalize py-4 px-2"
          onClick={() => handleKeyPress({ key: "Enter" })}
        >
          ENTER
        </button>
        {keyBoard[2].map((letter) => getButton(letter))}
        <button
          className="bg-gray-800 rounded-md basis-16 flex-auto capitalize py-4 px-2"
          onClick={() => handleKeyPress({ key: "Backspace" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 m-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
