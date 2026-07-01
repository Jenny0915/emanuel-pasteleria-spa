$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "Creando estructura del proyecto..." -ForegroundColor Cyan

$Folders = @(
    "public/images/brand",
    "public/images/products",
    "public/images/ui",

    "src/app",

    "src/assets/fonts",
    "src/assets/icons",
    "src/assets/styles",

    "src/components/common/Button",
    "src/components/common/FormField",
    "src/components/common/LoadingState",
    "src/components/common/ErrorState",
    "src/components/common/EmptyState",
    "src/components/common/AlertMessage",

    "src/components/layout",
    "src/components/product",
    "src/components/order/steps",

    "src/pages",

    "src/context/order",

    "src/services",
    "src/validations",
    "src/constants",
    "src/data",
    "src/hooks",
    "src/utils",
    "src/tests"
)

foreach ($Folder in $Folders) {
    New-Item -ItemType Directory -Path $Folder -Force | Out-Null
}

$Files = @(
    "src/app/App.jsx",
    "src/app/AppRouter.jsx",
    "src/app/routePaths.js",

    "src/assets/styles/variables.css",
    "src/assets/styles/global.css",
    "src/assets/styles/utilities.css",
    "src/assets/styles/bootstrap-overrides.css",

    "src/components/common/Button/Button.jsx",
    "src/components/common/Button/Button.css",
    "src/components/common/FormField/FormField.jsx",
    "src/components/common/FormField/FormField.css",
    "src/components/common/LoadingState/LoadingState.jsx",
    "src/components/common/ErrorState/ErrorState.jsx",
    "src/components/common/EmptyState/EmptyState.jsx",
    "src/components/common/AlertMessage/AlertMessage.jsx",

    "src/components/layout/AppLayout.jsx",
    "src/components/layout/Header.jsx",
    "src/components/layout/Footer.jsx",
    "src/components/layout/ScrollToTop.jsx",

    "src/components/product/ProductCard.jsx",
    "src/components/product/ProductList.jsx",
    "src/components/product/ProductBadge.jsx",
    "src/components/product/ProductFilters.jsx",

    "src/components/order/OrderStepper.jsx",
    "src/components/order/OrderNavigation.jsx",
    "src/components/order/OrderSummaryCard.jsx",
    "src/components/order/RestrictionOption.jsx",

    "src/components/order/steps/RestrictionsStep.jsx",
    "src/components/order/steps/SizeStep.jsx",
    "src/components/order/steps/SugarStep.jsx",
    "src/components/order/steps/FlavorsStep.jsx",
    "src/components/order/steps/DecorationStep.jsx",
    "src/components/order/steps/DeliveryContactStep.jsx",

    "src/pages/HomePage.jsx",
    "src/pages/CatalogPage.jsx",
    "src/pages/ProductDetailPage.jsx",
    "src/pages/OrderWizardPage.jsx",
    "src/pages/OrderSummaryPage.jsx",
    "src/pages/OrderConfirmationPage.jsx",
    "src/pages/NotFoundPage.jsx",

    "src/context/order/OrderContext.jsx",
    "src/context/order/OrderProvider.jsx",
    "src/context/order/orderReducer.js",
    "src/context/order/orderActions.js",
    "src/context/order/initialOrderState.js",

    "src/services/apiClient.js",
    "src/services/productService.js",
    "src/services/orderService.js",

    "src/validations/orderValidation.js",
    "src/validations/contactValidation.js",
    "src/validations/stepValidation.js",

    "src/constants/dietaryRestrictions.js",
    "src/constants/sugarLevels.js",
    "src/constants/orderSteps.js",
    "src/constants/orderStatus.js",

    "src/data/localProducts.js",

    "src/hooks/useOrder.js",
    "src/hooks/useOrderPersistence.js",
    "src/hooks/useProducts.js",

    "src/utils/formatCurrency.js",
    "src/utils/formatDate.js",
    "src/utils/sanitizeText.js",
    "src/utils/storage.js",

    "src/tests/orderReducer.test.js",
    "src/tests/orderValidation.test.js",

    ".env.example",
    "vercel.json"
)

foreach ($File in $Files) {
    if (-not (Test-Path $File)) {
        New-Item -ItemType File -Path $File -Force | Out-Null
    }
}

@'
export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalogo",
  PRODUCT_DETAIL: "/producto/:id",
  ORDER_CONFIGURE: "/pedido/configurar",
  ORDER_SUMMARY: "/pedido/resumen",
  ORDER_CONFIRMATION: "/pedido/confirmacion",
};
'@ | Set-Content "src/app/routePaths.js" -Encoding UTF8

@'
export const initialOrderState = {
  product: {
    id: "",
    name: "",
    basePrice: 0,
  },

  dietaryRestrictions: {
    lactoseFree: false,
    glutenFree: false,
    sugarFree: false,
  },

  sizeServings: "",
  sugarLevel: "",
  flavor: "",
  filling: "",

  decoration: {
    style: "",
    message: "",
  },

  delivery: {
    date: "",
    timeSlot: "",
  },

  customer: {
    fullName: "",
    email: "",
    whatsapp: "",
    confirmationChannel: "",
  },

  notes: "",
  currentStep: 1,
  status: "draft",
};
'@ | Set-Content "src/context/order/initialOrderState.js" -Encoding UTF8

@'
export const ORDER_ACTIONS = {
  SET_PRODUCT: "SET_PRODUCT",
  UPDATE_RESTRICTIONS: "UPDATE_RESTRICTIONS",
  SET_SIZE: "SET_SIZE",
  SET_SUGAR_LEVEL: "SET_SUGAR_LEVEL",
  SET_FLAVOR: "SET_FLAVOR",
  SET_FILLING: "SET_FILLING",
  UPDATE_DECORATION: "UPDATE_DECORATION",
  UPDATE_DELIVERY: "UPDATE_DELIVERY",
  UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
  SET_NOTES: "SET_NOTES",
  SET_CURRENT_STEP: "SET_CURRENT_STEP",
  RESTORE_ORDER: "RESTORE_ORDER",
  RESET_ORDER: "RESET_ORDER",
};
'@ | Set-Content "src/context/order/orderActions.js" -Encoding UTF8

@'
:root {
  --color-primary: #183b66;
  --color-secondary: #f2c94c;
  --color-accent: #4f8a65;

  --color-text: #263238;
  --color-text-muted: #6b7280;
  --color-background: #ffffff;
  --color-surface: #f8f9fa;
  --color-border: #dee2e6;
  --color-error: #b42318;
  --color-success: #137333;

  --font-heading: "Poiret One", sans-serif;
  --font-body: "Poppins", sans-serif;

  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;

  --shadow-sm: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
}
'@ | Set-Content "src/assets/styles/variables.css" -Encoding UTF8

@'
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-body);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-heading);
}

button,
input,
select,
textarea {
  font: inherit;
}

img {
  display: block;
  max-width: 100%;
}
'@ | Set-Content "src/assets/styles/global.css" -Encoding UTF8

@'
VITE_API_BASE_URL=https://TU-PROYECTO.mockapi.io/api/v1
'@ | Set-Content ".env.example" -Encoding UTF8

@'
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
'@ | Set-Content "vercel.json" -Encoding UTF8

Write-Host ""
Write-Host "Estructura creada correctamente." -ForegroundColor Green
Write-Host ""