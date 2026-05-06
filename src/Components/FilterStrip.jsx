import { useContext, useState } from "react"
import { capitalize } from '../Utility/util-basic.js'
import { PokeContext } from "./Hooks/PokedexContext.jsx";
export function RenderFilterStrip({ array }) {
    const { type, setType } = useContext(PokeContext);
    return (<div
        className="filter flex flex-nowrap justify-strech overflow-auto gap-2">
        {array.map(data => {
            let isFilter = data === type;
            return <span
                key={data}
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
