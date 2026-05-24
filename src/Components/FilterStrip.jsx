import { useContext, useState } from "react"
import { capitalize } from '../Utility/util-basic.js'
import { PokeContext } from "./Hooks/PokedexContext.jsx";
import '../ComponentCSS/TypesCss.css'
export function RenderFilterStrip({ array }) {
    const { type, setType } = useContext(PokeContext);
    return (
        <div
            className="header-part [grid-area:filter]
             gap-5 flex flex-nowrap overflow-auto py-2">
            {array.map(data => {
                let isFilter = data === type;
                return <span
                    key={data}
                    className={`${isFilter ? `${data}`
                        : ''} ${data} poke-types min-w-fit px-4 rounded-lg`}
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
