import React, { ReactElement } from "react";
import { LetterBox } from "./LetterBox";

export const WordRow = ({
  word,
  active,
}: {
  word: string;
  active: boolean;
}): ReactElement => {
  return (
    <div className="grid grid-cols-5 w-fit gap-1">
      {new Array(5).fill(0).map((_, i) => (
        <LetterBox
          key={i}
          idx={i}
          active={active}
          val={word[i] ? word[i] : ""}
        />
      ))}
    </div>
  );
};
