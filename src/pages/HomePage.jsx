import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './HomePage.css';

const heroSlides = [
  {
    id: 1,
    image: '/images/home/cake-hero-1.png',
    alt: 'Pastel saludable decorado con frutos rojos',
    category: 'Bajo en azúcar',
    name: 'Frutos rojos',
    description: 'Suave, fresco y naturalmente delicioso.',
  },
  {
    id: 2,
    image: '/images/home/cake-hero-2.png',
    alt: 'Cheesecake saludable decorado con limón',
    category: 'Sin lactosa',
    name: 'Cheesecake de limón',
    description: 'Una opción cremosa con un toque cítrico.',
  },
  {
    id: 3,
    image: '/images/home/cake-hero-3.png',
    alt: 'Pastel personalizado para una celebración especial',
    category: 'Personalizable',
    name: 'Celebración especial',
    description: 'Diseñado para convertir cada momento en un recuerdo.',
  },
];

const benefits = [
  {
    id: 1,
    title: 'Ingredientes de calidad',
    description:
      'Seleccionamos ingredientes naturales y de origen responsable.',
    icon: '🌿',
    color: 'green',
  },
  {
    id: 2,
    title: 'Recetas saludables',
    description:
      'Opciones bajas en azúcar y adaptadas a tus necesidades.',
    icon: '🛡️',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Pedido guiado',
    description:
      'Te acompañamos paso a paso para crear tu pastel ideal.',
    icon: '🧁',
    color: 'yellow',
  },
  {
    id: 4,
    title: 'Entrega cuidada',
    description:
      'Seguimiento claro desde la configuración hasta la entrega.',
    icon: '📦',
    color: 'blue',
  },
];

