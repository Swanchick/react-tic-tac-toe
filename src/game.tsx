import React, { ReactElement, useState, useEffect } from "react";
import { Cell } from "./cell"
import { PlayerType, ALL_POSSIBLE_WINS, WIN_STATUS } from "./global"
import { Logger } from "./logger";


export type CellMatrix = Array<Array<PlayerType>>;

export type MoveRecord = {
    name: string;
    cells: CellMatrix;
    currentPlayer: PlayerType;
};


function checkWinner(cells: CellMatrix) {
    for (const wins of ALL_POSSIBLE_WINS) {
        let firstPlayer: PlayerType = PlayerType.None;
        let lastPlayer: PlayerType = PlayerType.None;
        let allTheSame = true;
        
        for (const win of wins.allPos) {
            if (!allTheSame) {
                continue;
            }

            const player = cells[win.y][win.x];
            if (player === PlayerType.None) {
                allTheSame = false;
                continue;
            }

            lastPlayer = player;

            if (firstPlayer === PlayerType.None) {
                firstPlayer = player;
                continue;
            }

            if (firstPlayer !== player) {
                allTheSame = false;

                continue;
            }
        }

        if (allTheSame) {
            switch (lastPlayer) {
                case PlayerType.Cross:
                    return WIN_STATUS.Cross;
                case PlayerType.Circle:
                    return WIN_STATUS.Circle;
            }
        }
    }

    for (const line of cells) {
        for (const cell of line) {
            if (cell === PlayerType.None) {
                return WIN_STATUS.None;
            }
        }
    }

    return WIN_STATUS.Draw;
}


export function Game(): ReactElement {
    const [cells, setCells] = useState<CellMatrix>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);

    const [gameMessage, setGameMessage] = useState("");
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(PlayerType.Cross);
    const [winStatus, setWinStatus] = useState<WIN_STATUS>(WIN_STATUS.None);
    const [records, setRecords] = useState<Array<MoveRecord>>([]);

    const handleCellClick = (x: number, y: number, player: PlayerType) => {
        if (winStatus !== WIN_STATUS.None || player !== PlayerType.None) {
            return;
        }

        const newRecords = records;
        newRecords.push({
            name: `Go to move #${newRecords.length + 1}`,
            cells: cells,
            currentPlayer: currentPlayer
        });

        setRecords(newRecords);

        const newCells = cells.map((row, rowIdx) => 
          rowIdx === y ? 
            row.map((cell, colIdx) => (colIdx === x ? currentPlayer : cell)) : 
            row.slice()
        );

        setCells(newCells);

        if (currentPlayer === PlayerType.Cross) {
            setCurrentPlayer(PlayerType.Circle);
        } else {
            setCurrentPlayer(PlayerType.Cross);
        }

        const result = checkWinner(newCells);
        setWinStatus(result);
    };

    const renderGameMessage = () => {
        switch (winStatus) {
            case WIN_STATUS.Circle:
                setGameMessage("Winner: O!");
                return;
            case WIN_STATUS.Cross:
                setGameMessage("Winner: X!");
                return;
            case WIN_STATUS.Draw:
                setGameMessage("Draw");
                return;
        }
        
        switch (currentPlayer) {
            case PlayerType.Cross:
                setGameMessage("Next player: X");
                break;
            case PlayerType.Circle:
                setGameMessage("Next player: O");
                break;
        }
    };

    const handleReset = () => {
        setWinStatus(WIN_STATUS.None);
        setCurrentPlayer(PlayerType.Cross);
        setRecords([]);
        setCells([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    };

    const handleRecordPressed = (cells: CellMatrix, player: PlayerType, recordIndex: number) => {
        setWinStatus(WIN_STATUS.None);
        setCells(cells);
        setCurrentPlayer(player);

        console.log(records);
        
        const newRecords = records.slice(0, recordIndex);

        console.log(recordIndex);

        setRecords(newRecords);
    };

    useEffect(() => {
        renderGameMessage();
    }, [renderGameMessage]);

    return (
        <>
            <h1>{gameMessage}</h1>
            <div className="main">
            <div className="vertical">
                <div className="game">
                    {cells.map((row, y) => 
                        row.map((player, x) => (
                            <Cell
                                className={winStatus === WIN_STATUS.None ? "active" : ""}
                                key={`${x} ${y}`}
                                x={x}
                                y={y}
                                player={player}
                                onClick={handleCellClick}
                            />
                        ))
                    )}
                </div>
            </div>

            <Logger 
                records={records}
                onReset={handleReset}
                onRecordPressed={handleRecordPressed}
            />
        </div>
        </>
        
    );
}