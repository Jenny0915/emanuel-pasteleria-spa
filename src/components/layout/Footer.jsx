import { Link } from 'react-router-dom';

import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="contacto">
      <div className="site-footer__pattern" aria-hidden="true" />

      <div className="site-footer__main">
        <div className="container">
          <div className="row g-4 g-lg-5">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="site-footer__brand">
                <Link
                  className="site-footer__logo-link"
                  to="/"
                  aria-label="Ir al inicio de Emanuel Pastelería"
                >
                  <img
                    className="site-footer__logo"
                    src="/images/brand/logo-vertical.png"
                    alt="Emanuel Pastelería"
                  />
                </Link>

                <p className="site-footer__description">
                  Pastelería saludable y personalizada, creada para acompañar
                  tus momentos especiales con opciones adaptadas a tus
                  necesidades.
                </p>

                <div
                  className="site-footer__socials"
                  aria-label="Redes sociales de Emanuel Pastelería"
                >
                  <a
                    className="site-footer__social-link"
                    href="https://www.instagram.com/emanuel.pasteleria"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram de Emanuel Pastelería"
                  >
                    IG
                  </a>

                  <a
                    className="site-footer__social-link"
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook de Emanuel Pastelería"
                  >
                    FB
                  </a>

                  <a
                    className="site-footer__social-link"
                    href="https://www.tiktok.com/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="TikTok de Emanuel Pastelería"
                  >
                    TK
                  </a>

                  <a
                    className="site-footer__social-link"
                    href="https://wa.me/573102564740"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp de Emanuel Pastelería"
                  >
                    WA
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h2 className="site-footer__title">Navegación</h2>

              <ul className="site-footer__links">
                <li>
                  <Link to="/">Inicio</Link>
                </li>

                <li>
                  <Link to="/catalogo">Catálogo</Link>
                </li>

                <li>
                  <a href="/#como-funciona">Cómo funciona</a>
                </li>

                <li>
                  <a href="/#nosotros">Nosotros</a>
                </li>

                <li>
                  <a href="/#contacto">Contacto</a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-md-3 col-lg-3">
              <h2 className="site-footer__title">Ayuda</h2>

              <ul className="site-footer__links">
                <li>
                  <a href="/#preguntas-frecuentes">
                    Preguntas frecuentes
                  </a>
                </li>

                <li>
                  <a href="/#politica-envios">
                    Política de envíos
                  </a>
                </li>

                <li>
                  <a href="/#politica-reembolsos">
                    Política de reembolsos
                  </a>
                </li>

                <li>
                  <a href="/#terminos-condiciones">
                    Términos y condiciones
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-12 col-lg-4">
              <div className="site-footer__contact-card">
                <div className="site-footer__contact-heading">
                  <div>
                    <span className="site-footer__eyebrow">
                      Estamos para ayudarte
                    </span>

                    <h2 className="site-footer__contact-title">
                      Contáctanos
                    </h2>
                  </div>

                  <img
                    className="site-footer__contact-isotype"
                    src="/images/brand/isotipo.png"
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <address className="site-footer__contact">
                  <div className="site-footer__contact-item">
                    <span
                      className="site-footer__contact-dot site-footer__contact-dot--green"
                      aria-hidden="true"
                    />

                    <span>Madrid, Cundinamarca, Colombia</span>
                  </div>

                  <div className="site-footer__contact-item">
                    <span
                      className="site-footer__contact-dot site-footer__contact-dot--blue"
                      aria-hidden="true"
                    />

                    <a href="tel:+573102564740">
                      +57 310 256 4740
                    </a>
                  </div>

                  <div className="site-footer__contact-item">
                    <span
                      className="site-footer__contact-dot site-footer__contact-dot--yellow"
                      aria-hidden="true"
                    />

                    <a href="mailto:hola@emanuelpasteleria.com">
                      hola@emanuelpasteleria.com
                    </a>
                  </div>

                  <div className="site-footer__contact-item">
                    <span
                      className="site-footer__contact-dot site-footer__contact-dot--green"
                      aria-hidden="true"
                    />

                    <span>
                      Lunes a sábado: 9:00 a. m. – 7:00 p. m.
                    </span>
                  </div>
                </address>

                <Link
                  className="site-footer__cta"
                  to="/pedido/configurar"
                >
                  <span>Configura tu pastel</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <div className="site-footer__bottom-content">
            <p>
              © {currentYear} Emanuel Pastelería. Todos los derechos
              reservados.
            </p>

            <p>
              SPA desarrollada como contribución del Trabajo Fin de Estudios.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;