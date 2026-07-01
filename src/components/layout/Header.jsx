import { Link, NavLink } from 'react-router-dom';

import './Header.css';

function Header() {
  const getNavLinkClass = ({ isActive }) =>
    `nav-link main-nav__link ${
      isActive ? 'main-nav__link--active' : ''
    }`;

  return (
    <header className="main-header">
      <div
        className="main-header__brand-line"
        aria-hidden="true"
      />

      <nav
        className="navbar navbar-expand-lg main-nav"
        aria-label="Navegación principal"
      >
        <div className="container">
          <Link
            className="navbar-brand main-nav__brand"
            to="/"
            aria-label="Ir al inicio de Emanuel Pastelería"
          >
            <picture>
              <source
                media="(max-width: 420px)"
                srcSet="/images/brand/isotipo.png"
              />

              <img
                className="main-nav__logo"
                src="/images/brand/logo-horizontal.png"
                alt="Emanuel Pastelería"
              />
            </picture>
          </Link>

          <button
            className="navbar-toggler main-nav__toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavigation"
            aria-controls="mainNavigation"
            aria-expanded="false"
            aria-label="Abrir menú de navegación"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse main-nav__collapse"
            id="mainNavigation"
          >
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <NavLink
                  className={getNavLinkClass}
                  to="/"
                  end
                >
                  Inicio
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className={getNavLinkClass}
                  to="/catalogo"
                >
                  Catálogo
                </NavLink>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link main-nav__link"
                  href="/#como-funciona"
                >
                  Cómo funciona
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link main-nav__link"
                  href="/#nosotros"
                >
                  Nosotros
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link main-nav__link"
                  href="/#contacto"
                >
                  Contacto
                </a>
              </li>

              <li className="nav-item main-nav__cta-wrapper">
                <Link
                  className="main-nav__cta"
                  to="/pedido/configurar"
                >
                  <span
                    className="main-nav__cta-symbol"
                    aria-hidden="true"
                  >
                    ✦
                  </span>

                  <span>Configura tu pastel</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;