import { OrderProvider } from '../context/OrderContext';

import AppRouter from './AppRouter';

function App() {
  return (
    <OrderProvider>
      <AppRouter />
    </OrderProvider>
  );
}

export default App;
