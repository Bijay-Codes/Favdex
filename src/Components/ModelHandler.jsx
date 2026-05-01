import { useEffect, useRef } from "react"
import { RenderPokemon } from "./Renderer";
export function RenderModal({ data, setData }) {
    const modalRef = useRef(null);
    const closeModal = () => setData(null);
    useEffect(() => {
        if (data) {
            modalRef.current.showModal();
        } else {
            if (modalRef.current?.open) {
                modalRef.current.close();
            }
        }
    }, [data]);
    
    return (
        <dialog id="pokemon-details"
            ref={modalRef}
            onClick={closeModal}
            onCancel={closeModal}>
            <div onClick={(e) => e.stopPropagation()}
                className="bg-gray-500">
                <button onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
                {data ? <RenderPokemon pokemon={data[0]} modalview={true} /> : ''}
                {data ? <RenderDetails pokemon={data[0]} /> : ""}
            </div>
        </dialog>
    )
}

function RenderDetails({ pokemon }) {
    return (
        <div>
            <span>Weight: {pokemon.weight / 10} Kg</span>
            <span>Height: {pokemon.height / 10} Metres</span>
        </div>
    )
}