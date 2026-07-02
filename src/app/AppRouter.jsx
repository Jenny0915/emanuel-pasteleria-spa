import { Route, Routes } from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
import CatalogPage from '../pages/CatalogPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import OrderConfirmationPage from '../pages/OrderConfirmationPage';
import OrderSummaryPage from '../pages/OrderSummaryPage';
import OrderWizardPage from '../pages/OrderWizardPage';
import ProductDetailPage from '../pages/ProductDetailPage';

function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />

        <Route
          path="/catalogo"
          element={<CatalogPage />}
        />

        <Route
          path="/catalogo/:id"
          element={<ProductDetailPage />}
        />

        <Route
          path="/pedido/configurar"
          element={<OrderWizardPage />}
        />

        <Route
          path="/pedido/resumen"
          element={<OrderSummaryPage />}
        />

        <Route
          path="/pedido/confirmacion"
          element={<OrderConfirmationPage />}
        />

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRouter;
