import { Link } from 'react-router-dom';

import './CatalogPage.css';

const filters = [
  {
    id: 'popular',
    label: 'Más pedidos',
    className: 'catalog-filter catalog-filter--active',
  },
  {
    id: 'lactose-free',
    label: 'Sin lactosa',
    className: 'catalog-filter catalog-filter--green',
  },
  {
    id: 'gluten-free',
    label: 'Sin gluten',
    className: 'catalog-filter catalog-filter--yellow',
  },
  {
    id: 'sugar-free',
    label: 'Sin azúcar',
    className: 'catalog-filter catalog-filter--blue',
  },
  {
    id: 'stevia',
    label: 'Con stevia',
    className: 'catalog-filter catalog-filter--green',
  },
];

const products = [
  {
    id: 'pastel-3-leches',
    number: '01',
    name: 'Pastel de 3 Leches',
    description:
      'Suave pan esponjado bañado en tres leches y decorado con crema chantilly. Una receta clásica que sabe diferente cuando está hecha con amor.',
    image: '/images/home/cake-hero-1.png',
    alt: 'Porción de pastel de tres leches decorada con crema y una cereza',
    price: '$26.000',
    priceSuffix: '',
    featured: true,
    badge: 'Más pedido',
    tags: [
      { label: 'Sin gluten', color: 'yellow' },
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
    ],
  },
  {
    id: 'pastel-veteado',
    number: '02',
    name: 'Pastel Veteado',
    description:
      'La combinación perfecta de vainilla y chocolate en un pastel suave, húmedo y equilibrado.',
    image: '/images/home/cake-hero-2.png',
    alt: 'Pastel veteado de vainilla y chocolate',
    price: '$25.000',
    priceSuffix: '',
    featured: false,
    tags: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Sin azúcar', color: 'blue' },
      { label: 'Con stevia', color: 'green' },
    ],
  },
  {
    id: 'pastel-chocolate',
    number: '03',
    name: 'Pastel de Chocolate',
    description:
      'Intenso, húmedo y cubierto de ganache de chocolate belga. Para verdaderos amantes del chocolate.',
    image: '/images/home/cake-hero-3.png',
    alt: 'Pastel de chocolate cubierto con ganache',
    price: '$27.000',
    priceSuffix: '',
    featured: false,
    tags: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
    ],
  },
  {
    id: 'cupcakes-sencillos',
    number: '04',
    name: 'Cupcakes Sencillos',
    description:
      'Deliciosos y esponjosos, ideales para cualquier ocasión.',
    image: '/images/home/cake-hero-2.png',
    alt: 'Cupcakes sencillos decorados con crema y grageas',
    price: '$6.000',
    priceSuffix: 'c/u',
    featured: false,
    tags: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Sin azúcar', color: 'blue' },
      { label: 'Con stevia', color: 'green' },
    ],
  },
  {
    id: 'cupcakes-elaborados',
    number: '05',
    name: 'Cupcakes Especiales',
    description:
      'Diseños únicos y sabores irresistibles que enamoran.',
    image: '/images/home/cake-hero-3.png',
    alt: 'Cupcakes elaborados con decoraciones temáticas',
    price: '$7.500',
    priceSuffix: 'c/u',
    featured: false,
    tags: [
      { label: 'Personalizable', color: 'blue' },
      { label: 'Sin lactosa', color: 'green' },
    ],
  },
];

