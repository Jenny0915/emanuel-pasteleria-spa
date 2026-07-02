const products = [
  {
    id: 'pastel-3-leches',
    name: 'Pastel de 3 leches',
    shortDescription:
      'Suave, húmedo y con el sabor casero que lo ha convertido en nuestro producto más pedido.',
    description:
      'Bizcocho esponjoso bañado en una mezcla especial de tres leches y terminado con crema suave. Su equilibrio de humedad y dulzor hace que tenga un sabor diferente al de otros lugares.',
    price: 26000,
    priceLabel: '$26.000',
    unitLabel: '',
    featured: true,
    badge: 'Más pedido',
    image: '/images/catalogo/pastel-3-leches.png',
    gallery: [
      '/images/catalogo/detalle/pastel-3-leches-1.png',
      '/images/catalogo/detalle/pastel-3-leches-2.png',
      '/images/catalogo/detalle/pastel-3-leches-3.png',
    ],
    alt: 'Pastel de tres leches decorado con crema',
    tags: [
      { label: 'Personalizable', color: 'blue' },
      { label: 'Bajo en azúcar', color: 'green' },
      { label: 'Sin lactosa', color: 'green' },
    ],
    highlights: [
      {
        title: 'Textura húmeda',
        description: 'Bizcocho suave y bañado de forma equilibrada.',
        color: 'blue',
      },
      {
        title: 'Crema ligera',
        description: 'Terminación delicada y agradable al paladar.',
        color: 'green',
      },
      {
        title: 'El favorito',
        description: 'Nuestro producto más solicitado por los clientes.',
        color: 'yellow',
      },
    ],
    customization: [
      {
        title: 'Tamaño y porciones',
        description: 'Elige el tamaño ideal para tu celebración.',
        color: 'blue',
      },
      {
        title: 'Nivel de azúcar',
        description: 'Selecciona la alternativa que prefieras.',
        color: 'green',
      },
      {
        title: 'Rellenos y sabores',
        description: 'Combina opciones disponibles a tu gusto.',
        color: 'yellow',
      },
      {
        title: 'Decoración y mensaje',
        description: 'Personaliza la presentación y agrega tu mensaje.',
        color: 'blue',
      },
    ],
    information: [
      ['Porciones sugeridas', '8, 12, 16, 20, 24 o más porciones'],
      ['Conservación', 'Refrigerado entre 2 °C y 6 °C'],
      ['Tiempo estimado', '48 horas hábiles para preparación'],
      [
        'Observaciones',
        'Producto artesanal. La decoración puede variar ligeramente.',
      ],
    ],
    preferences: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Bajo en azúcar', color: 'green' },
      { label: 'Sin colorantes artificiales', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
      { label: 'Opciones sin gluten*', color: 'yellow' },
      { label: 'Opciones veganas*', color: 'yellow' },
    ],
  },
  {
    id: 'pastel-veteado',
    name: 'Pastel veteado vainilla–chocolate',
    shortDescription:
      'La combinación perfecta de vainilla y chocolate en una miga suave y húmeda.',
    description:
      'Un pastel equilibrado que combina dos sabores clásicos en un mismo bizcocho. Su efecto veteado hace que cada porción tenga una mezcla distinta y una presentación muy especial.',
    price: 25000,
    priceLabel: '$25.000',
    unitLabel: '',
    featured: false,
    badge: 'Dos sabores',
    image: '/images/catalogo/pastel-veteado.png',
    gallery: [
      '/images/catalogo/detalle/pastel-veteado-1.png',
      '/images/catalogo/detalle/pastel-veteado-2.png',
      '/images/catalogo/detalle/pastel-veteado-3.png',
    ],
    alt: 'Pastel veteado de vainilla y chocolate',
    tags: [
      { label: 'Personalizable', color: 'blue' },
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Con stevia', color: 'green' },
    ],
    highlights: [
      {
        title: 'Dos sabores',
        description: 'Vainilla y chocolate en una misma preparación.',
        color: 'blue',
      },
      {
        title: 'Miga suave',
        description: 'Textura esponjosa y agradable.',
        color: 'green',
      },
      {
        title: 'Presentación única',
        description: 'Cada corte revela un veteado diferente.',
        color: 'yellow',
      },
    ],
    customization: [
      {
        title: 'Tamaño y porciones',
        description: 'Elige el tamaño ideal para tu celebración.',
        color: 'blue',
      },
      {
        title: 'Nivel de azúcar',
        description: 'Selecciona la alternativa que prefieras.',
        color: 'green',
      },
      {
        title: 'Rellenos y sabores',
        description: 'Combina opciones disponibles a tu gusto.',
        color: 'yellow',
      },
      {
        title: 'Decoración y mensaje',
        description: 'Personaliza la presentación y agrega tu mensaje.',
        color: 'blue',
      },
    ],
    information: [
      ['Porciones sugeridas', '8, 12, 16, 20, 24 o más porciones'],
      ['Conservación', 'Refrigerado entre 2 °C y 6 °C'],
      ['Tiempo estimado', '48 horas hábiles para preparación'],
      [
        'Observaciones',
        'El patrón veteado varía de manera natural en cada pastel.',
      ],
    ],
    preferences: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Con stevia', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
      { label: 'Opciones sin gluten*', color: 'yellow' },
    ],
  },
  {
    id: 'pastel-chocolate',
    name: 'Pastel de chocolate',
    shortDescription:
      'Intenso, húmedo y cubierto con una cremosa preparación de chocolate.',
    description:
      'Bizcocho de chocolate húmedo y esponjoso, acompañado de una cobertura cremosa. Puede personalizarse para cumpleaños, celebraciones familiares y momentos especiales.',
    price: 27000,
    priceLabel: '$27.000',
    unitLabel: '',
    featured: false,
    badge: 'Sabor intenso',
    image: '/images/catalogo/pastel-chocolate.png',
    gallery: [
      '/images/catalogo/detalle/pastel-chocolate-1.png',
      '/images/catalogo/detalle/pastel-chocolate-2.png',
      '/images/catalogo/detalle/pastel-chocolate-3.png',
    ],
    alt: 'Pastel de chocolate cubierto con crema de chocolate',
    tags: [
      { label: 'Personalizable', color: 'blue' },
      { label: 'Bajo en azúcar', color: 'green' },
      { label: 'Sin lactosa', color: 'green' },
    ],
    highlights: [
      {
        title: 'Bizcocho húmedo',
        description: 'Textura suave y esponjosa.',
        color: 'blue',
      },
      {
        title: 'Cobertura cremosa',
        description: 'Chocolate de sabor intenso y equilibrado.',
        color: 'green',
      },
      {
        title: 'Ideal para celebrar',
        description: 'Perfecto para cumpleaños y eventos especiales.',
        color: 'yellow',
      },
    ],
    customization: [
      {
        title: 'Tamaño y porciones',
        description: 'Elige el tamaño ideal para tu celebración.',
        color: 'blue',
      },
      {
        title: 'Nivel de azúcar',
        description: 'Selecciona la alternativa que prefieras.',
        color: 'green',
      },
      {
        title: 'Rellenos y sabores',
        description: 'Combina opciones disponibles a tu gusto.',
        color: 'yellow',
      },
      {
        title: 'Decoración y mensaje',
        description: 'Personaliza la presentación y agrega tu mensaje.',
        color: 'blue',
      },
    ],
    information: [
      ['Porciones sugeridas', '8, 12, 16, 20, 24 o más porciones'],
      ['Conservación', 'Refrigerado entre 2 °C y 6 °C'],
      ['Tiempo estimado', '48 horas hábiles para preparación'],
      [
        'Observaciones',
        'Producto artesanal. Las decoraciones pueden variar ligeramente.',
      ],
    ],
    preferences: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Bajo en azúcar', color: 'green' },
      { label: 'Sin colorantes artificiales', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
      { label: 'Opciones sin gluten*', color: 'yellow' },
      { label: 'Opciones veganas*', color: 'yellow' },
    ],
  },
  {
    id: 'cupcakes-sencillos',
    name: 'Cupcakes sencillos',
    shortDescription:
      'Cupcakes esponjosos con crema suave y grageas para cualquier ocasión.',
    description:
      'Una opción práctica y deliciosa para compartir. Se preparan con crema suave y una decoración sencilla con grageas, ideal para reuniones, cumpleaños y detalles especiales.',
    price: 6000,
    priceLabel: '$6.000',
    unitLabel: 'c/u',
    featured: false,
    badge: 'Versátiles',
    image: '/images/catalogo/cupcakes-sencillos.png',
    gallery: [
      '/images/catalogo/detalle/cupcakes-sencillos-1.png',
      '/images/catalogo/detalle/cupcakes-sencillos-2.png',
      '/images/catalogo/detalle/cupcakes-sencillos-3.png',
    ],
    alt: 'Cupcakes sencillos con crema y grageas',
    tags: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Sin azúcar', color: 'blue' },
      { label: 'Con stevia', color: 'green' },
    ],
    highlights: [
      {
        title: 'Porción individual',
        description: 'Fáciles de compartir y servir.',
        color: 'blue',
      },
      {
        title: 'Crema suave',
        description: 'Decoración sencilla y equilibrada.',
        color: 'green',
      },
      {
        title: 'Para cualquier ocasión',
        description: 'Ideales para reuniones y detalles.',
        color: 'yellow',
      },
    ],
    customization: [
      {
        title: 'Cantidad',
        description: 'Elige el número de unidades que necesitas.',
        color: 'blue',
      },
      {
        title: 'Nivel de azúcar',
        description: 'Selecciona la alternativa que prefieras.',
        color: 'green',
      },
      {
        title: 'Sabores',
        description: 'Combina sabores según disponibilidad.',
        color: 'yellow',
      },
      {
        title: 'Color de la crema',
        description: 'Adapta la presentación a tu celebración.',
        color: 'blue',
      },
    ],
    information: [
      ['Cantidad sugerida', 'Desde 6 unidades'],
      ['Conservación', 'Refrigerado entre 2 °C y 6 °C'],
      ['Tiempo estimado', '48 horas hábiles para preparación'],
      [
        'Observaciones',
        'Los colores y las grageas pueden variar según disponibilidad.',
      ],
    ],
    preferences: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Sin azúcar', color: 'blue' },
      { label: 'Con stevia', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
    ],
  },
  {
    id: 'cupcakes-elaborados',
    name: 'Cupcakes especiales',
    shortDescription:
      'Cupcakes personalizados con decoraciones temáticas y acabados especiales.',
    description:
      'Diseñados para celebraciones que necesitan un detalle diferente. Se personalizan con colores, temáticas, mensajes y elementos decorativos acordes con cada ocasión.',
    price: 7500,
    priceLabel: '$7.500',
    unitLabel: 'c/u',
    featured: false,
    badge: 'Temáticos',
    image: '/images/catalogo/cupcakes-elaborados.png',
    gallery: [
      '/images/catalogo/detalle/cupcakes-elaborados-1.png',
      '/images/catalogo/detalle/cupcakes-elaborados-2.png',
      '/images/catalogo/detalle/cupcakes-elaborados-3.png',
    ],
    alt: 'Cupcakes especiales con decoraciones temáticas',
    tags: [
      { label: 'Personalizable', color: 'blue' },
      { label: 'Sin lactosa', color: 'green' },
    ],
    highlights: [
      {
        title: 'Diseño temático',
        description: 'Adaptado a la ocasión que elijas.',
        color: 'blue',
      },
      {
        title: 'Detalles especiales',
        description: 'Decoraciones elaboradas y personalizadas.',
        color: 'green',
      },
      {
        title: 'Presentación memorable',
        description: 'Pensados para destacar en tu celebración.',
        color: 'yellow',
      },
    ],
    customization: [
      {
        title: 'Cantidad',
        description: 'Elige el número de unidades que necesitas.',
        color: 'blue',
      },
      {
        title: 'Temática',
        description: 'Cuéntanos la idea de tu celebración.',
        color: 'green',
      },
      {
        title: 'Sabores',
        description: 'Combina opciones según disponibilidad.',
        color: 'yellow',
      },
      {
        title: 'Colores y mensaje',
        description: 'Personaliza cada detalle visual.',
        color: 'blue',
      },
    ],
    information: [
      ['Cantidad sugerida', 'Desde 6 unidades'],
      ['Conservación', 'Refrigerado entre 2 °C y 6 °C'],
      ['Tiempo estimado', '72 horas hábiles para preparación'],
      [
        'Observaciones',
        'El precio final depende del nivel de detalle de la temática.',
      ],
    ],
    preferences: [
      { label: 'Sin lactosa', color: 'green' },
      { label: 'Personalizable', color: 'blue' },
      { label: 'Opciones sin gluten*', color: 'yellow' },
    ],
  },
];

export const getProductById = (productId) =>
  products.find((product) => product.id === productId);

export const getRelatedProducts = (productId, limit = 3) =>
  products
    .filter((product) => product.id !== productId)
    .slice(0, limit);

export default products;
