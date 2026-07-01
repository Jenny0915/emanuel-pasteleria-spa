import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;