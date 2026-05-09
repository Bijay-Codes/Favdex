import { useCallback, useContext, useEffect, useState } from "react"
import { PokeContext } from "./Hooks/PokedexContext";

export function ErrorBox() {
    const { error } = useContext(PokeContext);
    return (
        error &&
        <div className="h-max min-h-10 p-2 w-full text-(--text-inverse) fixed top-[20%] z-999 bg-(--bg-main)/50 text-center">
            {error}
        </div>
    )
}