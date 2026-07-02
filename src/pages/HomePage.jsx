import { useEffect, useMemo, useState } from 'react';
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
    description:
      'Diseñado para convertir cada momento en un recuerdo.',
  },
];

const benefits = [
  {
    id: 1,
    title: 'Ingredientes de calidad',
    description:
      'Seleccionamos ingredientes naturales y de origen responsable para cuidar cada preparación.',
    icon: '🌿',
    color: 'green',
  },
  {
    id: 2,
    title: 'Recetas saludables',
    description:
      'Creamos opciones bajas en azúcar y adaptadas a diferentes necesidades alimentarias.',
    icon: '🛡️',
    color: 'blue',
  },
  {
    id: 3,
    title: 'Pedido guiado',
    description:
      'Te acompañamos paso a paso para configurar un pastel realmente pensado para ti.',
    icon: '🧁',
    color: 'yellow',
  },
  {
    id: 4,
    title: 'Entrega cuidada',
    description:
      'Realizamos seguimiento desde la configuración del pedido hasta el momento de la entrega.',
    icon: '📦',
    color: 'blue',
  },
];

const initialQuickOrder = {
  restriction: '',
  size: '',
  sugarLevel: '',
};

const fieldMessages = {
  restriction:
    'Selecciona una restricción o preferencia alimentaria.',
  size: 'Selecciona el número aproximado de porciones.',
  sugarLevel: 'Selecciona el nivel de azúcar que prefieres.',
};

