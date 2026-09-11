import { useAuth } from "../AuthContext/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    calle: "",
    colonia: "",
    numero: "",
    codigoPostal: "",
    tarjeta: "",
    caducidad: "",
    cvv: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones específicas
    if (name === "tarjeta") {
      if (/^\d*$/.test(value)) {
        setForm({ ...form, [name]: value.slice(0, 16) });
      }
    } else if (name === "cvv") {
      if (/^\d*$/.test(value)) {
        setForm({ ...form, [name]: value.slice(0, 3) });
      }
    } else if (name === "caducidad") {
      // Solo permite números y un solo "/"
      let formatted = value.replace(/[^\d]/g, "");
      if (formatted.length > 2) {
        formatted = formatted.slice(0, 2) + "/" + formatted.slice(2, 4);
      }
      setForm({ ...form, [name]: formatted.slice(0, 5) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/procesando");
  };

  if (!user) return null;

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Finalizar compra</h2>
      <p style={{ textAlign: "center" }}>Bienvenido, {user.email}</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h3>Datos personales</h3>
        <input type="text" name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required />

        <h3>Dirección</h3>
        <input type="text" name="calle" placeholder="Calle" value={form.calle} onChange={handleChange} required />
        <input type="text" name="colonia" placeholder="Colonia" value={form.colonia} onChange={handleChange} required />
        <input type="text" name="numero" placeholder="Número exterior" value={form.numero} onChange={handleChange} required />
        <input type="text" name="codigoPostal" placeholder="Código postal" value={form.codigoPostal} onChange={handleChange} required />

        <h3>Datos de la tarjeta</h3>
        <input type="text" name="tarjeta" placeholder="Número de tarjeta" value={form.tarjeta} onChange={handleChange} required />
        <input type="text" name="caducidad" placeholder="MM/AA" value={form.caducidad} onChange={handleChange} required />
        <input type="text" name="cvv" placeholder="CVV" value={form.cvv} onChange={handleChange} required />

        <button type="submit" style={{
          padding: "0.7rem",
          backgroundColor: "#333",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Finalizar compra
        </button>
      </form>
    </div>
  );
};

export default Checkout;