import { useContext, useState } from "react"
import { capitalize } from '../Utility/util-basic.js'
import { PokeContext } from "./Hooks/PokedexContext.jsx";
import '../ComponentCSS/TypesCss.css'
export function RenderFilterStrip({ array }) {
    const { type, setType } = useContext(PokeContext);

    return (
        <div className="header-part modern-scroll-x [grid-area:filter] gap-5 flex flex-nowrap overflow-auto py-2 lg:text-3xl lg:p-4">
            {array.map(data => {
                const isFilter = data === type;
                return (
                    <div
                        key={data}
                        className="flex items-center justify-center min-w-fit shrink"
                    >
                        <span
                            className={`${isFilter
                                ? 'outline outline-(--border-white) text-center'
                                : data
                                } poke-types px-[clamp(0.5rem,2vw,2rem)] md:py-1 rounded-lg cursor-pointer text-[clamp(1rem,1vw,1.3rem)]
                                 transition-all ease-in-out relative`}
                            onClick={() => setType(isFilter ? null : data)}>
                            {capitalize(data)} <span
                                className={`absolute top-1/2 right-2 mr-0 -translate-x-1/2 -translate-y-1/2 text-(--text-primary)
                                     transition-all duration-200
                                 ${isFilter ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                    }`}
                            >𝕩</span>
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
export function filterByType(list, type) {
    if (!type) return list;
    return list.filter(data => {
        return data.types[0] === type || data.types?.[1] === type;
    })
}