function HomePage() {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] =
    useState(false);

  const [quickOrder, setQuickOrder] =
    useState(initialQuickOrder);

  const [touchedFields, setTouchedFields] = useState({});
  const [submitAttempted, setSubmitAttempted] =
    useState(false);

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

  const formErrors = useMemo(() => {
    const errors = {};

    Object.entries(quickOrder).forEach(
      ([fieldName, fieldValue]) => {
        if (!fieldValue) {
          errors[fieldName] = fieldMessages[fieldName];
        }
      },
    );

    return errors;
  }, [quickOrder]);

  const completedFields =
    Object.values(quickOrder).filter(Boolean).length;

  const completionPercentage = Math.round(
    (completedFields /
      Object.keys(initialQuickOrder).length) *
      100,
  );

  const hasFormErrors =
    Object.keys(formErrors).length > 0;

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

    setTouchedFields((previousFields) => ({
      ...previousFields,
      [name]: true,
    }));
  };

  const handleQuickOrderBlur = (event) => {
    const { name } = event.target;

    setTouchedFields((previousFields) => ({
      ...previousFields,
      [name]: true,
    }));
  };

  const shouldShowFieldError = (fieldName) =>
    Boolean(
      formErrors[fieldName] &&
        (touchedFields[fieldName] || submitAttempted),
    );

  const handleQuickOrderSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);

    if (hasFormErrors) {
      const firstInvalidField =
        Object.keys(formErrors)[0];

      window.requestAnimationFrame(() => {
        document
          .querySelector(
            `[name="${firstInvalidField}"]`,
          )
          ?.focus();
      });

      return;
    }

    navigate('/pedido/configurar', {
      state: {
        quickOrder,
        source: 'home-quick-order',
      },
    });
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
              Configura tu pedido de forma clara y sencilla
              según tus preferencias y restricciones
              alimentarias. Elige entre opciones sin lactosa,
              sin gluten, sin azúcar o endulzadas con stevia.
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
            onMouseEnter={() =>
              setIsCarouselPaused(true)
            }
            onMouseLeave={() =>
              setIsCarouselPaused(false)
            }
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
                    alt={
                      index === currentSlide
                        ? slide.alt
                        : ''
                    }
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
                  {String(currentSlide + 1).padStart(
                    2,
                    '0',
                  )}
                </span>

                <span aria-hidden="true">/</span>

                <span>
                  {String(heroSlides.length).padStart(
                    2,
                    '0',
                  )}
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
                    onClick={() =>
                      setCurrentSlide(index)
                    }
                    aria-label={`Mostrar ${slide.name}`}
                    aria-current={
                      index === currentSlide
                        ? 'true'
                        : undefined
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
            noValidate
          >
            <div
              className="quick-order__brand-line"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div className="quick-order__header">
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
                    Elige estas tres preferencias iniciales.
                    Podrás completar y modificar los demás
                    detalles en el configurador.
                  </p>
                </div>
              </div>

              <div
                className="quick-order__progress"
                aria-label={`${completionPercentage}% del formulario inicial completado`}
              >
                <div className="quick-order__progress-copy">
                  <span>Configuración inicial</span>

                  <strong>
                    {completedFields} de 3
                  </strong>
                </div>

                <div
                  className="quick-order__progress-track"
                  aria-hidden="true"
                >
                  <span
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="quick-order__body">
              <div className="quick-order__fields">
                <div
                  className={`quick-order__field ${
                    quickOrder.restriction
                      ? 'quick-order__field--completed'
                      : ''
                  } ${
                    shouldShowFieldError(
                      'restriction',
                    )
                      ? 'quick-order__field--invalid'
                      : ''
                  }`}
                >
                  <div className="quick-order__field-heading">
                    <span className="quick-order__field-number">
                      01
                    </span>

                    <div>
                      <label htmlFor="quickRestriction">
                        Restricción principal
                      </label>

                      <span className="quick-order__field-help">
                        Cuéntanos qué debemos tener en
                        cuenta.
                      </span>
                    </div>

                    {quickOrder.restriction && (
                      <span
                        className="quick-order__field-check"
                        aria-label="Campo completado"
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <select
                    id="quickRestriction"
                    name="restriction"
                    value={quickOrder.restriction}
                    onChange={handleQuickOrderChange}
                    onBlur={handleQuickOrderBlur}
                    aria-invalid={
                      shouldShowFieldError(
                        'restriction',
                      )
                        ? 'true'
                        : 'false'
                    }
                    aria-describedby={
                      shouldShowFieldError(
                        'restriction',
                      )
                        ? 'quickRestrictionError'
                        : undefined
                    }
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

                  {shouldShowFieldError(
                    'restriction',
                  ) && (
                    <p
                      className="quick-order__field-error"
                      id="quickRestrictionError"
                    >
                      {formErrors.restriction}
                    </p>
                  )}
                </div>

                <div
                  className={`quick-order__field ${
                    quickOrder.size
                      ? 'quick-order__field--completed'
                      : ''
                  } ${
                    shouldShowFieldError('size')
                      ? 'quick-order__field--invalid'
                      : ''
                  }`}
                >
                  <div className="quick-order__field-heading">
                    <span className="quick-order__field-number">
                      02
                    </span>

                    <div>
                      <label htmlFor="quickSize">
                        Tamaño
                      </label>

                      <span className="quick-order__field-help">
                        Indica para cuántas personas lo
                        necesitas.
                      </span>
                    </div>

                    {quickOrder.size && (
                      <span
                        className="quick-order__field-check"
                        aria-label="Campo completado"
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <select
                    id="quickSize"
                    name="size"
                    value={quickOrder.size}
                    onChange={handleQuickOrderChange}
                    onBlur={handleQuickOrderBlur}
                    aria-invalid={
                      shouldShowFieldError('size')
                        ? 'true'
                        : 'false'
                    }
                    aria-describedby={
                      shouldShowFieldError('size')
                        ? 'quickSizeError'
                        : undefined
                    }
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

                  {shouldShowFieldError('size') && (
                    <p
                      className="quick-order__field-error"
                      id="quickSizeError"
                    >
                      {formErrors.size}
                    </p>
                  )}
                </div>

                <div
                  className={`quick-order__field ${
                    quickOrder.sugarLevel
                      ? 'quick-order__field--completed'
                      : ''
                  } ${
                    shouldShowFieldError(
                      'sugarLevel',
                    )
                      ? 'quick-order__field--invalid'
                      : ''
                  }`}
                >
                  <div className="quick-order__field-heading">
                    <span className="quick-order__field-number">
                      03
                    </span>

                    <div>
                      <label htmlFor="quickSugarLevel">
                        Nivel de azúcar
                      </label>

                      <span className="quick-order__field-help">
                        Elige la alternativa que prefieras.
                      </span>
                    </div>

                    {quickOrder.sugarLevel && (
                      <span
                        className="quick-order__field-check"
                        aria-label="Campo completado"
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  <select
                    id="quickSugarLevel"
                    name="sugarLevel"
                    value={quickOrder.sugarLevel}
                    onChange={handleQuickOrderChange}
                    onBlur={handleQuickOrderBlur}
                    aria-invalid={
                      shouldShowFieldError(
                        'sugarLevel',
                      )
                        ? 'true'
                        : 'false'
                    }
                    aria-describedby={
                      shouldShowFieldError(
                        'sugarLevel',
                      )
                        ? 'quickSugarLevelError'
                        : undefined
                    }
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

                  {shouldShowFieldError(
                    'sugarLevel',
                  ) && (
                    <p
                      className="quick-order__field-error"
                      id="quickSugarLevelError"
                    >
                      {formErrors.sugarLevel}
                    </p>
                  )}
                </div>
              </div>

              <div className="quick-order__action">
                <div className="quick-order__price">
                  <span>Pedido desde</span>

                  <strong>$26.000</strong>

                  <small>
                    El valor final dependerá de tu
                    configuración.
                  </small>
                </div>

                <button
                  className="quick-order__button"
                  type="submit"
                >
                  Continuar pedido
                  <span aria-hidden="true">→</span>
                </button>

                <span className="quick-order__security">
                  Tus elecciones podrán modificarse
                  después.
                </span>
              </div>
            </div>

            {submitAttempted && hasFormErrors && (
              <div
                className="quick-order__form-message"
                role="alert"
              >
                <span aria-hidden="true">!</span>

                <p>
                  Completa las tres selecciones para
                  continuar con tu pedido.
                </p>
              </div>
            )}
          </form>
        </div>
      </section>

      <section
        className="home-benefits"
        aria-labelledby="home-benefits-title"
      >
        <div className="container">
          <div className="home-benefits__heading">
            <span className="home-section-eyebrow">
              Nuestra forma de trabajar
            </span>

            <h2 id="home-benefits-title">
              Pensamos en cada detalle de tu pedido
            </h2>

            <p>
              Combinamos ingredientes seleccionados,
              personalización y acompañamiento para crear
              una experiencia clara desde el primer paso.
            </p>
          </div>

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

                <h3>{benefit.title}</h3>

                <p>{benefit.description}</p>

                <span
                  className="benefit-card__line"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="healthy-cravings"
        aria-labelledby="healthy-cravings-title"
      >
        <div className="container">
          <div className="healthy-cravings__panel">
            <div className="healthy-cravings__visual">
              <div
                className="healthy-cravings__decoration healthy-cravings__decoration--top"
                aria-hidden="true"
              />

              <div
                className="healthy-cravings__decoration healthy-cravings__decoration--bottom"
                aria-hidden="true"
              />

              <img
                className="healthy-cravings__image"
                src="/images/home/cake-hero-1.png"
                alt="Pastel saludable personalizado de Emanuel Pastelería"
              />

              <div className="healthy-cravings__image-label">
                <span aria-hidden="true">♡</span>

                <div>
                  <strong>Hecho para ti</strong>
                  <small>
                    Personalizado según tus preferencias
                  </small>
                </div>
              </div>
            </div>

            <div className="healthy-cravings__content">
              <span className="home-section-eyebrow">
                Antojos saludables
              </span>

              <h2 id="healthy-cravings-title">
                Disfruta lo dulce
                <span> sin dejar de cuidarte</span>
              </h2>

              <p className="healthy-cravings__lead">
                En Emanuel Pastelería creemos que celebrar
                y cuidarte pueden ir de la mano. Por eso
                creamos pasteles personalizados que se
                adaptan a tus gustos, preferencias y
                necesidades alimentarias.
              </p>

              <div className="healthy-cravings__actions">
                <Link
                  className="home-button home-button--primary"
                  to="/pedido/configurar"
                >
                  Crear mi pastel
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  className="healthy-cravings__link"
                  to="/catalogo"
                >
                  Ver catálogo
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
