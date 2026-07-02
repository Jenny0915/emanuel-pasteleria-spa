export const sugarLevels = [
  {
    id: 'traditional',
    label: 'Tradicional',
    description:
      'Receta estándar del producto, con su nivel habitual de dulzor.',
    color: 'yellow',
  },
  {
    id: 'low',
    label: 'Bajo en azúcar',
    description:
      'Menor cantidad de azúcar añadida frente a la receta tradicional.',
    color: 'green',
  },
  {
    id: 'sugarFree',
    label: 'Sin azúcar',
    description:
      'No se añade azúcar convencional. No significa necesariamente que el producto no contenga azúcares naturales.',
    color: 'blue',
  },
  {
    id: 'stevia',
    label: 'Con stevia',
    description:
      'La receta se endulza con stevia como alternativa al azúcar convencional.',
    color: 'green',
  },
];

export const getSugarLevelById = (id) =>
  sugarLevels.find((level) => level.id === id);
