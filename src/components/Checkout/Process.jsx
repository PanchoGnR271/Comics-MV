import { useEffect } from "react";

const Procesing = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center"
    }}>
      <h2>Procesando tu pago...</h2>
      <p>Por favor, espera un momento</p>
      <img
        src="https://media.tenor.com/-l_9sVGD6BAAAAAi/callie101-lol.gif"
        alt="Procesando"
        style={{ maxWidth: "300px", marginTop: "20px" }}
      />
    </div>
  );
};

export default Procesing;