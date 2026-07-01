import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="container py-5 text-center">
      <h1>Página no encontrada</h1>

      <p className="text-secondary">
        La dirección solicitada no existe.
      </p>

      <Link className="btn btn-primary" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFoundPage;