import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { orderStatus } from '../constants/orderStatus';
import { useOrder } from '../context/OrderContext';

import './OrderConfirmationPage.css';

function createOrderId() {
  return `ORD-${Date.now().toString().slice(-6)}`;
}

function OrderConfirmationPage() {
  const {
    order,
    resetOrder,
    setOrderState,
  } = useOrder();

  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!order.productId) {
    return <Navigate to="/catalogo" replace />;
  }

  const saveOrder = async () => {
    setErrorMessage('');
    setOrderState(orderStatus.SAVING);

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 900),
      );

      const generatedOrderId = createOrderId();

      setOrderId(generatedOrderId);
      setOrderState(orderStatus.SAVED);
    } catch {
      setErrorMessage(
        'No pudimos registrar el pedido. Reintenta sin perder la información.',
      );
      setOrderState(orderStatus.SAVE_ERROR);
    }
  };

  const isSaved = order.status === orderStatus.SAVED;
  const isSaving = order.status === orderStatus.SAVING;

  return (
    <main className="order-confirmation-page">
      <div className="container">
        <section className="order-confirmation">
          <div className="order-confirmation__brand-line">
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
                Al continuar, guardaremos la configuración y
                prepararemos el seguimiento por el canal que
                seleccionaste.
              </p>

              <div className="order-confirmation__summary">
                <div>
                  <span>Producto</span>
                  <strong>{order.productName}</strong>
                </div>

                <div>
                  <span>Contacto</span>
                  <strong>
                    {order.confirmationChannel === 'email'
                      ? order.customerEmail
                      : order.customerWhatsApp}
                  </strong>
                </div>

                <div>
                  <span>Fecha solicitada</span>
                  <strong>{order.deliveryDate}</strong>
                </div>
              </div>

              {errorMessage && (
                <div
                  className="order-confirmation__error"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={saveOrder}
                disabled={isSaving}
              >
                {isSaving
                  ? 'Registrando pedido...'
                  : 'Registrar pedido'}
              </button>

              <Link to="/pedido/resumen">
                Volver al resumen
              </Link>
            </>
          ) : (
            <>
              <div className="order-confirmation__success-icon">
                ✓
              </div>

              <span className="order-confirmation__eyebrow">
                Pedido registrado
              </span>

              <h1>Tu solicitud quedó guardada</h1>

              <p>
                Revisaremos disponibilidad, restricciones y
                detalles del pedido antes de enviarte la
                confirmación definitiva.
              </p>

              <div className="order-confirmation__order-id">
                <span>Número de seguimiento</span>
                <strong>{orderId}</strong>
              </div>

              <ol className="order-confirmation__next-steps">
                <li>
                  Revisamos la configuración y disponibilidad.
                </li>
                <li>
                  Confirmamos el valor final y la fecha.
                </li>
                <li>
                  Te contactamos por el canal seleccionado.
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
