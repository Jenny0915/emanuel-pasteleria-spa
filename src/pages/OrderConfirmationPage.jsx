import { useState } from 'react';
import {
  Link,
  Navigate,
} from 'react-router-dom';

import { orderStatus } from '../constants/orderStatus';
import { useOrder } from '../context/OrderContext';
import { createOrder } from '../services/orderService';

import './OrderConfirmationPage.css';

function createOrderCode() {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll('-', '');

  const randomPart = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `EP-${datePart}-${randomPart}`;
}

function buildOrderPayload(order) {
  return {
    orderCode: createOrderCode(),

    productId: order.productId,
    productName: order.productName,
    productImage: order.productImage,

    basePrice: Number(order.basePrice || 0),
    estimatedPrice: Number(
      order.estimatedPrice || order.basePrice || 0,
    ),

    sizeServings: order.sizeServings,
    sugarLevel: order.sugarLevel,
    flavor: order.flavor,
    filling: order.filling,

    decorationStyle: order.decorationStyle,
    decorationTheme: order.decorationTheme,
    cakeMessage: order.cakeMessage,
    notes: order.notes,

    lactoseFree: Boolean(
      order.dietaryRestrictions?.lactoseFree,
    ),
    glutenFree: Boolean(
      order.dietaryRestrictions?.glutenFree,
    ),
    sugarFree: Boolean(
      order.dietaryRestrictions?.sugarFree,
    ),
    stevia: Boolean(
      order.dietaryRestrictions?.stevia,
    ),
    noDietaryRestrictions: Boolean(
      order.noDietaryRestrictions,
    ),
    restrictionNotes: order.restrictionNotes,

    deliveryDate: order.deliveryDate,
    deliveryTimeSlot: order.deliveryTimeSlot,

    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerWhatsApp: order.customerWhatsApp,
    confirmationChannel:
      order.confirmationChannel,

    status: 'registered',
  };
}

function OrderConfirmationPage() {
  const {
    order,
    resetOrder,
    setOrderState,
  } = useOrder();

  const [savedOrder, setSavedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!order.productId) {
    return (
      <Navigate
        to="/catalogo"
        replace
        state={{
          message:
            'Selecciona un producto antes de confirmar el pedido.',
        }}
      />
    );
  }

  const saveOrder = async () => {
    setErrorMessage('');
    setOrderState(orderStatus.SAVING);

    try {
      const payload = buildOrderPayload(order);
      const createdOrder = await createOrder(payload);

      setSavedOrder(createdOrder);
      setOrderState(orderStatus.SAVED);
    } catch (error) {
      console.error(
        'Error al registrar el pedido:',
        error,
      );

      setErrorMessage(
        error?.message ||
          'No pudimos registrar el pedido. Reintenta sin perder la información.',
      );

      setOrderState(orderStatus.SAVE_ERROR);
    }
  };

  const isSaved =
    order.status === orderStatus.SAVED &&
    savedOrder;

  const isSaving =
    order.status === orderStatus.SAVING;

  const displayedOrderCode =
    savedOrder?.orderCode ||
    (savedOrder?.id
      ? `EP-${savedOrder.id}`
      : '');

  return (
    <main className="order-confirmation-page">
      <div className="container">
        <section className="order-confirmation">
          <div
            className="order-confirmation__brand-line"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          {!isSaved ? (
            <>
              <span className="order-confirmation__eyebrow">
                Último paso
              </span>

              <h1>Registra tu pedido</h1>

              <p>
                Al continuar, guardaremos la
                configuración y prepararemos el
                seguimiento por el canal que
                seleccionaste.
              </p>

              <div className="order-confirmation__summary">
                <div>
                  <span>Producto</span>

                  <strong>
                    {order.productName}
                  </strong>
                </div>

                <div>
                  <span>Contacto</span>

                  <strong>
                    {order.confirmationChannel ===
                    'email'
                      ? order.customerEmail
                      : order.customerWhatsApp}
                  </strong>
                </div>

                <div>
                  <span>Fecha solicitada</span>

                  <strong>
                    {order.deliveryDate}
                  </strong>
                </div>
              </div>

              {errorMessage && (
                <div
                  className="order-confirmation__error"
                  role="alert"
                >
                  <strong>
                    No fue posible guardar el
                    pedido.
                  </strong>

                  <p>{errorMessage}</p>

                  <small>
                    Tus datos siguen guardados y
                    puedes intentarlo nuevamente.
                  </small>
                </div>
              )}

              <button
                type="button"
                onClick={saveOrder}
                disabled={isSaving}
                aria-busy={isSaving}
              >
                {isSaving
                  ? 'Registrando pedido...'
                  : errorMessage
                    ? 'Reintentar registro'
                    : 'Registrar pedido'}
              </button>

              <Link to="/pedido/resumen">
                Volver al resumen
              </Link>
            </>
          ) : (
            <>
              <div
                className="order-confirmation__success-icon"
                aria-hidden="true"
              >
                ✓
              </div>

              <span className="order-confirmation__eyebrow">
                Pedido registrado
              </span>

              <h1>
                Tu solicitud quedó guardada
              </h1>

              <p>
                Revisaremos disponibilidad,
                restricciones y detalles del pedido
                antes de enviarte la confirmación
                definitiva.
              </p>

              <div className="order-confirmation__order-id">
                <span>
                  Número de seguimiento
                </span>

                <strong>
                  {displayedOrderCode}
                </strong>

                {savedOrder?.id && (
                  <small>
                    Registro MockAPI: {savedOrder.id}
                  </small>
                )}
              </div>

              <ol className="order-confirmation__next-steps">
                <li>
                  Revisamos la configuración y
                  disponibilidad.
                </li>

                <li>
                  Confirmamos el valor final y la
                  fecha.
                </li>

                <li>
                  Te contactamos por el canal
                  seleccionado.
                </li>
              </ol>

              <Link
                className="order-confirmation__primary-link"
                to="/"
                onClick={resetOrder}
              >
                Volver al inicio
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

export default OrderConfirmationPage;
