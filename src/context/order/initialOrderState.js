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
