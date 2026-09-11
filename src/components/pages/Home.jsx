import React from 'react'
import abm from "../../assets/principal/1.jpg"
import ddd from "../../assets/principal/2.jpg"
import usm from "../../assets/principal/3.jpg"
import cmx from "../../assets/principal/4.jpg"
import "./Home.css"

const home = () => {
  return (
    <div className='main'>
      <section class="carousel" className='carousel'>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <a><img src={usm} class="d-block w-100" alt="0"/></a>
                    <div class="carousel-caption top-15 mt-4">
                      <h5>Ultimate Spider-man</h5>
                      <p>Un inicio diferente de nuestro trepa-muros favorito</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <a><img src={abm} class="d-block w-100" alt="1"/></a>
                    <div class="carousel-caption top-15 mt-4">
                      <h5>Absolute Batman</h5>
                      <p>El comic más vendido de 2024</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <a><img src={ddd} class="d-block w-100" alt="2"/></a>
                    <div class="carousel-caption top-15 mt-4">
                      <h5>Dan Da Dan</h5>
                      <p>El manga del momento!</p>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </section>
            <h2 className='intro'>¡Bienvenido a Comics MV, tu destino definitivo para cómics y manga!</h2>             
            <section class="home-description">
              <img src={cmx}/>
              <article classname="text">
                <p>Sumérgete en un mundo de historias épicas, personajes inolvidables y arte impresionante. Aqui encontrarás una amplia selección de títulos, desde los cómics más clásicos hasta los mangas más actuales y populares.</p>
                <p>Ya seas un veterano del cómic, un fanático del manga o un curioso explorador, en Comics MV hay algo para ti. ¡Descubre, colecciona y comparte la pasión por las mejores historias!</p>
                <p>¡Visítanos y dale vida a tu biblioteca geek hoy mismo!</p>
                <p>¿Qué ofrecemos?</p>
                <li>Cómics de superhéroes: ¡Vive las aventuras de tus héroes favoritos de Marvel, DC y más!</li>
                <li>Manga japonés: Desde shōnen hasta seinen, con series icónicas y nuevas gemas.</li>
                <li>Ediciones especiales y coleccionables: Porque cada fan merece algo único.</li>
              </article>
            </section>
    </div>
  )
}

export default home