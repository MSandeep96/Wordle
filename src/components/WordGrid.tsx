import React, { ReactElement } from "react";
import { WordRow } from "./WordRow";

export const WordGrid = ({
  entries,
  currEntry,
}: {
  entries: string[];
  currEntry: string;
}): ReactElement => {
  return (
    <div className="grid grid-rows-6 gap-1">
      {new Array(6).fill(0).map((_, i) => {
        if (entries[i]) {
          return <WordRow key={i} active={true} word={entries[i]} />;
        }
        if (i === entries.length) {
          return <WordRow key={i} active={false} word={currEntry} />;
        }
        return <WordRow key={i} active={false} word={""} />;
      })}
    </div>
  );
};
