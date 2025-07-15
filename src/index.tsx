import React, { createContext, Dispatch, SetStateAction, useState } from "react"
import ReactDOM from "react-dom/client";
import { Game } from "./game";


window.onload = () => {
    const root = document.getElementById("root");
    if (root === null) {
        return;
    }

    ReactDOM.createRoot(root).render(
        <>
            <Game />
        </>
    );
};