import { useEffect, useState } from "react"
import "./MangaList.css"
import { useNavigate } from "react-router-dom";
import winter from "../../assets/principal/6.png"

const MangaList = ({}) => {

    const [mangas, setMangas] = useState([]);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState("Relevancia");
    const [filters, setFilters] = useState({genre: [], status:[]})
    const navigate = useNavigate()

    useEffect(() =>{
        const fetchMangas = async () =>{
            try {
                const response = await fetch ("https://api-sp9c.vercel.app/mangas");
                if(!response.ok){
                    throw new Error("Error al cargar los productos");
                }
                const data = await response.json();
                setMangas(data)

            } catch (err) {
                setError(err.message)
            }
        }
        fetchMangas();
    }, []);

    const toggleFilters = (tipoFilter, value) =>{
        setFilters((prev) => ({
            ...prev,
            [tipoFilter]: prev[tipoFilter].includes(value)
            ? prev[tipoFilter].filter((item) => item !== value)
            : [...prev[tipoFilter],value],
        }))
    }

    const mangasFiltrados = mangas.filter((mangas) =>{
        const matchGenre = 
        filters.genre.length === 0 || mangas.genre.some(g => filters.genre.includes(g));
        const matchStatus = 
        filters.status.length === 0 || filters.status.includes(mangas.status)
        
        return matchGenre && matchStatus;
    })


    const handleOrderChange = (e) => {
        setOrder(e.target.value)
    }
    const mangasOrdenados = [...mangasFiltrados].sort((a,b)=>{
        if(order === "Precio: Menor a Mayor"){
            return a.price - b.price
        } if (order === "Precio: Mayor a Menor"){
            return b.price - a.price
        }
        return 0;
    })

    const handleImageClick = (id) =>{
        navigate(`/mangas/${id}`);
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
                        <input type="checkbox" onChange={() => toggleFilters("genre","Artes Marciales")}/>
                        <span>Artes Marciales</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Aventura")}/>
                        <span>Aventura</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Ciencia Ficción")}/>
                        <span>Ciencia Ficción</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Comedia")}/>
                        <span>Comedia</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Deportes")}/>
                        <span>Deportes</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Drama")}/>
                        <span>Drama</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Fantasía")}/>
                        <span>Fantasía</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Magia")}/>
                        <span>Magia</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Música")}/>
                        <span>Música</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Post-apocalíptico")}/>
                        <span>Post-apocalíptico</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Seinen")}/>
                        <span>Seinen</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Shonen")}/>
                        <span>Shonen</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Slice of Life")}/>
                        <span>Slice of Life</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Sobrenatural")}/>
                        <span>Sobrenatural</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("genre","Superpoderes")}/>
                        <span>Superpoderes</span>
                    </label>
                </div>

                <div className="filter-category">
                    <h3>Estado</h3>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("status","En Curso")}/>
                        <span>En Curso</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("status","Finalizado")}/>
                        <span>Finalizado</span>
                    </label>
                    <label>
                        <input type="checkbox" onChange={() => toggleFilters("status","Pausa Indefinida")}/>
                        <span>Pausa Indefinida</span>
                    </label>
                </div>
            </div>
        </aside>
        <main className="collections">
            <div className="options">
                <h2>M A N G A S</h2>
                <div className="sort-options">
                    <label>
                        Ordenar por:
                        <select onChange={handleOrderChange} value={order}>
                            <option>Relevancia</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </label>
                </div>
            </div>

            <div className="mangas">
                {error ? (
                    <p className="error-message">{error}</p>
                ): mangasFiltrados.length > 0 ?(
                    mangasOrdenados.map((mangas) => (
                        <div className="manga-card" key={mangas.id}>
                            <img src={mangas.image} 
                            alt={mangas.image}
                            className="manga-image"
                            onClick={() => handleImageClick(mangas.id)}
                            />

                            <h3>{mangas.name}</h3>
                            <p>${Number(mangas.price).toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <div className="uknown">
                    <p className="no-results">
                        No se porque tenemos este filtro, si no tenemos ese producto.
                    </p>
                    <br />
                    <img src={winter} className="Winter"/>
                    </div>
                )}
            </div>

        </main>

    </section>
  )
}

export default MangaList