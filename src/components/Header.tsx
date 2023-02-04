import React, { ReactElement, useRef } from "react";
import { Pridi } from "@next/font/google";
import * as Tooltip from "@radix-ui/react-tooltip";

const pridi = Pridi({ weight: "600", subsets: ["latin"] });

export const Header = ({ newGame }: { newGame: () => void }): ReactElement => {
  const hoverRef = useRef<HTMLDivElement>(null);

  return (
    <header className="grid grid-cols-12 w-screen h-16 border-b border-slate-500 border-opacity-50">
      <div className="col-start-4 col-span-6 justify-self-center self-center">
        <h1 className={pridi.className + " text-4xl font-bold"}>Wordle</h1>
      </div>
      <div className="col-start-10 col-span-3 justify-self-end self-center px-4">
        <Tooltip.Provider>
          <Tooltip.Root delayDuration={300}>
            <Tooltip.Trigger asChild>
              <button
                className="hover:bg-gray-700 p-2 rounded-md active:bg-gray-600"
                onClick={newGame}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content side="bottom">
                <Tooltip.Arrow className="fill-white" />
                <div className="bg-white text-black rounded-sm text-xs p-1 mr-2">
                  New Game
                </div>
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </header>
  );
};
