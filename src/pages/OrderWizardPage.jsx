import { useEffect, useMemo, useState } from 'react';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import {
  dietaryRestrictions,
  emptyDietaryRestrictions,
} from '../constants/dietaryRestrictions';
import {
  getOrderStep,
  orderSteps,
  TOTAL_ORDER_STEPS,
} from '../constants/orderSteps';
import { sugarLevels } from '../constants/sugarLevels';
import { useOrder } from '../context/OrderContext';
import products from '../data/products';

import './OrderWizardPage.css';

const sizeOptions = [
  { value: '8', title: '8 porciones', description: 'Celebración pequeña' },
  { value: '12', title: '12 porciones', description: 'Reunión familiar' },
  { value: '16', title: '16 porciones', description: 'Celebración mediana' },
  { value: '20', title: '20 porciones', description: 'Evento especial' },
  { value: '24', title: '24 porciones', description: 'Grupo grande' },
  { value: '30', title: '30 o más', description: 'Cotización especial' },
];

const flavorOptions = [
  { value: 'vanilla', label: 'Vainilla' },
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'marble', label: 'Veteado vainilla–chocolate' },
  { value: 'three-milks', label: 'Tres leches' },
];

const fillingOptions = [
  { value: 'none', label: 'Sin relleno adicional' },
  { value: 'arequipe', label: 'Arequipe' },
  { value: 'berries', label: 'Frutos rojos' },
  { value: 'chocolate', label: 'Crema de chocolate' },
  { value: 'lemon', label: 'Crema de limón' },
];

const decorationOptions = [
  {
    value: 'simple',
    title: 'Sencilla',
    description: 'Crema, grageas y acabado limpio.',
    color: 'blue',
  },
  {
    value: 'themed',
    title: 'Temática',
    description: 'Colores y elementos según la ocasión.',
    color: 'green',
  },
  {
    value: 'premium',
    title: 'Especial',
    description: 'Mayor nivel de detalle y acabados elaborados.',
    color: 'yellow',
  },
];

const timeSlots = [
  { value: 'morning', label: 'Mañana · 9:00 a. m. – 12:00 m.' },
  { value: 'afternoon', label: 'Tarde · 2:00 p. m. – 5:00 p. m.' },
  { value: 'evening', label: 'Final de tarde · 5:00 p. m. – 7:00 p. m.' },
];

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function getTodayInputValue() {
  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset() * 60000;

  return new Date(today.getTime() - timezoneOffset)
    .toISOString()
    .split('T')[0];
}

