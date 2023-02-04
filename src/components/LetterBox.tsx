import React, { ReactElement, useContext } from "react";
import { GuessWord } from "../ctx/GuessWord";

export const LetterBox = ({
  val,
  idx,
  active,
}: {
  val: string;
  idx: number;
  active: boolean;
}): ReactElement => {
  const guessWord = useContext(GuessWord);

  let bgColor = "bg-black";
  let borderColor = "border-slate-500";
  if (val !== "") {
    borderColor = "border-slate-300";
  }
  if (active) {
    if (guessWord.includes(val)) {
      bgColor = "bg-yellow-400";
      borderColor = "border-yellow-500";
      if (guessWord[idx] === val) {
        bgColor = "bg-green-400";
        borderColor = "border-green-500";
      }
    } else {
      bgColor = "bg-slate-500";
      borderColor = "border-slate-500";
    }
  }

  return (
    <input
      type="text"
      className={`border-2 transition-all ease-in-out font-bold capitalize border-opacity-50 w-14 h-14 text-4xl text-center ${bgColor} ${borderColor}`}
      value={val}
      disabled
    />
  );
};
