import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { emptyDietaryRestrictions } from '../constants/dietaryRestrictions';
import { TOTAL_ORDER_STEPS } from '../constants/orderSteps';
import { orderStatus } from '../constants/orderStatus';
import { getProductById } from '../data/products';

const STORAGE_KEY = 'emanuel-pasteleria-order-draft';

const initialOrder = {
  productId: '',
  productName: '',
  productImage: '',
  basePrice: 0,

  dietaryRestrictions: emptyDietaryRestrictions,
  noDietaryRestrictions: false,
  restrictionNotes: '',

  sizeServings: '',
  sugarLevel: '',
  flavor: '',
  filling: '',

  decorationStyle: '',
  decorationTheme: '',
  cakeMessage: '',
  notes: '',

  deliveryDate: '',
  deliveryTimeSlot: '',

  customerName: '',
  customerEmail: '',
  customerWhatsApp: '',
  confirmationChannel: '',

  estimatedPrice: 0,
  status: orderStatus.DRAFT,
};

const initialFlow = {
  currentStep: 1,
  visitedSteps: [1],
  completedSteps: [],
};

const OrderContext = createContext(null);

function getStoredDraft() {
  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
}

function calculateEstimatedPrice(order) {
  let total = Number(order.basePrice || 0);

  const servingsExtra = {
    '8': 0,
    '12': 8000,
    '16': 15000,
    '20': 23000,
    '24': 31000,
    '30': 45000,
  };

  total += servingsExtra[order.sizeServings] || 0;

  if (order.filling && order.filling !== 'none') {
    total += 5000;
  }

  if (order.decorationStyle === 'themed') {
    total += 12000;
  }

  if (order.decorationStyle === 'premium') {
    total += 18000;
  }

  if (order.dietaryRestrictions.glutenFree) {
    total += 5000;
  }

  if (
    order.sugarLevel === 'sugarFree' ||
    order.sugarLevel === 'stevia'
  ) {
    total += 3000;
  }

  return total;
}

export function OrderProvider({ children }) {
  const storedDraft =
    typeof window !== 'undefined' ? getStoredDraft() : null;

  const [order, setOrder] = useState(
    storedDraft?.order
      ? {
          ...initialOrder,
          ...storedDraft.order,
          dietaryRestrictions: {
            ...emptyDietaryRestrictions,
            ...storedDraft.order.dietaryRestrictions,
          },
        }
      : initialOrder,
  );

  const [flow, setFlow] = useState(
    storedDraft?.flow
      ? {
          ...initialFlow,
          ...storedDraft.flow,
        }
      : initialFlow,
  );

  useEffect(() => {
    const estimatedPrice = calculateEstimatedPrice(order);

    if (estimatedPrice !== order.estimatedPrice) {
      setOrder((currentOrder) => ({
        ...currentOrder,
        estimatedPrice,
      }));
    }
  }, [
    order.basePrice,
    order.sizeServings,
    order.filling,
    order.decorationStyle,
    order.dietaryRestrictions.glutenFree,
    order.sugarLevel,
    order.estimatedPrice,
  ]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ order, flow }),
    );
  }, [order, flow]);

  const updateOrder = useCallback((changes) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      ...changes,
      status: orderStatus.DRAFT,
    }));
  }, []);

  const updateNestedOrder = useCallback((key, changes) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      [key]: {
        ...currentOrder[key],
        ...changes,
      },
      status: orderStatus.DRAFT,
    }));
  }, []);

  const selectProduct = useCallback((productId) => {
    const product = getProductById(productId);

    if (!product) {
      return;
    }

    setOrder((currentOrder) => ({
      ...currentOrder,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      basePrice: product.price,
      estimatedPrice: product.price,
      status: orderStatus.DRAFT,
    }));
  }, []);

  const goToStep = useCallback((stepNumber) => {
    const safeStep = Math.min(
      TOTAL_ORDER_STEPS,
      Math.max(1, Number(stepNumber)),
    );

    setFlow((currentFlow) => ({
      ...currentFlow,
      currentStep: safeStep,
      visitedSteps: Array.from(
        new Set([...currentFlow.visitedSteps, safeStep]),
      ),
    }));
  }, []);

  const markStepCompleted = useCallback((stepNumber) => {
    setFlow((currentFlow) => ({
      ...currentFlow,
      completedSteps: Array.from(
        new Set([
          ...currentFlow.completedSteps,
          Number(stepNumber),
        ]),
      ),
    }));
  }, []);

  const clearStepCompleted = useCallback((stepNumber) => {
    setFlow((currentFlow) => ({
      ...currentFlow,
      completedSteps: currentFlow.completedSteps.filter(
        (step) => step !== Number(stepNumber),
      ),
    }));
  }, []);

  const resetOrder = useCallback(() => {
    setOrder(initialOrder);
    setFlow(initialFlow);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const setOrderState = useCallback((status) => {
    setOrder((currentOrder) => ({
      ...currentOrder,
      status,
    }));
  }, []);

  const value = useMemo(
    () => ({
      order,
      flow,
      updateOrder,
      updateNestedOrder,
      selectProduct,
      goToStep,
      markStepCompleted,
      clearStepCompleted,
      resetOrder,
      setOrderState,
    }),
    [
      order,
      flow,
      updateOrder,
      updateNestedOrder,
      selectProduct,
      goToStep,
      markStepCompleted,
      clearStepCompleted,
      resetOrder,
      setOrderState,
    ],
  );

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      'useOrder debe utilizarse dentro de OrderProvider.',
    );
  }

  return context;
}
