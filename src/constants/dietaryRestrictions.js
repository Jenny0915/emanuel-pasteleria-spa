export const dietaryRestrictions = [
  {
    id: 'lactoseFree',
    label: 'Sin lactosa',
    shortLabel: 'Sin lactosa',
    description:
      'La preparación se realiza con alternativas sin lactosa disponibles para el producto.',
    color: 'green',
  },
  {
    id: 'glutenFree',
    label: 'Sin gluten',
    shortLabel: 'Sin gluten',
    description:
      'Requiere validación de disponibilidad y manejo especial durante la preparación.',
    color: 'yellow',
  },
  {
    id: 'sugarFree',
    label: 'Sin azúcar',
    shortLabel: 'Sin azúcar',
    description:
      'No se añade azúcar convencional. La formulación final depende del producto seleccionado.',
    color: 'blue',
  },
  {
    id: 'stevia',
    label: 'Endulzado con stevia',
    shortLabel: 'Con stevia',
    description:
      'Se utiliza stevia como alternativa de endulzante, según disponibilidad del producto.',
    color: 'green',
  },
];

export const emptyDietaryRestrictions = {
  lactoseFree: false,
  glutenFree: false,
  sugarFree: false,
  stevia: false,
};
