import { useParams } from 'react-router-dom';

function ProductDetailPage() {
  const { id } = useParams();

  return (
    <section className="container py-5">
      <h1>Detalle del producto</h1>
      <p>Identificador del producto: {id}</p>
    </section>
  );
}

export default ProductDetailPage;