function ProductTags({ tags }) {
  return (
    <div
      className="catalog-product__tags"
      aria-label="Características del producto"
    >
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={`catalog-product__tag catalog-product__tag--${tag.color}`}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function ProductPrice({ price, suffix }) {
  return (
    <div className="catalog-product__price">
      <span>Desde</span>

      <strong>{price}</strong>

      {suffix && <small>{suffix}</small>}
    </div>
  );
}

function CatalogPage() {
  const featuredProduct = products.find((product) => product.featured);
  const secondaryProducts = products.filter(
    (product) => !product.featured,
  );

  return (
    <main className="catalog-page">
      <section
        className="catalog-hero"
        aria-labelledby="catalog-title"
      >
        <div className="catalog-hero__decoration" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="container">
          <span className="catalog-eyebrow">
            Catálogo destacado
          </span>

          <h1 id="catalog-title">
            Elige tu <span>antojo ideal</span>
          </h1>

          <p className="catalog-hero__description">
            Pasteles y cupcakes hechos con ingredientes naturales,
            opciones saludables y el toque casero que nos diferencia.
          </p>

          <div
            className="catalog-filters"
            aria-label="Categorías del catálogo"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={filter.className}
                type="button"
              >
                {filter.id === 'popular' && (
                  <span aria-hidden="true">✦</span>
                )}

                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section
        className="catalog-products"
        aria-label="Productos destacados"
      >
        <div className="container">
          <article className="catalog-featured">
            <div className="catalog-featured__media">
              <img
                src={featuredProduct.image}
                alt={featuredProduct.alt}
              />

              <div className="catalog-featured__badge">
                <span aria-hidden="true">⚡</span>
                <strong>{featuredProduct.badge}</strong>
              </div>
            </div>

            <div className="catalog-featured__content">
              <span className="catalog-product__number">
                {featuredProduct.number}
              </span>

              <h2>{featuredProduct.name}</h2>

              <p className="catalog-featured__favorite">
                <span aria-hidden="true">♥</span>
                El favorito de nuestros clientes
              </p>

              <p className="catalog-featured__description">
                {featuredProduct.description}
              </p>

              <ProductTags tags={featuredProduct.tags} />

              <ProductPrice
                price={featuredProduct.price}
                suffix={featuredProduct.priceSuffix}
              />

              <div className="catalog-featured__actions">
                <Link
                  className="catalog-button catalog-button--primary"
                  to={`/catalogo/${featuredProduct.id}`}
                >
                  Ver detalle
                  <span aria-hidden="true">→</span>
                </Link>

                <Link
                  className="catalog-button catalog-button--secondary"
                  to="/pedido/configurar"
                  state={{
                    productId: featuredProduct.id,
                    source: 'catalog',
                  }}
                >
                  Personalizar
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </article>

          <div className="catalog-grid">
            <article className="catalog-product catalog-product--large">
              <div className="catalog-product__media">
                <img
                  src={secondaryProducts[0].image}
                  alt={secondaryProducts[0].alt}
                />

                <span className="catalog-product__number-badge catalog-product__number-badge--green">
                  {secondaryProducts[0].number}
                </span>
              </div>

              <div className="catalog-product__body">
                <h2>{secondaryProducts[0].name}</h2>

                <p>{secondaryProducts[0].description}</p>

                <ProductTags tags={secondaryProducts[0].tags} />

                <ProductPrice
                  price={secondaryProducts[0].price}
                  suffix={secondaryProducts[0].priceSuffix}
                />

                <Link
                  className="catalog-card-link catalog-card-link--green"
                  to={`/catalogo/${secondaryProducts[0].id}`}
                >
                  Ver detalle
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <article className="catalog-product catalog-product--large">
              <div className="catalog-product__media">
                <img
                  src={secondaryProducts[1].image}
                  alt={secondaryProducts[1].alt}
                />

                <span className="catalog-product__number-badge catalog-product__number-badge--yellow">
                  {secondaryProducts[1].number}
                </span>
              </div>

              <div className="catalog-product__body">
                <h2>{secondaryProducts[1].name}</h2>

                <p>{secondaryProducts[1].description}</p>

                <ProductTags tags={secondaryProducts[1].tags} />

                <ProductPrice
                  price={secondaryProducts[1].price}
                  suffix={secondaryProducts[1].priceSuffix}
                />

                <Link
                  className="catalog-card-link catalog-card-link--yellow"
                  to={`/catalogo/${secondaryProducts[1].id}`}
                >
                  Ver detalle
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            <div className="catalog-grid__stack">
              {secondaryProducts.slice(2).map((product, index) => (
                <article
                  key={product.id}
                  className="catalog-product catalog-product--horizontal"
                >
                  <div className="catalog-product__media">
                    <img
                      src={product.image}
                      alt={product.alt}
                    />

                    <span
                      className={`catalog-product__number-badge ${
                        index === 0
                          ? 'catalog-product__number-badge--blue'
                          : 'catalog-product__number-badge--pink'
                      }`}
                    >
                      {product.number}
                    </span>
                  </div>

                  <div className="catalog-product__body">
                    <h2>{product.name}</h2>

                    <p>{product.description}</p>

                    <ProductTags tags={product.tags} />

                    <div className="catalog-product__footer">
                      <ProductPrice
                        price={product.price}
                        suffix={product.priceSuffix}
                      />

                      <Link
                        className={`catalog-card-link ${
                          index === 0
                            ? 'catalog-card-link--blue'
                            : 'catalog-card-link--pink'
                        }`}
                        to={`/catalogo/${product.id}`}
                      >
                        Ver detalle
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="catalog-custom-banner">
            <div
              className="catalog-custom-banner__brand-line"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <div className="catalog-custom-banner__content">
              <span className="catalog-custom-banner__eyebrow">
                <span aria-hidden="true">✦</span>
                Hecho a tu medida
              </span>

              <h2>
                Tu idea, convertida en un pastel único
              </h2>

              <p>
                Personaliza sabores, tamaño, decoración y temática
                para crear una propuesta pensada para tu celebración.
              </p>
            </div>

            <div className="catalog-custom-banner__action">
              <span className="catalog-custom-banner__note">
                Sabores · tamaños · temáticas
              </span>

              <Link
                className="catalog-button catalog-button--primary"
                to="/pedido/configurar"
              >
                Configura tu pastel
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default CatalogPage;
