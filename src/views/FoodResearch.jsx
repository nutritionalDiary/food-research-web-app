import { useEffect, useRef } from 'react';
import bgImage from "../assets/bg.jpg";

const FoodResearch = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        if (headerRef.current) {
            headerRef.current.classList.add('opacity-100', 'translate-y-0');
        }
    }, []);

    return (
        <div className="">
            <div
                className="
                    flex flex-col items-center
                    w-full h-1/2
                    absolute top-0 left-0 right-0
                    m-0 p-0
                "
                style={{ backgroundImage: `url(${bgImage})`, backgroundRepeat: "none", backgroundSize: "cover"}}
            >
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-green opacity-10 backdrop-blur-md z-0" style={{ backdropFilter: "blur(5px)"}}></div>
                <h1
                    ref={headerRef}
                    className="
                        m-0 font-bold text-2xl text-gray-800 z-10
                        opacity-0 translate-y-8
                        transition-all duration-1000
                    "
                >
                    Food Research
                </h1>
                <div className="absolute bottom-1/3 flex justify-center w-3/4">
                    <div
                        className="
                            bg-white rounded-xl shadow-lg
                            px-6 py-4
                            w-full max-w-xl
                            flex flex-col items-center
                            z-20
                            absolute left-1/2
                            -translate-x-1/2
                            translate-y-1/2
                        "
                        style={{ top: '100%' }}
                    >
                        <input
                            type="text"
                            placeholder="Rechercher un aliment..."
                            className="w-full outline-none border-none bg-transparent text-gray-700 text-lg"
                        />
                        <p className="text-gray-600 text-base bg-opacity-80 rounded-lg px-4 py-2 shadow-none mt-2 text-center">
                            Découvrez la valeur nutritionnelle de vos aliments préférés&nbsp;! 🥗
                        </p>
                    </div>
                </div>
            </div>
            <a
                href="/sparql"
                className="
                    fixed bottom-6 right-6
                    bg-green-600 hover:bg-green-700
                    text-white font-bold py-3 px-6
                    rounded-full shadow-lg
                    transition-colors duration-200
                    z-50
                "
                title="Requetes SPARQL"
            >
                SPARQL
            </a>
        </div>
    );
}

export default FoodResearch;