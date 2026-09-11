import { useParams } from "react-router-dom";
import "./DetailsManga.css";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import Description from '../../assets/description';

const DetailsManga = () => {
  const {id} = useParams()
  const [mangas, setMangas] = useState(null);
  const [error, setError] = useState(null); 
  
  const {addToCart} = useCart();
  const handleAddToCart = () => {
    if (mangas){
      addToCart ({
        id: mangas.id,
        image: mangas.image,
        name: mangas.name,
        price: mangas.price,
        quantity: 1,
        type: "manga"
      })
    }
  }

  useEffect (()=>{
        const fetchMangas = async () =>{
            try {
                const response = await fetch (`https://api-sp9c.vercel.app/mangas/${id}`);
                if(!response.ok){
                    throw new Error("Error al cargar los detalles del producto");
                }
                const data = await response.json();
                setMangas(data)

            } catch (err) {
                setError(err.message)
            }
        }

        fetchMangas();
    }, [id]);

    if (error){
      return <h2 className="error-message">{error}</h2>
    }

  return (
    <div className= "manga-details">
      {
        mangas ? (
          <>
          <img src={mangas.image} alt={mangas.name} className="image-small"/>
          <img src={mangas.image} alt={mangas.name} />
          <div className="manga-infos">
              <h1>{mangas.name}</h1>
              <p className="price">${Number(mangas.price).toFixed(2)}</p>
              <Description text={mangas.description} className="description"/>
              <button className="add-to-cart" onClick={handleAddToCart}>
                Añadir al Carrito
              </button>
              <p className="note">
                Producto respaldado al 100% por la Agencia General de Estudios Nacionales de Changos Inteligentes Administrativos.
                Por lo que no hay devolución al momento de hacer el pago.
              </p>
            </div>
          </>
        ) : (
          <>
          <div className="unknown">
          <p>Cargando el producto . . .</p>
          <br />
          <img src="https://media.tenor.com/-l_9sVGD6BAAAAAi/callie101-lol.gif" className="agencia" />            
          </div>
          </>
        )  
      }
    </div>
  )
}

export default DetailsManga