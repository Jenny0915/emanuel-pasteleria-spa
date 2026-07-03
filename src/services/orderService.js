const ORDERS_ENDPOINT = import.meta.env.VITE_MOCKAPI_ORDERS_URL;

function validateEndpoint() {
  if (!ORDERS_ENDPOINT) {
    throw new Error(
      'No se encontró la variable VITE_MOCKAPI_ORDERS_URL.',
    );
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return null;
}

function createServiceError(message, status = 0, data = null) {
  const error = new Error(message);

  error.status = status;
  error.data = data;

  return error;
}

export async function createOrder(order, signal) {
  validateEndpoint();

  const response = await fetch(ORDERS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
    signal,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw createServiceError(
      'No fue posible registrar el pedido.',
      response.status,
      data,
    );
  }

  return data;
}

export async function getOrders(signal) {
  validateEndpoint();

  const response = await fetch(ORDERS_ENDPOINT, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw createServiceError(
      'No fue posible consultar los pedidos.',
      response.status,
      data,
    );
  }

  return Array.isArray(data) ? data : [];
}

export async function getOrderById(orderId, signal) {
  validateEndpoint();

  if (!orderId) {
    throw new Error(
      'Debes indicar el identificador del pedido.',
    );
  }

  const response = await fetch(
    `${ORDERS_ENDPOINT}/${encodeURIComponent(orderId)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    },
  );

  const data = await parseResponse(response);

  if (!response.ok) {
    throw createServiceError(
      'No fue posible consultar el pedido.',
      response.status,
      data,
    );
  }

  return data;
}