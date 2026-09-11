import { useSearch } from "../SearchContext/SearchContext";
import { useEffect, useState } from "react";
import Description from '../../assets/description';
import { Link } from "react-router-dom";
import "./search.css";

const Buscar = () => {
  const { searchTerm } = useSearch();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [mangasRes, comicsRes] = await Promise.all([
        fetch("https://api-sp9c.vercel.app/mangas"),
        fetch("https://api-sp9c.vercel.app/comics")
      ]);

      const normalizeText = (text) => {
        return text
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      };

      const mangas = await mangasRes.json();
      const comics = await comicsRes.json();

      // Etiqueta tipo para navegar
      const taggedMangas = mangas.map(m => ({ ...m, type: "mangas" }));
      const taggedComics = comics.map(c => ({ ...c, type: "comics" }));

      const filtered = [...taggedMangas, ...taggedComics].filter((item) => {
        const name = normalizeText(item.name);
        const desc = normalizeText(item.description || "");
        const term = normalizeText(searchTerm);

        return name.includes(term) || desc.includes(term);
      });

      setResults(filtered);
    };

    fetchAll();
  }, [searchTerm]);

  return (
    <div className="search-results-container">
      <h2>Resultados para: <span>{searchTerm}</span></h2>
      {results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        results.map((item) => (
          <Link
            to={`/${item.type}/${item.id}`}
            key={item.id}
            className="search-result-item"
          >
            <img src={item.image} alt={item.name} className="result-image" />
            <div className="result-info">
              <h3 className="result-name">{item.name}</h3>
              <p className="result-price">${Number(item.price).toFixed(2)}</p>
              <Description text={item.description} className="result-description"/>
            </div>
            <hr className="result-divider" />
          </Link>
        ))
      )}
    </div>
  );
};

export default Buscar;