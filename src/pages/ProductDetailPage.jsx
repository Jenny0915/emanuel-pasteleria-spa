import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  Navigate,
  useLocation,
  useParams,
} from 'react-router-dom';

import {
  getProductById,
  getRelatedProducts,
} from '../data/products';

import './ProductDetailPage.css';

function ProductTag({ tag }) {
  return (
    <span
      className={`product-detail__tag product-detail__tag--${tag.color}`}
    >
      {tag.label}
    </span>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  const product = useMemo(() => getProductById(id), [id]);
  const relatedProducts = useMemo(
    () => getRelatedProducts(id, 3),
    [id],
  );

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [id]);

  if (!product) {
    return <Navigate to="/catalogo" replace />;
  }

  const galleryImages = [product.image, ...product.gallery];

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0
        ? galleryImages.length - 1
        : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1
        ? 0
        : currentIndex + 1,
    );
  };

  const handleImageError = (event) => {
    if (event.currentTarget.src.endsWith(product.image)) {
      return;
    }

    event.currentTarget.src = product.image;
  };

  return (
    <main className="product-detail-page">
      <div className="container">
        <nav
          className="product-detail__breadcrumb"
          aria-label="Ruta de navegación"
        >
          <Link to="/" aria-label="Ir al inicio">
            Inicio
          </Link>

          <span aria-hidden="true">›</span>

          <Link to="/catalogo">
            Catálogo
          </Link>

          <span aria-hidden="true">›</span>

          <span aria-current="page">
            {product.name}
          </span>
        </nav>

        <section
          className="product-detail__hero"
          aria-labelledby="product-detail-title"
        >
          <div className="product-gallery">
            <div className="product-gallery__main">
              <div
                className="product-gallery__brand-line"
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
              </div>

              <img
                src={galleryImages[activeImageIndex]}
                alt={`${product.alt} - vista ${activeImageIndex + 1}`}
                onError={handleImageError}
              />

              {product.featured && (
                <span className="product-gallery__badge">
                  <span aria-hidden="true">✦</span>
                  {product.badge}
                </span>
              )}

              <button
                className="product-gallery__arrow product-gallery__arrow--previous"
                type="button"
                onClick={showPreviousImage}
                aria-label="Mostrar imagen anterior"
              >
                ‹
              </button>

              <button
                className="product-gallery__arrow product-gallery__arrow--next"
                type="button"
                onClick={showNextImage}
                aria-label="Mostrar imagen siguiente"
              >
                ›
              </button>
            </div>

            <div
              className="product-gallery__thumbnails"
              aria-label="Seleccionar imagen del producto"
            >
              {galleryImages.map((image, index) => (
                <button
                  key={`${product.id}-${image}-${index}`}
                  className={`product-gallery__thumbnail ${
                    index === activeImageIndex
                      ? 'product-gallery__thumbnail--active'
                      : ''
                  }`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Mostrar vista ${index + 1} de ${product.name}`}
                  aria-current={
                    index === activeImageIndex
                      ? 'true'
                      : undefined
                  }
                >
                  <img
                    src={image}
                    alt=""
                    onError={handleImageError}
                  />
                </button>
              ))}
            </div>
          </div>

          <article className="product-summary">
            <div
              className="product-summary__brand-line"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <span className="product-summary__eyebrow">
              {product.featured
                ? 'Producto destacado'
                : 'Producto personalizable'}
            </span>

            <h1 id="product-detail-title">
              {product.name}
            </h1>

            <p className="product-summary__description">
              {product.description}
            </p>

            <div
              className="product-summary__tags"
              aria-label="Características principales"
            >
              {product.tags.map((tag) => (
                <ProductTag
                  key={tag.label}
                  tag={tag}
                />
              ))}
            </div>

            <div className="product-summary__price">
              <span>Desde</span>

              <div>
                <strong>{product.priceLabel}</strong>

                {product.unitLabel && (
                  <small>{product.unitLabel}</small>
                )}
              </div>
            </div>

            <div className="product-summary__highlights">
              {product.highlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="product-summary__highlight"
                >
                  <span
                    className={`product-summary__highlight-icon product-summary__highlight-icon--${highlight.color}`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <h2>{highlight.title}</h2>
                    <p>{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="product-summary__actions">
              <Link
                className="product-detail-button product-detail-button--primary"
                to="/pedido/configurar"
                state={{
                  productId: product.id,
                  source: 'product-detail',
                  returnTo: location.pathname,
                }}
              >
                <span aria-hidden="true">✦</span>
                Personalizar este producto
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                className="product-detail-button product-detail-button--secondary"
                to="/catalogo"
              >
                <span aria-hidden="true">←</span>
                Volver al catálogo
              </Link>
            </div>
          </article>
        </section>

        <section
          className="product-customization"
          aria-labelledby="product-customization-title"
        >
          <div className="product-section-heading">
            <span>Opciones disponibles</span>

            <h2 id="product-customization-title">
              Qué puedes personalizar
            </h2>
          </div>

          <div className="product-customization__grid">
            {product.customization.map((option, index) => (
              <article
                key={option.title}
                className="product-customization__item"
              >
                <span
                  className={`product-customization__icon product-customization__icon--${option.color}`}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="product-information">
          <article
            className="product-information__card"
            aria-labelledby="product-information-title"
          >
            <div
              className="product-information__brand-line"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <h2 id="product-information-title">
              Información del producto
            </h2>

            <dl className="product-information__list">
              {product.information.map(([label, value], index) => (
                <div key={label}>
                  <dt>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {label}
                  </dt>

                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article
            className="product-information__card"
            aria-labelledby="product-preferences-title"
          >
            <div
              className="product-information__brand-line"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <h2 id="product-preferences-title">
              Compatible con tus preferencias
            </h2>

            <div className="product-preferences">
              {product.preferences.map((preference) => (
                <span
                  key={preference.label}
                  className={`product-preference product-preference--${preference.color}`}
                >
                  <span aria-hidden="true">✓</span>
                  {preference.label}
                </span>
              ))}
            </div>

            <p className="product-information__note">
              * Consulta disponibilidad al personalizar tu pedido.
            </p>
          </article>
        </section>

        <section
          className="related-products"
          aria-labelledby="related-products-title"
        >
          <div className="related-products__heading">
            <div>
              <span>Más opciones para ti</span>
              <h2 id="related-products-title">
                También podría gustarte
              </h2>
            </div>

            <Link to="/catalogo">
              Ver catálogo completo
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="related-products__grid">
            {relatedProducts.map((relatedProduct) => (
              <article
                key={relatedProduct.id}
                className="related-product"
              >
                <div className="related-product__image">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.alt}
                  />
                </div>

                <div className="related-product__content">
                  <h3>{relatedProduct.name}</h3>

                  <p>{relatedProduct.shortDescription}</p>

                  <div className="related-product__footer">
                    <div>
                      <span>Desde</span>
                      <strong>
                        {relatedProduct.priceLabel}
                        {relatedProduct.unitLabel && (
                          <small>
                            {' '}
                            {relatedProduct.unitLabel}
                          </small>
                        )}
                      </strong>
                    </div>

                    <Link
                      to={`/catalogo/${relatedProduct.id}`}
                    >
                      Ver detalle
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

