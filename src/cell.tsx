import React, { ReactElement } from "react";
import { PlayerType } from "./global";

type CellProps = {
    className: string;
    x: number;
    y: number;
    player: PlayerType;
    onClick: (x: number, y: number, player: PlayerType) => void
};

export function Cell({className, x, y, player, onClick}: CellProps): ReactElement {
    let content = "";

    const handleClick = () => {
        onClick(x, y, player);
    };
    
    switch (player) {
        case PlayerType.None:
            content = "";
            break;
        case PlayerType.Circle:
            content = "O";
            break;
        case PlayerType.Cross:
            content = "X";
            break;
    }

    return (
        <button onClick={handleClick} className={`cell ${className}`}>
            {content}
        </button>
    );
}