function HomePage() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const [quickOrder, setQuickOrder] = useState({
    restriction: '',
    size: '',
    sugarLevel: '',
  });

  useEffect(() => {
    if (isCarouselPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCurrentSlide((previousSlide) =>
        previousSlide === heroSlides.length - 1
          ? 0
          : previousSlide + 1,
      );
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [isCarouselPaused]);

  const showPreviousSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0
        ? heroSlides.length - 1
        : previousSlide - 1,
    );
  };

  const showNextSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === heroSlides.length - 1
        ? 0
        : previousSlide + 1,
    );
  };

  const handleQuickOrderChange = (event) => {
    const { name, value } = event.target;

    setQuickOrder((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }));
  };

  const handleQuickOrderSubmit = (event) => {
    event.preventDefault();

    /*
     * Más adelante estos datos se conectarán con OrderContext
     * para abrir el configurador con la selección precargada.
     */
    navigate('/pedido/configurar');
  };

  const activeSlide = heroSlides[currentSlide];

  return (
    <div className="home-page">
      <section
        className="home-hero"
        aria-labelledby="home-hero-title"
      >
        <div
          className="home-hero__shape home-hero__shape--blue"
          aria-hidden="true"
        />

        <div
          className="home-hero__shape home-hero__shape--green"
          aria-hidden="true"
        />

        <div className="container home-hero__layout">
          <div className="home-hero__content">
            <span className="home-hero__eyebrow">
              Pastelería saludable y personalizada
            </span>

            <h1
              className="home-hero__title"
              id="home-hero-title"
            >
              Pasteles que se adaptan
              <span> a ti</span>
            </h1>

            <p className="home-hero__description">
              Configura tu pedido de forma clara y sencilla según tus
              preferencias y restricciones alimentarias. Elige entre
              opciones sin lactosa, sin gluten, sin azúcar o endulzadas
              con stevia.
            </p>

            <div
              className="home-hero__restrictions"
              aria-label="Opciones alimentarias disponibles"
            >
              <span className="restriction-badge restriction-badge--green">
                Sin lactosa
              </span>

              <span className="restriction-badge restriction-badge--yellow">
                Sin gluten
              </span>

              <span className="restriction-badge restriction-badge--blue">
                Sin azúcar
              </span>

              <span className="restriction-badge restriction-badge--green">
                Con stevia
              </span>
            </div>

            <div className="home-hero__actions">
              <Link
                className="home-button home-button--primary"
                to="/pedido/configurar"
              >
                Configura tu pastel
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                className="home-button home-button--secondary"
                to="/catalogo"
              >
                Explorar catálogo
              </Link>
            </div>

            <div className="home-hero__trust">
              <div className="home-hero__trust-item">
                <strong>100 %</strong>
                <span>Personalizable</span>
              </div>

              <div className="home-hero__trust-divider" />

              <div className="home-hero__trust-item">
                <strong>4</strong>
                <span>Opciones alimentarias</span>
              </div>

              <div className="home-hero__trust-divider" />

              <div className="home-hero__trust-item">
                <strong>6</strong>
                <span>Pasos guiados</span>
              </div>
            </div>
          </div>

          <div
            className="home-carousel"
            aria-label="Pasteles destacados"
            aria-roledescription="carrusel"
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onFocus={() => setIsCarouselPaused(true)}
            onBlur={() => setIsCarouselPaused(false)}
          >
            <div className="home-carousel__visual">
              <div
                className="home-carousel__blob home-carousel__blob--blue"
                aria-hidden="true"
              />

              <div
                className="home-carousel__blob home-carousel__blob--yellow"
                aria-hidden="true"
              />

              <div
                className="home-carousel__blob home-carousel__blob--green"
                aria-hidden="true"
              />

              {heroSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`home-carousel__slide ${
                    index === currentSlide
                      ? 'home-carousel__slide--active'
                      : ''
                  }`}
                  aria-hidden={index !== currentSlide}
                >
                  <img
                    className="home-carousel__image"
                    src={slide.image}
                    alt={index === currentSlide ? slide.alt : ''}
                  />
                </div>
              ))}

              <button
                className="home-carousel__arrow home-carousel__arrow--previous"
                type="button"
                onClick={showPreviousSlide}
                aria-label="Mostrar pastel anterior"
              >
                ‹
              </button>

              <button
                className="home-carousel__arrow home-carousel__arrow--next"
                type="button"
                onClick={showNextSlide}
                aria-label="Mostrar siguiente pastel"
              >
                ›
              </button>

              <div className="home-carousel__counter">
                <span>
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>

                <span aria-hidden="true">/</span>

                <span>
                  {String(heroSlides.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div
              className="home-carousel__caption"
              aria-live="polite"
            >
              <div>
                <span className="home-carousel__category">
                  {activeSlide.category}
                </span>

                <h2>{activeSlide.name}</h2>

                <p>{activeSlide.description}</p>
              </div>

              <div
                className="home-carousel__indicators"
                aria-label="Seleccionar pastel"
              >
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    className={`home-carousel__indicator ${
                      index === currentSlide
                        ? 'home-carousel__indicator--active'
                        : ''
                    }`}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Mostrar ${slide.name}`}
                    aria-current={
                      index === currentSlide ? 'true' : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="quick-order-section"
        aria-labelledby="quick-order-title"
      >
        <div className="container">
          <form
            className="quick-order"
            onSubmit={handleQuickOrderSubmit}
          >
            <div className="quick-order__intro">
              <div
                className="quick-order__icon"
                aria-hidden="true"
              >
                🧁
              </div>

              <div>
                <span className="quick-order__eyebrow">
                  Empieza aquí
                </span>

                <h2 id="quick-order-title">
                  Configura las bases de tu pastel
                </h2>

                <p>
                  Selecciona tus preferencias iniciales y continúa con
                  el pedido guiado.
                </p>
              </div>
            </div>

            <div className="quick-order__fields">
              <div className="quick-order__field">
                <label htmlFor="quickRestriction">
                  Restricción
                </label>

                <select
                  id="quickRestriction"
                  name="restriction"
                  value={quickOrder.restriction}
                  onChange={handleQuickOrderChange}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="lactose-free">
                    Sin lactosa
                  </option>

                  <option value="gluten-free">
                    Sin gluten
                  </option>

                  <option value="sugar-free">
                    Sin azúcar
                  </option>

                  <option value="stevia">
                    Con stevia
                  </option>
                </select>
              </div>

              <div className="quick-order__field">
                <label htmlFor="quickSize">
                  Tamaño
                </label>

                <select
                  id="quickSize"
                  name="size"
                  value={quickOrder.size}
                  onChange={handleQuickOrderChange}
                >
                  <option value="">
                    Selecciona porciones
                  </option>

                  <option value="8">
                    8 porciones
                  </option>

                  <option value="12">
                    12 porciones
                  </option>

                  <option value="20">
                    20 porciones
                  </option>

                  <option value="30">
                    30 porciones
                  </option>
                </select>
              </div>

              <div className="quick-order__field">
                <label htmlFor="quickSugarLevel">
                  Nivel de azúcar
                </label>

                <select
                  id="quickSugarLevel"
                  name="sugarLevel"
                  value={quickOrder.sugarLevel}
                  onChange={handleQuickOrderChange}
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  <option value="low-sugar">
                    Bajo en azúcar
                  </option>

                  <option value="sugar-free">
                    Sin azúcar
                  </option>

                  <option value="stevia">
                    Endulzado con stevia
                  </option>
                </select>
              </div>
            </div>

            <div className="quick-order__action">
              <span>Pedido desde</span>
              <strong>$26.000</strong>

              <button
                className="quick-order__button"
                type="submit"
              >
                Continuar
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <section
        className="home-benefits"
        aria-label="Beneficios de Emanuel Pastelería"
      >
        <div className="container">
          <div className="home-benefits__grid">
            {benefits.map((benefit) => (
              <article
                key={benefit.id}
                className={`benefit-card benefit-card--${benefit.color}`}
              >
                <span
                  className="benefit-card__icon"
                  aria-hidden="true"
                >
                  {benefit.icon}
                </span>

                <div>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;