export const orderSteps = [
  {
    id: 1,
    key: 'restrictions',
    title: 'Restricciones',
    shortTitle: 'Restricciones',
    description: 'Preferencias y requisitos alimentarios.',
  },
  {
    id: 2,
    key: 'size',
    title: 'Tamaño y porciones',
    shortTitle: 'Tamaño',
    description: 'Cantidad estimada de personas.',
  },
  {
    id: 3,
    key: 'sugar',
    title: 'Nivel de azúcar',
    shortTitle: 'Azúcar',
    description: 'Alternativa de dulzor.',
  },
  {
    id: 4,
    key: 'flavors',
    title: 'Sabores y rellenos',
    shortTitle: 'Sabores',
    description: 'Sabor principal y relleno.',
  },
  {
    id: 5,
    key: 'decoration',
    title: 'Decoración y mensaje',
    shortTitle: 'Decoración',
    description: 'Estilo, temática y mensaje.',
  },
  {
    id: 6,
    key: 'delivery',
    title: 'Entrega y contacto',
    shortTitle: 'Entrega',
    description: 'Fecha, datos y canal de confirmación.',
  },
];

export const TOTAL_ORDER_STEPS = orderSteps.length;

export const getOrderStep = (stepNumber) =>
  orderSteps.find((step) => step.id === Number(stepNumber));
