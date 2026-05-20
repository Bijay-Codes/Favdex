import { useContext, useState } from "react"
import { capitalize } from '../Utility/util-basic.js'
import { PokeContext } from "./Hooks/PokedexContext.jsx";
export function RenderFilterStrip({ array }) {
    const { type, setType } = useContext(PokeContext);
    return (<div
        className="filter-strip flex flex-nowrap justify-evenly gap-4 overflow-x-auto w-full
     py-4 font-(--font-main) rounded-l-2xl rounded-r-lg">
        {array.map(data => {
            let isFilter = data === type;
            return <span
                key={data}
                className={`${isFilter ? 'bg-(--bg-main)/20 text-(--text-highlight) border-2 border-(--border) rounded animate-pulse'
                    : 'bg-(--highlight) text-(--text-secondary) border-2 border-(--bg-dark) rounded-lg'} px-2 mx-1`}
                onClick={() => {
                    if (type !== data) {
                        setType(data);
                    } else {
                        setType(null);
                    }
                }}>
                {capitalize(data)}
            </span>
        })}
    </div>
    )
}

export function filterByType(list, type) {
    if (!type) return list;
    return list.filter(data => {
        return data.types[0] === type || data.types[1] === type;
    })
}
