import { useParams } from "react-router-dom";
import "./DetailsComic.css";
import { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import Description from '../../assets/description';

const DetailsComic = () => {
  const {id} = useParams()
  const [comics, setComics] = useState(null);
  const [error, setError] = useState(null); 
  
  const {addToCart} = useCart();
  const handleAddToCart = () => {
    if (comics){
      addToCart ({
        id: comics.id,
        image: comics.image,
        name: comics.name,
        price: comics.price,
        quantity: 1,
        type: "comic"
      })
    }
  }

  useEffect (()=>{
        const fetchComics = async () =>{
            try {
                const response = await fetch (`https://api-sp9c.vercel.app/comics/${id}`);
                if(!response.ok){
                    throw new Error("Error al cargar los detalles del producto");
                }
                const data = await response.json();
                setComics(data)

            } catch (err) {
                setError(err.message)
            }
        }

        fetchComics();
    }, [id]);

    if (error){
      return <h2 className="error-message">{error}</h2>
    }

  return (
    <div className= "comic-details">
      {
        comics ? (
          <>
          <img src={comics.image} alt={comics.name} className="image-small"/>
          <img src={comics.image} alt={comics.name} />
          <div className="comic-infos">
              <h1>{comics.name}</h1>
              <p className="price">${Number(comics.price).toFixed(2)}</p>
              <Description text={comics.description} className="description"/>
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

export default DetailsComic