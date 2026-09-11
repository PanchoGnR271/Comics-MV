import { useEffect, useState } from "react"
import "./ComicList.css"
import { useNavigate } from "react-router-dom";
import winter from "../../assets/principal/6.png"

const ComicList = ({}) => {

    const [comics, setComics] = useState([]);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState("Relevancia");
    const [filters, setFilters] = useState({genre: [], editorial:[]})
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchComics = async () =>{
            try {
                const response = await fetch ("https://api-sp9c.vercel.app/comics");
                if(!response.ok){
                    throw new Error("Error al cargar los productos");
                }
                const data = await response.json();
                setComics(data)

            } catch (err) {
                setError(err.message)
            }
        }
        fetchComics();
    }, []);

    const toggleFilters = (tipoFilter, value) =>{
        setFilters((prev) => ({
            ...prev,
            [tipoFilter]: prev[tipoFilter].includes(value)
            ? prev[tipoFilter].filter((item) => item !== value)
            : [...prev[tipoFilter],value],
        }))
    }

    const comicsFiltrados = comics.filter((comics) =>{
        const matchGenre = 
        filters.genre.length === 0 || comics.genre.some(g => filters.genre.includes(g));
        const matchEditorial = 
        filters.editorial.length === 0 || filters.editorial.includes(comics.editorial)
        
        return matchGenre && matchEditorial;
    })


    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }
    const comicsOrdenados = [...comicsFiltrados].sort((a,b)=>{
        if(order === "Precio: Menor a Mayor"){
            return a.price - b.price
        } if (order === "Precio: Mayor a Menor"){
            return b.price - a.price
        }
        return 0;
    })

    const handleImageClick = (id) =>{
        navigate(`/comics/${id}`);
    }

  return (
    <section className="main-content">
        <aside className="filters">
            <h2>Filtros</h2>
            <div className="filters-category">
                <div className="filter-category">
                    <h3>Género</h3>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Acción")}/>
                        <span>Acción</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Biografía")}/>
                        <span>Biografía</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Ciencia Ficción")}/>
                        <span>Ciencia Ficción</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Comedia Negra")}/>
                        <span>Comedia Negra</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Crossover")}/>
                        <span>Crossover</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Drama")}/>
                        <span>Drama</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Drama Psicológico")}/>
                        <span>Drama Psicológico</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Drama Social")}/>
                        <span>Drama Social</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Drama Urbano")}/>
                        <span>Drama Urbano</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Fantasía")}/>
                        <span>Fantasía</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Metaficción")}/>
                        <span>Metaficción</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Misterio")}/>
                        <span>Misterio</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Noir")}/>
                        <span>Noir</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Reinvención")}/>
                        <span>Reinvención</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Superpoderes")}/>
                        <span>Superpoderes</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Terror")}/>
                        <span>Terror</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Terror Cósmico")}/>
                        <span>Terror Cósmico</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Thriller Corporativo")}/>
                        <span>Thriller Corporativo</span>
                    </label>
                </div>

                <div className="filter-category">
                    <h3>Editorial</h3>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("editorial","Marvel")}/>
                        <span>Marvel</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("editorial","DC")}/>
                        <span>DC</span>
                    </label>
                </div>
            </div>
        </aside>
        <main className="collections">
            <div className="options">
                <h2>C O M I C S</h2>
                <div className="sort-options">
                    <label>
                        Ordenar por:
                        <select onChange={handleOrderChange} value={order}>
                            <option>A-Z</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="comics">
                {error ? (
                    <p className="error-message">{error}</p>
                ): comicsFiltrados.length > 0 ?(
                    comicsOrdenados.map((comics) => (
                        <div className="comic-card" key={comics.id}>
                            <img src={comics.image} 
                            alt={comics.image}
                            className="comic-image"
                            onClick={() => handleImageClick(comics.id)}
                            />

                            <h3>{comics.name}</h3>
                            <p>${Number(comics.price).toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <>
                    <div className="uknown">
                    <p className="no-results">
                        No se porque tenemos este filtro, si no tenemos ese producto.
                    </p>
                    <br />
                    <img src={winter} className="Winter"/>
                    </div>
                    </>
                )}
            </div>

        </main>

    </section>
  )
}

export default ComicList