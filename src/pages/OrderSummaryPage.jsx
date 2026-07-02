import { Link, Navigate, useNavigate } from 'react-router-dom';

import { dietaryRestrictions } from '../constants/dietaryRestrictions';
import { sugarLevels } from '../constants/sugarLevels';
import { useOrder } from '../context/OrderContext';

import './OrderSummaryPage.css';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

const flavorLabels = {
  vanilla: 'Vainilla',
  chocolate: 'Chocolate',
  marble: 'Veteado vainilla–chocolate',
  'three-milks': 'Tres leches',
};

const fillingLabels = {
  none: 'Sin relleno adicional',
  arequipe: 'Arequipe',
  berries: 'Frutos rojos',
  chocolate: 'Crema de chocolate',
  lemon: 'Crema de limón',
};

const decorationLabels = {
  simple: 'Sencilla',
  themed: 'Temática',
  premium: 'Especial',
};

const timeSlotLabels = {
  morning: 'Mañana · 9:00 a. m. – 12:00 m.',
  afternoon: 'Tarde · 2:00 p. m. – 5:00 p. m.',
  evening: 'Final de tarde · 5:00 p. m. – 7:00 p. m.',
};

function SummarySection({
  title,
  step,
  children,
  onEdit,
}) {
  return (
    <article className="order-summary__section">
      <div className="order-summary__section-heading">
        <div>
          <span>Paso {step}</span>
          <h2>{title}</h2>
        </div>

        <button
          type="button"
          onClick={() => onEdit(step)}
        >
          Editar
          <span aria-hidden="true">↗</span>
        </button>
      </div>

      {children}
    </article>
  );
}

function OrderSummaryPage() {
  const navigate = useNavigate();
  const { order, goToStep } = useOrder();

  if (!order.productId) {
    return (
      <Navigate
        to="/catalogo"
        replace
        state={{
          message:
            'Selecciona un producto antes de revisar el pedido.',
        }}
      />
    );
  }

  const activeRestrictions = dietaryRestrictions.filter(
    (restriction) =>
      order.dietaryRestrictions[restriction.id],
  );

  const sugarLabel =
    sugarLevels.find(
      (level) => level.id === order.sugarLevel,
    )?.label || 'Sin definir';

  const editStep = (stepNumber) => {
    goToStep(stepNumber);

    navigate('/pedido/configurar', {
      state: {
        source: 'order-summary',
        editStep: stepNumber,
      },
    });
  };

  return (
    <main className="order-summary-page">
      <div className="container">
        <header className="order-summary__header">
          <span>Verificación final</span>

          <h1>Revisa tu pedido antes de confirmarlo</h1>

          <p>
            Comprueba cada sección. Puedes volver al paso
            correspondiente, corregir la información y regresar
            al resumen sin perder el resto de tus elecciones.
          </p>
        </header>

        <div className="order-summary__layout">
          <section className="order-summary__content">
            <article className="order-summary__product">
              <img
                src={order.productImage}
                alt={order.productName}
              />

              <div>
                <span>Producto seleccionado</span>
                <h2>{order.productName}</h2>

                <Link to="/catalogo">
                  Cambiar producto
                </Link>
              </div>
            </article>

            <SummarySection
              title="Restricciones y preferencias"
              step={1}
              onEdit={editStep}
            >
              <p>
                {order.noDietaryRestrictions
                  ? 'No se registraron restricciones alimentarias.'
                  : activeRestrictions.length > 0
                    ? activeRestrictions
                        .map(
                          (restriction) =>
                            restriction.label,
                        )
                        .join(', ')
                    : 'Sin información registrada.'}
              </p>

              {order.restrictionNotes && (
                <small>
                  Observaciones: {order.restrictionNotes}
                </small>
              )}
            </SummarySection>

            <SummarySection
              title="Tamaño y porciones"
              step={2}
              onEdit={editStep}
            >
              <p>
                {order.sizeServings
                  ? `${order.sizeServings} porciones`
                  : 'Sin definir'}
              </p>
            </SummarySection>

            <SummarySection
              title="Nivel de azúcar"
              step={3}
              onEdit={editStep}
            >
              <p>{sugarLabel}</p>
            </SummarySection>

            <SummarySection
              title="Sabores y rellenos"
              step={4}
              onEdit={editStep}
            >
              <p>
                Sabor:{' '}
                {flavorLabels[order.flavor] ||
                  'Sin definir'}
              </p>

              <small>
                Relleno:{' '}
                {fillingLabels[order.filling] ||
                  'Sin relleno adicional'}
              </small>
            </SummarySection>

            <SummarySection
              title="Decoración y mensaje"
              step={5}
              onEdit={editStep}
            >
              <p>
                Estilo:{' '}
                {decorationLabels[
                  order.decorationStyle
                ] || 'Sin definir'}
              </p>

              {order.decorationTheme && (
                <small>
                  Temática: {order.decorationTheme}
                </small>
              )}

              {order.cakeMessage && (
                <small>
                  Mensaje: “{order.cakeMessage}”
                </small>
              )}

              {order.notes && (
                <small>
                  Observaciones: {order.notes}
                </small>
              )}
            </SummarySection>

            <SummarySection
              title="Entrega y contacto"
              step={6}
              onEdit={editStep}
            >
              <p>
                {order.deliveryDate || 'Fecha sin definir'}
                {' · '}
                {timeSlotLabels[
                  order.deliveryTimeSlot
                ] || 'Horario por confirmar'}
              </p>

              <small>
                {order.customerName || 'Nombre sin definir'}
                {' · '}
                {order.confirmationChannel === 'email'
                  ? order.customerEmail
                  : order.customerWhatsApp}
              </small>
            </SummarySection>
          </section>

          <aside className="order-summary__checkout">
            <div
              className="order-summary__brand-line"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </div>

            <span>Estimado del pedido</span>

            <strong>
              {currencyFormatter.format(
                order.estimatedPrice ||
                  order.basePrice ||
                  0,
              )}
            </strong>

            <p>
              El valor definitivo será confirmado después de
              revisar disponibilidad, restricciones y nivel de
              decoración.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate('/pedido/confirmacion')
              }
            >
              Confirmar y registrar pedido
              <span aria-hidden="true">→</span>
            </button>

            <button
              className="order-summary__back-button"
              type="button"
              onClick={() => editStep(6)}
            >
              Volver al configurador
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderSummaryPage;
