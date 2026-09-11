import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <div>
        <footer class="footer">
                <div class="foot_container">
                    <div class="foot_row">
                        <div class="foot_links">
                            <h4>Informacion</h4>
                            <ul>
                                <li>Nosotros</li>
                                <li>Preguntas frecuentes</li>
                                <li>Politica de privacidad</li>
                            </ul>
                        </div>
    
                        <div class="foot_links">
                            <h4>Redes Sociales</h4>
                            <div class="social_networks">
                                <i class="fa-brands fa-square-facebook"></i>
                                <i class="fa-brands fa-square-whatsapp"></i>
                                <i class="fa-brands fa-square-instagram"></i>
                                <i class="fa-brands fa-square-x-twitter"></i>
                            </div>
                        </div>
                    </div>
    
                </div>
                
            </footer>
    </div>
  )
}

export default Footer