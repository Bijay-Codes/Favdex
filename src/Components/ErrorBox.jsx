import { useCallback, useContext, useEffect, useState } from "react"
import { PokeContext } from "./Hooks/PokedexContext";

export function ErrorBox() {
    const { error } = useContext(PokeContext);
    return (
        error &&
        <div className="h-max min-h-[10%] p-2 w-full bg-(--bg-overlay)
         text-(--text-primary) fixed top-[20%] outline outline-(--accent)
         z-50 text-xl lg:text:2xl text-center">
            {error}
        </div>
    )
}