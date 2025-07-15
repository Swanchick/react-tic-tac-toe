import React, { ReactElement, useEffect, useState } from "react";
import { PlayerType } from "./global";
import { CellMatrix, MoveRecord } from "./game";

type LoggerProps = {
    records: Array<MoveRecord>;
    onReset: () => void;
    onRecordPressed: (cells: CellMatrix, player: PlayerType, recordIndex: number) => void;
};

export function Logger({onReset, onRecordPressed, records}: LoggerProps): ReactElement {    
    return (
        <div className="logger-container">
            <button onClick={() => {onReset();}}>1. Reset</button>
            {records.map((record, i) => (
                <button
                    key={`${i} ${record.name}`}
                    onClick={() => {
                        onRecordPressed(record.cells, record.currentPlayer, i)
                    }}
                >
                    {i + 2}. {record.name}
                </button>
            ))}
        </div>
    )
}