function OptionCard({
  selected,
  color = 'blue',
  title,
  description,
  onClick,
  disabled = false,
  badge,
}) {
  return (
    <button
      className={`wizard-option wizard-option--${color} ${
        selected ? 'wizard-option--selected' : ''
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="wizard-option__indicator" aria-hidden="true">
        {selected ? '✓' : ''}
      </span>

      <span className="wizard-option__content">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>

      {badge && (
        <span className="wizard-option__badge">
          {badge}
        </span>
      )}
    </button>
  );
}

function OrderWizardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    order,
    flow,
    updateOrder,
    updateNestedOrder,
    selectProduct,
    goToStep,
    markStepCompleted,
    clearStepCompleted,
  } = useOrder();

  const [errors, setErrors] = useState({});
  const [showMobileSummary, setShowMobileSummary] =
    useState(false);

  useEffect(() => {
    const incomingProductId =
      location.state?.productId ||
      location.state?.quickOrder?.productId;

    if (incomingProductId) {
      selectProduct(incomingProductId);
    }

    if (location.state?.quickOrder) {
      const quickOrder = location.state.quickOrder;

      updateOrder({
        sizeServings: quickOrder.size || order.sizeServings,
        sugarLevel:
          quickOrder.sugarLevel || order.sugarLevel,
      });

      const restrictionMap = {
        'lactose-free': 'lactoseFree',
        'gluten-free': 'glutenFree',
        'sugar-free': 'sugarFree',
        stevia: 'stevia',
      };

      const mappedRestriction =
        restrictionMap[quickOrder.restriction];

      if (mappedRestriction) {
        updateNestedOrder('dietaryRestrictions', {
          [mappedRestriction]: true,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (
      (order.dietaryRestrictions.sugarFree ||
        order.dietaryRestrictions.stevia) &&
      order.sugarLevel === 'traditional'
    ) {
      updateOrder({ sugarLevel: '' });
    }
  }, [
    order.dietaryRestrictions.sugarFree,
    order.dietaryRestrictions.stevia,
    order.sugarLevel,
    updateOrder,
  ]);

  const currentStep =
    getOrderStep(flow.currentStep) || orderSteps[0];

  const progressPercentage = Math.round(
    (flow.completedSteps.length / TOTAL_ORDER_STEPS) * 100,
  );

  const selectedProduct = useMemo(
    () =>
      products.find(
        (product) => product.id === order.productId,
      ),
    [order.productId],
  );

  const activeRestrictions = dietaryRestrictions.filter(
    (restriction) =>
      order.dietaryRestrictions[restriction.id],
  );

  const validateStep = () => {
    const nextErrors = {};

    switch (flow.currentStep) {
      case 1:
        if (
          !order.noDietaryRestrictions &&
          activeRestrictions.length === 0
        ) {
          nextErrors.restrictions =
            'Selecciona al menos una opción o marca “No tengo restricciones”.';
        }
        break;

      case 2:
        if (!order.sizeServings) {
          nextErrors.sizeServings =
            'Selecciona el número de porciones para continuar.';
        }
        break;

      case 3:
        if (!order.sugarLevel) {
          nextErrors.sugarLevel =
            'Selecciona un nivel de azúcar para continuar.';
        }
        break;

      case 4:
        if (!order.flavor) {
          nextErrors.flavor =
            'Selecciona el sabor principal.';
        }
        break;

      case 5:
        if (!order.decorationStyle) {
          nextErrors.decorationStyle =
            'Selecciona un estilo de decoración.';
        }

        if (order.cakeMessage.length > 40) {
          nextErrors.cakeMessage =
            'El mensaje no puede superar los 40 caracteres.';
        }
        break;

      case 6:
        if (!order.deliveryDate) {
          nextErrors.deliveryDate =
            'Selecciona una fecha de entrega.';
        } else if (order.deliveryDate < getTodayInputValue()) {
          nextErrors.deliveryDate =
            'La fecha de entrega no puede estar en el pasado.';
        }

        if (!order.customerName.trim()) {
          nextErrors.customerName =
            'Ingresa el nombre de la persona que realiza el pedido.';
        }

        if (!order.confirmationChannel) {
          nextErrors.confirmationChannel =
            'Selecciona cómo deseas recibir la confirmación.';
        }

        if (
          order.confirmationChannel === 'email' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            order.customerEmail,
          )
        ) {
          nextErrors.customerEmail =
            'Ingresa un correo electrónico válido.';
        }

        if (
          order.confirmationChannel === 'whatsapp' &&
          order.customerWhatsApp.replace(/\D/g, '').length < 10
        ) {
          nextErrors.customerWhatsApp =
            'Ingresa un número de WhatsApp válido.';
        }
        break;

      default:
        break;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      clearStepCompleted(flow.currentStep);
      return false;
    }

    markStepCompleted(flow.currentStep);
    return true;
  };

  const handleContinue = () => {
    if (!validateStep()) {
      return;
    }

    if (flow.currentStep === TOTAL_ORDER_STEPS) {
      navigate('/pedido/resumen');
      return;
    }

    goToStep(flow.currentStep + 1);
    setErrors({});
  };

  const handleBack = () => {
    if (flow.currentStep === 1) {
      navigate('/catalogo');
      return;
    }

    goToStep(flow.currentStep - 1);
    setErrors({});
  };

  const toggleRestriction = (restrictionId) => {
    updateNestedOrder('dietaryRestrictions', {
      [restrictionId]:
        !order.dietaryRestrictions[restrictionId],
    });

    updateOrder({
      noDietaryRestrictions: false,
    });

    setErrors({});
  };

  const handleNoRestrictions = () => {
    updateOrder({
      noDietaryRestrictions: true,
      dietaryRestrictions: emptyDietaryRestrictions,
    });

    setErrors({});
  };

  const renderStepContent = () => {
    switch (flow.currentStep) {
      case 1:
        return (
          <div className="wizard-step">
            <div className="wizard-step__heading">
              <span className="wizard-step__eyebrow">
                Paso 1 · Requisito crítico
              </span>

              <h2>Cuéntanos qué debemos tener en cuenta</h2>

              <p>
                Selecciona todas las opciones que correspondan.
                Esta información quedará registrada de forma
                explícita en tu pedido.
              </p>
            </div>

            <div className="wizard-options-grid wizard-options-grid--two">
              {dietaryRestrictions.map((restriction) => (
                <OptionCard
                  key={restriction.id}
                  selected={
                    order.dietaryRestrictions[restriction.id]
                  }
                  color={restriction.color}
                  title={restriction.label}
                  description={restriction.description}
                  onClick={() =>
                    toggleRestriction(restriction.id)
                  }
                />
              ))}

              <OptionCard
                selected={order.noDietaryRestrictions}
                color="neutral"
                title="No tengo restricciones"
                description="Puedes continuar con las opciones generales del producto."
                onClick={handleNoRestrictions}
              />
            </div>

            {errors.restrictions && (
              <p className="wizard-field-error" role="alert">
                {errors.restrictions}
              </p>
            )}

            <label className="wizard-field wizard-field--full">
              <span>
                Observaciones sobre restricciones
                <small>Opcional</small>
              </span>

              <textarea
                value={order.restrictionNotes}
                onChange={(event) =>
                  updateOrder({
                    restrictionNotes: event.target.value,
                  })
                }
                rows="4"
                placeholder="Ejemplo: evitar frutos secos o validar ingredientes específicos."
              />
            </label>

            <div className="wizard-safety-note">
              <span aria-hidden="true">i</span>
              <p>
                Las preferencias seleccionadas serán revisadas
                antes de confirmar la preparación. Para alergias
                severas, indícalo en las observaciones.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="wizard-step">
            <div className="wizard-step__heading">
              <span className="wizard-step__eyebrow">
                Paso 2 · Tamaño
              </span>

              <h2>¿Para cuántas personas es tu pedido?</h2>

              <p>
                Selecciona una cantidad aproximada. Podrás
                revisarla antes de confirmar.
              </p>
            </div>

            <div className="wizard-options-grid wizard-options-grid--three">
              {sizeOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={
                    order.sizeServings === option.value
                  }
                  color={
                    Number(option.value) <= 12
                      ? 'blue'
                      : Number(option.value) <= 20
                        ? 'green'
                        : 'yellow'
                  }
                  title={option.title}
                  description={option.description}
                  onClick={() => {
                    updateOrder({
                      sizeServings: option.value,
                    });
                    setErrors({});
                  }}
                />
              ))}
            </div>

            {errors.sizeServings && (
              <p className="wizard-field-error" role="alert">
                {errors.sizeServings}
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="wizard-step">
            <div className="wizard-step__heading">
              <span className="wizard-step__eyebrow">
                Paso 3 · Dulzor
              </span>

              <h2>Elige el nivel de azúcar</h2>

              <p>
                Lee cada alternativa antes de seleccionar. “Sin
                azúcar” y “con stevia” no significan exactamente
                lo mismo.
              </p>
            </div>

            <div className="wizard-options-grid wizard-options-grid--two">
              {sugarLevels.map((level) => {
                const disabled =
                  level.id === 'traditional' &&
                  (order.dietaryRestrictions.sugarFree ||
                    order.dietaryRestrictions.stevia);

                return (
                  <OptionCard
                    key={level.id}
                    selected={order.sugarLevel === level.id}
                    color={level.color}
                    title={level.label}
                    description={level.description}
                    disabled={disabled}
                    badge={
                      disabled
                        ? 'No compatible con tu restricción'
                        : undefined
                    }
                    onClick={() => {
                      updateOrder({
                        sugarLevel: level.id,
                      });
                      setErrors({});
                    }}
                  />
                );
              })}
            </div>

            {errors.sugarLevel && (
              <p className="wizard-field-error" role="alert">
                {errors.sugarLevel}
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="wizard-step">
            <div className="wizard-step__heading">
              <span className="wizard-step__eyebrow">
                Paso 4 · Sabor
              </span>

              <h2>Combina sabor y relleno</h2>

              <p>
                Elige la base del producto y agrega un relleno
                cuando aplique.
              </p>
            </div>

            <div className="wizard-fields-grid">
              <label className="wizard-field">
                <span>Sabor principal</span>

                <select
                  value={order.flavor}
                  onChange={(event) => {
                    updateOrder({
                      flavor: event.target.value,
                    });
                    setErrors({});
                  }}
                >
                  <option value="">
                    Selecciona un sabor
                  </option>

                  {flavorOptions.map((flavor) => (
                    <option
                      key={flavor.value}
                      value={flavor.value}
                    >
                      {flavor.label}
                    </option>
                  ))}
                </select>

                {errors.flavor && (
                  <small className="wizard-field-error">
                    {errors.flavor}
                  </small>
                )}
              </label>

              <label className="wizard-field">
                <span>
                  Relleno
                  <small>Opcional</small>
                </span>

                <select
                  value={order.filling}
                  onChange={(event) =>
                    updateOrder({
                      filling: event.target.value,
                    })
                  }
                >
                  <option value="">
                    Selecciona una opción
                  </option>

                  {fillingOptions.map((filling) => (
                    <option
                      key={filling.value}
                      value={filling.value}
                    >
                      {filling.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="wizard-step">
            <div className="wizard-step__heading">
              <span className="wizard-step__eyebrow">
                Paso 5 · Presentación
              </span>

              <h2>Define la decoración y el mensaje</h2>

              <p>
                Selecciona el nivel de detalle y cuéntanos la idea
                general de tu celebración.
              </p>
            </div>

            <div className="wizard-options-grid wizard-options-grid--three">
              {decorationOptions.map((option) => (
                <OptionCard
                  key={option.value}
                  selected={
                    order.decorationStyle === option.value
                  }
                  color={option.color}
                  title={option.title}
                  description={option.description}
                  onClick={() => {
                    updateOrder({
                      decorationStyle: option.value,
                    });
                    setErrors({});
                  }}
                />
              ))}
            </div>

            {errors.decorationStyle && (
              <p className="wizard-field-error" role="alert">
                {errors.decorationStyle}
              </p>
            )}

            <div className="wizard-fields-grid">
              <label className="wizard-field">
                <span>
                  Temática o colores
                  <small>Opcional</small>
                </span>

                <input
                  type="text"
                  value={order.decorationTheme}
                  onChange={(event) =>
                    updateOrder({
                      decorationTheme: event.target.value,
                    })
                  }
                  placeholder="Ejemplo: flores, fútbol, tonos pastel..."
                />
              </label>

              <label className="wizard-field">
                <span>
                  Mensaje del pastel
                  <small>
                    {order.cakeMessage.length}/40
                  </small>
                </span>

                <input
                  type="text"
                  maxLength="40"
                  value={order.cakeMessage}
                  onChange={(event) =>
                    updateOrder({
                      cakeMessage: event.target.value,
                    })
                  }
                  placeholder="Ejemplo: Feliz cumpleaños, Ana"
                />

                {errors.cakeMessage && (
                  <small className="wizard-field-error">
                    {errors.cakeMessage}
                  </small>
                )}
              </label>
            </div>

            <label className="wizard-field wizard-field--full">
              <span>
                Observaciones de diseño
                <small>Opcional</small>
              </span>

              <textarea
                value={order.notes}
                onChange={(event) =>
                  updateOrder({
                    notes: event.target.value,
                  })
                }
                rows="4"
                placeholder="Cuéntanos detalles adicionales sobre la decoración."
              />
            </label>
          </div>
        );

      case 6:
        return (
          <div className="wizard-step">
            <div className="wizard-step__heading">
              <span className="wizard-step__eyebrow">
                Paso 6 · Entrega y contacto
              </span>

              <h2>¿Cuándo y cómo te contactamos?</h2>

              <p>
                Estos datos permiten revisar disponibilidad y
                enviarte la confirmación del pedido.
              </p>
            </div>

            <div className="wizard-fields-grid">
              <label className="wizard-field">
                <span>Fecha de entrega</span>

                <input
                  type="date"
                  min={getTodayInputValue()}
                  value={order.deliveryDate}
                  onChange={(event) => {
                    updateOrder({
                      deliveryDate: event.target.value,
                    });
                    setErrors({});
                  }}
                />

                {errors.deliveryDate && (
                  <small className="wizard-field-error">
                    {errors.deliveryDate}
                  </small>
                )}
              </label>

              <label className="wizard-field">
                <span>
                  Franja horaria
                  <small>Opcional</small>
                </span>

                <select
                  value={order.deliveryTimeSlot}
                  onChange={(event) =>
                    updateOrder({
                      deliveryTimeSlot: event.target.value,
                    })
                  }
                >
                  <option value="">
                    Selecciona una franja
                  </option>

                  {timeSlots.map((slot) => (
                    <option
                      key={slot.value}
                      value={slot.value}
                    >
                      {slot.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="wizard-field">
                <span>Nombre completo</span>

                <input
                  type="text"
                  value={order.customerName}
                  onChange={(event) => {
                    updateOrder({
                      customerName: event.target.value,
                    });
                    setErrors({});
                  }}
                  placeholder="Nombre de quien realiza el pedido"
                />

                {errors.customerName && (
                  <small className="wizard-field-error">
                    {errors.customerName}
                  </small>
                )}
              </label>

              <label className="wizard-field">
                <span>
                  Correo electrónico
                  <small>
                    {order.confirmationChannel === 'email'
                      ? 'Obligatorio'
                      : 'Opcional'}
                  </small>
                </span>

                <input
                  type="email"
                  value={order.customerEmail}
                  onChange={(event) => {
                    updateOrder({
                      customerEmail: event.target.value,
                    });
                    setErrors({});
                  }}
                  placeholder="nombre@correo.com"
                />

                {errors.customerEmail && (
                  <small className="wizard-field-error">
                    {errors.customerEmail}
                  </small>
                )}
              </label>

              <label className="wizard-field">
                <span>
                  WhatsApp
                  <small>
                    {order.confirmationChannel === 'whatsapp'
                      ? 'Obligatorio'
                      : 'Opcional'}
                  </small>
                </span>

                <input
                  type="tel"
                  value={order.customerWhatsApp}
                  onChange={(event) => {
                    updateOrder({
                      customerWhatsApp: event.target.value,
                    });
                    setErrors({});
                  }}
                  placeholder="+57 300 000 0000"
                />

                {errors.customerWhatsApp && (
                  <small className="wizard-field-error">
                    {errors.customerWhatsApp}
                  </small>
                )}
              </label>
            </div>

            <fieldset className="wizard-channel">
              <legend>Canal de confirmación</legend>

              <div className="wizard-options-grid wizard-options-grid--two">
                <OptionCard
                  selected={
                    order.confirmationChannel === 'whatsapp'
                  }
                  color="green"
                  title="WhatsApp"
                  description="Recibe la confirmación y el seguimiento por mensaje."
                  onClick={() => {
                    updateOrder({
                      confirmationChannel: 'whatsapp',
                    });
                    setErrors({});
                  }}
                />

                <OptionCard
                  selected={
                    order.confirmationChannel === 'email'
                  }
                  color="blue"
                  title="Correo electrónico"
                  description="Recibe el resumen y la confirmación en tu correo."
                  onClick={() => {
                    updateOrder({
                      confirmationChannel: 'email',
                    });
                    setErrors({});
                  }}
                />
              </div>

              {errors.confirmationChannel && (
                <p className="wizard-field-error" role="alert">
                  {errors.confirmationChannel}
                </p>
              )}
            </fieldset>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="order-wizard-page">
      <div className="container">
        <div className="wizard-header">
          <div>
            <span className="wizard-header__eyebrow">
              Configurador guiado
            </span>

            <h1>Crea un pedido claro, completo y a tu medida</h1>

            <p>
              Avanza paso a paso. Tus elecciones se guardan
              automáticamente para que puedas regresar sin perder
              información.
            </p>
          </div>

          <div className="wizard-header__progress">
            <div className="wizard-header__progress-copy">
              <span>
                Paso {flow.currentStep} de {TOTAL_ORDER_STEPS}
              </span>

              <strong>{progressPercentage}%</strong>
            </div>

            <div className="wizard-header__progress-track">
              <span
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="wizard-layout">
          <aside className="wizard-stepper">
            <div className="wizard-stepper__brand-line">
              <span />
              <span />
              <span />
            </div>

            {orderSteps.map((step) => {
              const isActive =
                step.id === flow.currentStep;
              const isCompleted =
                flow.completedSteps.includes(step.id);
              const isVisited =
                flow.visitedSteps.includes(step.id);

              return (
                <button
                  key={step.id}
                  className={`wizard-stepper__item ${
                    isActive
                      ? 'wizard-stepper__item--active'
                      : ''
                  } ${
                    isCompleted
                      ? 'wizard-stepper__item--completed'
                      : ''
                  }`}
                  type="button"
                  onClick={() => {
                    if (isVisited || isCompleted) {
                      goToStep(step.id);
                      setErrors({});
                    }
                  }}
                  disabled={!isVisited && !isCompleted}
                >
                  <span className="wizard-stepper__number">
                    {isCompleted ? '✓' : step.id}
                  </span>

                  <span>
                    <strong>{step.shortTitle}</strong>
                    <small>{step.description}</small>
                  </span>
                </button>
              );
            })}
          </aside>

          <section className="wizard-panel">
            <div className="wizard-panel__brand-line">
              <span />
              <span />
              <span />
            </div>

            <div className="wizard-panel__top">
              <div>
                <span>Paso actual</span>
                <strong>{currentStep.title}</strong>
              </div>

              <button
                className="wizard-mobile-summary-button"
                type="button"
                onClick={() =>
                  setShowMobileSummary(true)
                }
              >
                Ver mi pedido
              </button>
            </div>

            {renderStepContent()}

            <div className="wizard-navigation">
              <button
                className="wizard-button wizard-button--secondary"
                type="button"
                onClick={handleBack}
              >
                <span aria-hidden="true">←</span>
                {flow.currentStep === 1
                  ? 'Volver al catálogo'
                  : 'Atrás'}
              </button>

              <button
                className="wizard-button wizard-button--primary"
                type="button"
                onClick={handleContinue}
              >
                {flow.currentStep === TOTAL_ORDER_STEPS
                  ? 'Revisar mi pedido'
                  : 'Guardar y continuar'}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </section>

          <aside
            className={`wizard-summary ${
              showMobileSummary
                ? 'wizard-summary--open'
                : ''
            }`}
          >
            <button
              className="wizard-summary__close"
              type="button"
              onClick={() =>
                setShowMobileSummary(false)
              }
            >
              ×
            </button>

            <div className="wizard-summary__brand-line">
              <span />
              <span />
              <span />
            </div>

            <span className="wizard-summary__eyebrow">
              Tu pedido
            </span>

            <div className="wizard-summary__product">
              {selectedProduct ? (
                <>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.alt}
                  />

                  <div>
                    <strong>{selectedProduct.name}</strong>
                    <Link to="/catalogo">
                      Cambiar producto
                    </Link>
                  </div>
                </>
              ) : (
                <div className="wizard-summary__empty-product">
                  <strong>Producto pendiente</strong>
                  <Link to="/catalogo">
                    Seleccionar producto
                  </Link>
                </div>
              )}
            </div>

            <dl className="wizard-summary__list">
              <div>
                <dt>Restricciones</dt>
                <dd>
                  {order.noDietaryRestrictions
                    ? 'Ninguna'
                    : activeRestrictions.length > 0
                      ? activeRestrictions
                          .map(
                            (restriction) =>
                              restriction.shortLabel,
                          )
                          .join(', ')
                      : 'Pendiente'}
                </dd>
              </div>

              <div>
                <dt>Porciones</dt>
                <dd>
                  {order.sizeServings
                    ? `${order.sizeServings} porciones`
                    : 'Pendiente'}
                </dd>
              </div>

              <div>
                <dt>Nivel de azúcar</dt>
                <dd>
                  {sugarLevels.find(
                    (level) =>
                      level.id === order.sugarLevel,
                  )?.label || 'Pendiente'}
                </dd>
              </div>

              <div>
                <dt>Sabor</dt>
                <dd>
                  {flavorOptions.find(
                    (flavor) =>
                      flavor.value === order.flavor,
                  )?.label || 'Pendiente'}
                </dd>
              </div>

              <div>
                <dt>Decoración</dt>
                <dd>
                  {decorationOptions.find(
                    (option) =>
                      option.value ===
                      order.decorationStyle,
                  )?.title || 'Pendiente'}
                </dd>
              </div>

              <div>
                <dt>Entrega</dt>
                <dd>
                  {order.deliveryDate || 'Pendiente'}
                </dd>
              </div>
            </dl>

            <div className="wizard-summary__price">
              <span>Estimado desde</span>

              <strong>
                {currencyFormatter.format(
                  order.estimatedPrice || order.basePrice || 0,
                )}
              </strong>

              <small>
                El valor final será confirmado antes de preparar
                el pedido.
              </small>
            </div>

            <div className="wizard-summary__status">
              <span>
                {flow.completedSteps.length} de{' '}
                {TOTAL_ORDER_STEPS} pasos completos
              </span>

              <div>
                <span
                  style={{
                    width: `${progressPercentage}%`,
                  }}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default OrderWizardPage;
